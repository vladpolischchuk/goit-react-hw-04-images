import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, showImage }) => {

    const image = images.map(({ id, tags, webformatURL, largeImageURL }) => <li onClick={() => showImage({ largeImageURL, tags })} key={id} className={css.ImageGalleryItem}>
        <img className={css.ImageGalleryItem__image} src={webformatURL} large={largeImageURL} alt={tags}></img>
    </li>);

    return (
        <div className={css.container}>
            <ul className={css.ImageGallery}>
                {image}
            </ul>
        </div>

    );

};

export default ImageGallery;

ImageGallery.defaultProps = {
    images: []
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }))
}