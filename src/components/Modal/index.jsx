import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ src, closeModal }) {
  return (
    <div onClick={closeModal} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
}
