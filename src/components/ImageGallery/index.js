import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Button from "../Button";
import styles from "./ImageGallery.module.css";
import Modal from "../Modal";

const override = css`
  display: block;
  margin: 35px auto;
  border-color: red;
`;
export default class ImageGallery extends Component {
  state = {
    photos: [],
    page: 1,
    status: "idle",
    lastPage: false,
    modalOpen: false,
    modalPhoto: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      if (prevProps.query !== this.props.query) {
        this.setState({
          page: 1,
          lastPage: false,
        });
      }
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${this.props.query}&page=${this.state.page}&key=19216431-b460da2edf9faaa62085afedc&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (this.state.page !== 1) {
            this.setState({
              photos: [...prevState.photos, ...data.hits],
              status: "resolved",
            });
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          } else {
            this.setState({
              photos: data.hits,
              status: "resolved",
            });
          }
          if (data.totalHits === this.state.photos.length) {
            this.setState({ lastPage: true });
          }
        });
    }
  }
  onClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  openModal = (el) => {
    this.setState({
      modalOpen: true,
      modalPhoto: el.largeImageURL,
    });
    console.log(this.state);
  };

  closeModal = (evt) => {
    evt.target === evt.currentTarget &&
      this.setState({
        modalOpen: false,
      });
  };

  render() {
    window.addEventListener("keydown", (evt) => {
      evt.code === "Escape" && this.setState({ modalOpen: false });
    });
    const { status } = this.state;
    if (status === "idle") {
      return <div>Заполните поле для поиска</div>;
    }
    if (status === "pending") {
      return (
        <>
          {this.state.photos.length > 0 && (
            <ul className={styles.ImageGallery}>
              {this.state.photos.map((el) => {
                return <ImageGalleryItem key={el.id} element={el} />;
              })}
            </ul>
          )}
          <BarLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={true}
          />
        </>
      );
    }
    if (status === "resolved") {
      if (this.state.photos.length === 0) return <div>Ничего не найдено!</div>;
      else {
        return (
          <>
            <ul className={styles.ImageGallery}>
              {this.state.photos.map((el) => {
                return (
                  <ImageGalleryItem
                    openModal={this.openModal}
                    key={el.id}
                    element={el}
                  />
                );
              })}
            </ul>
            {!this.state.lastPage && <Button handleClick={this.onClick} />}
            {this.state.modalOpen && (
              <Modal closeModal={this.closeModal} src={this.state.modalPhoto} />
            )}
          </>
        );
      }
    }
  }
}
