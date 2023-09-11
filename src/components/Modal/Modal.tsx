import * as React from "react";
import './modal.less';
import {FiX} from "react-icons/fi";
import {Spacer} from "../Spacer/Spacer";

interface ModalProps {
    children: React.JSX.Element;
    open: boolean;
    onClose: () => void;
    title: string;
}

export const Modal = (props: ModalProps) => {
    const closeOutsideClick = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) {
            return;
        } else {
            props.onClose();
        }
    };

    return (
        <div className={`modal${props.open ? ' modal-open' : ''}`} onClick={closeOutsideClick}>
            <div className="modal-content">
                <div className="modal-content-title">
                    <h2>{props.title}</h2>
                    <FiX size={30} onClick={props.onClose} />
                </div>
                <Spacer size="m" />
                {props.children}
            </div>
        </div>
    );
}
