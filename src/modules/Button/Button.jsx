import PropTypes from 'prop-types';

import css from './Button.module.css';

const ButtonLoadMore = ({ loadMore }) => {
    return (
        <div className={css.loadmore}>
            <button className={css.Button} type="button" onClick={loadMore}>
                Load More
            </button>
        </div>
    );
};

ButtonLoadMore.propTypes = {
    onLoadMore: PropTypes.func,
};

export default ButtonLoadMore;