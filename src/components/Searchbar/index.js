import styles from "./Searchbar.module.css";

import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    query: "",
  };
  render() {
    const { onSubmit } = this.props;
    return (
      <header className={styles.Searchbar}>
        <form
          className={styles.SearchForm}
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit(this.state.query);
            this.setState({ query: "" });
          }}
        >
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            value={this.state.query}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={(evt) => {
              this.setState({ query: evt.currentTarget.value });
            }}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
