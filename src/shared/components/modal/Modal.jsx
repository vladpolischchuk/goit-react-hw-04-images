import { useEffect } from "react";
import { createPortal } from "react-dom";

import css from './Modal.module.css';

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ closeImage, children }) => {
    const closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            closeImage();
        };
    };

    useEffect(() => {
        document.addEventListener("keydown", closeModal);
        return () => document.removeEventListener("keydown", closeModal);
    });

    return (
        createPortal(
            <div className={css.Overlay} onClick={closeModal}>
                <div className={css.Modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        )
    );
};

/*
class Modal extends Component {

    componentDidMount() {
        document.addEventListener("keydown", this.closeModal);
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal)
    };

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            this.props.closeImage();
        }
    };

    render() {
        const { children } = this.props;
        const { closeModal } = this;

        return (
            createPortal(
                <div className={css.Overlay} onClick={closeModal}>
                    <div className={css.Modal}>
                        {children}
                    </div>
                </div>,
                modalRoot
            )
        )
    };
};
*/

export default Modal;