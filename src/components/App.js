import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchShoes, updateShoeInStore } from "../store";
import io from "socket.io-client";
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal
} from "react-bootstrap";
import Shoe from "./Shoe";

import "./App.css";

class App extends Component {
  state = {
    activeSlot: {},
    formError: "",
    showModal: false
  };

  updateShoe = shoe => {
    this.props.updateShoeInStore(shoe);
    const { id, brand, style, size, upc } = shoe;
    // Only send relevant properties via Websocket
    const shoeProps = { id, brand, style, size, upc };
    this.socket.emit("update-shoe", shoeProps);
  };

  handleShow = id => {
    const activeSlot = this.props.shoes.find(shoe => shoe.id === id);
    this.setState({
      activeSlot: {
        ...activeSlot
      },
      showModal: true
    });
  };

  handleHide = () => this.setState({ showModal: false, formError: "" });

  handleChange = event => {
    this.setState({
      activeSlot: {
        ...this.state.activeSlot,
        [event.target.name]: event.target.value
      }
    });
  };

  validateForm = () => {
    const { brand, style, upc, size } = this.state.activeSlot;
    return (brand !== "" && style !== "" && upc !== "" && size !== "");
  };

  handleUpdate = () => {
    if (this.validateForm()) {
      this.updateShoe({ ...this.state.activeSlot });
      this.handleHide();
    } else {
      this.setState({ formError: 'Please complete all fields above. If you need to start over, delete the shoe and click this slot again.' })
    }
  };

  handleDelete = () => {
    this.updateShoe({
      id: this.state.activeSlot.id,
      brand: "",
      style: "",
      size: "",
      upc: ""
    });
    this.handleHide();
  };

  componentDidMount() {
    const socket = (this.socket = io(window.location.origin));
    socket.on("connect", () => {
      socket.on("shoe-updated", shoe => {
        this.props.updateShoeInStore(shoe);
      });
    });
  }

  render() {
    return (
      <div className="text-center">
        <h1>Welcome to the ShoeX Warehouse</h1>
        <h3>Click a slot to add, update, or delete a shoe</h3>
        <div id="shoe-grid">
          {this.props.shoes.map(shoe => (
            <Shoe key={shoe.id} shoe={shoe} handleShow={this.handleShow} />
          ))}
        </div>
        <Modal show={this.state.showModal} onHide={this.handleHide}>
          <Modal.Header closeButton>
            <Modal.Title />
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleUpdate}>
              <FormGroup>
                <ControlLabel>Brand</ControlLabel>
                <FormControl
                  type="text"
                  name="brand"
                  onChange={this.handleChange}
                  value={this.state.activeSlot.brand}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Style</ControlLabel>
                <FormControl
                  type="text"
                  name="style"
                  onChange={this.handleChange}
                  value={this.state.activeSlot.style}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>UPC ID</ControlLabel>
                <FormControl
                  type="text"
                  name="upc"
                  onChange={this.handleChange}
                  value={this.state.activeSlot.upc}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Size</ControlLabel>
                <FormControl
                  type="text"
                  name="size"
                  onChange={this.handleChange}
                  value={this.state.activeSlot.size}
                />
              </FormGroup>
            </Form>
            <p className="text-danger">{this.state.formError}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleDelete}>
              Delete
            </Button>
            <Button bsStyle="primary" onClick={this.handleUpdate}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shoes: Object.values(state.shoes) // Convert object to array
});

const mapDispatchToProps = dispatch => ({
  fetchShoes: dispatch(fetchShoes()),
  updateShoeInStore: shoe => dispatch(updateShoeInStore(shoe))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
