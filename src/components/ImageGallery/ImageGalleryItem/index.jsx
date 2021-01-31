import React from "react";
import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ element, openModal }) {
  return (
    <li
      onClick={() => {
        console.log("Clicking!");
        openModal(element);
      }}
      className={styles.ImageGalleryItem}
    >
      <img
        src={element.webformatURL}
        alt=""
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
}
