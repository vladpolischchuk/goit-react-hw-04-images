import css from "./LargeImage.module.css"

const LargeImage = ({ largeImageURL, tags }) => {
    return (
        <img className={css.largeImg} src={largeImageURL} alt={tags} />
    )
};

export default LargeImage;