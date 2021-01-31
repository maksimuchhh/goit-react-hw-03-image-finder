import React from "react";
import styles from "./Button.module.css";

export default function Button({ handleClick }) {
  return (
    <>
      <button onClick={handleClick} className={styles.Button} type="button">
        Load more...
      </button>
    </>
  );
}
