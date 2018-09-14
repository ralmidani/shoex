const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const { database, Shoe } = require('./db');
const PORT = process.env.PORT || 8080;
const app = express();
const io = require('socket.io');

// log requests & responses
app.use(volleyball);

const { NODE_ENV } = process.env;
const inProduction = (NODE_ENV === 'production');

/* Redirect http to https when in production */
app.get('*', (request, response, next) => {
  const noSSLHeader = (request.headers['x-forwarded-proto'] !== 'https')
  if (inProduction && noSSLHeader)
    response.redirect('https://' + request.hostname + request.url)
  else
    next() /* Continue to other routes if we're not redirecting */
});

// serve content in 'build/static' as-is
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// a single API request handler which returns all shoes in database
app.get('/api/shoes', async (_, response, next) => {
  try {
    const shoes = await Shoe.findAll();
    response.json(shoes);
  } catch (error) {
    next(error);
  }
});


// handle errors
app.use((error, request, response, next) =>
  response.status(error.status || 500).send(error.message || 'Internal server error.')
);

// start server and sync database
const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await database.sync();
    console.log('Database is synced');
  } catch (error) {
    console.log(error);
  }
});

// attach socket.io to server
const websocket = io(server);

// enable a client to update a specific shoe,
// then broadcast the change to other clients.
websocket.on('connection', socket => {
  socket.on('update-shoe', async (shoe) => {
    const { id, brand, style, size, upc } = shoe;
    // Only send properties which might have changed to the database
    const shoeProps = { brand, style, size, upc };
    try {
      const [numRows, newData] = await Shoe.update(shoeProps, {
          where: { id },
          returning: true
        }
      );
      if (numRows > 0) {
        socket.broadcast.emit('shoe-updated', newData[0]);
      }
    } catch (error) {
      console.log(error);
    }
  })
})

module.exports = app;
