This project represents a shoe inventory system built with React, React-Bootstrap, Node, Express, Sequelize, and Socket.io.

Live demo: https://shoex.herokuapp.com/

### Running the project locally

Assuming you have a PostgreSQL server running and have installed Node.js and Git, run the following commands in your terminal/command prompt:

#### Clone the project and go into its directory:
```
git clone https://github.com/ralmidani/shoex
cd shoex
```

#### Install dependencies:
```
npm install
```

#### Create the database:
```
createdb shoex
```

#### Set an environment variable named DB_PASSWORD to your PostgreSQL server user's password:

On Unix-like systems:
```
export DB_PASSWORD=password
```

On Windows:
```
set DB_PASSWORD=password
```

#### Run the project:
```
npm start
```

#### Go to localhost:8080 in your browser (preferably Chromium/Chrome or Firefox)


 