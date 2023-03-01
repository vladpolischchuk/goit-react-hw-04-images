import { Component } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ButtonLoadMore from "../Button/Button";
import Modal from "../../shared/components/modal/Modal";
import LargeImage from "../LargeImage/LargeImage";
import Loader from "../Loader/Loader";

import { searchImages } from "../../shared/services/imagesAPI.js";

import css from './ImageFinder.module.css';

class ImageFinder extends Component {
    state = {
        search: "",
        images: [],
        loading: false,
        error: null,
        page: 1,
        showModal: false,
        modalImage: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { search, page } = this.state;

        if (prevState.search !== search || prevState.page !== page) {
            this.fetchImages();
        };
    };

    async fetchImages() {
        try {
            this.setState({ loading: true });
            const { search, page } = this.state;
            const data = await searchImages(search, page);

            console.log(data.hits)
            this.setState(({ images }) => ({
                images: [...images, ...data.hits]
            }));
        }
        catch (error) {
            this.setState({ error: error.message });
        }
        finally {
            this.setState({ loading: false });
        }
    };

    searchImages = ({ search }) => {
        this.setState({ search, images: [], page: 1 });
    };

    loadMore = () => {
        this.setState(({ page }) => ({ page: page + 1 }));
    };

    showImage = ({ largeImageURL, tags }) => {
        this.setState({
            modalImage: {
                largeImageURL,
                tags,
            },
            showModal: true,
        });
    };

    closeImage = () => {
        this.setState({
            showModal: false,
            modalImage: null,
        });
    };

    render() {
        const { images, loading, error, showModal, modalImage } = this.state;
        const { searchImages, loadMore, showImage, closeImage } = this;

        return (
            <>
                <Searchbar onSubmit={searchImages} />
                {error && <p className={css.error}>Something goes wrong. Please try again later.</p>}
                {loading && <Loader />}
                <ImageGallery images={images} showImage={showImage} />
                {Boolean(images.length) && <ButtonLoadMore loadMore={loadMore} />}
                {showModal && <Modal closeImage={closeImage}>
                    <LargeImage {...modalImage} />
                </Modal>}
            </>

        )
    };

};

export default ImageFinder;