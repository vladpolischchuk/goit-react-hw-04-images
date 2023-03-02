import { useState } from "react";
import PropTypes from "prop-types";
import { FcSearch } from "react-icons/fc";

import initialState from "./initialState";

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    const [state, setState] = useState({ ...initialState });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(({ ...state }));
        setState({ ...initialState });
    };

    const { search } = state;

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

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};