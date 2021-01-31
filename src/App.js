import React, { Component } from "react";
import Modal from "./components/Modal";
import SearchBar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

export default class App extends Component {
  state = {
    query: "",
    status: "idle",
  };
  onSubmit = (query) => {
    this.setState({ query: query });
  };
  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery query={this.state.query} />
        {/* <Modal /> */}
      </>
    );
  }
}
