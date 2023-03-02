import { useState, useEffect } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ButtonLoadMore from "../Button/Button";
import Modal from "../../shared/components/modal/Modal";
import LargeImage from "../LargeImage/LargeImage";
import Loader from "../Loader/Loader";

import { searchImages } from "../../shared/services/imagesAPI.js";

import css from './ImageFinder.module.css';

const ImageFinder = () => {
    const [search, setSearch] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        if (search) {
            const fetchImages = async () => {
                try {
                    setLoading(true);
                    const data = await searchImages(search, page);
                    setImages(prevImages => ([...prevImages, ...data.hits]));
                }
                catch (error) {
                    setError(error.message);
                }
                finally {
                    setLoading(false);
                }
            };
            fetchImages();
        };
    }, [search, page, setLoading, setImages, setError]);

    const onSearchImages = ({ search }) => {
        setSearch(search);
        searchImages([]);
        setPage(1);
    };

    const showImage = (data) => {
        setModalImage(data);
        setShowModal(true);
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const closeImage = () => {
        setShowModal(false);
        setModalImage(null);
    };

    return (
        <>
            <Searchbar onSubmit={onSearchImages} />
            {error && <p className={css.error}>Something goes wrong. Please try again later.</p>}
            {loading && <Loader />}
            <ImageGallery images={images} showImage={showImage} />
            {Boolean(images.length) && <ButtonLoadMore loadMore={loadMore} />}
            {showModal && <Modal closeImage={closeImage}>
                <LargeImage {...modalImage} />
            </Modal>}
        </>
    );
};

export default ImageFinder;