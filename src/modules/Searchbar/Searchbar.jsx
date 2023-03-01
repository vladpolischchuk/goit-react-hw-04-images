import { Component } from "react";
import PropTypes from "prop-types";
import { FcSearch } from "react-icons/fc";

import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        search: "",
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit({ ...this.state });
        this.reset();
    };

    reset() {
        this.setState({
            search: "",
        });
    };

    render() {
        const { search } = this.state;
        const { handleChange, handleSubmit } = this;

        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchForm__button}>
                        <FcSearch className={css.button__label} />
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        name="search"
                        placeholder="Search images and photos"
                        value={search}
                        onChange={handleChange}
                        required
                    />
                </form>
            </header>
        )
    };
};

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};