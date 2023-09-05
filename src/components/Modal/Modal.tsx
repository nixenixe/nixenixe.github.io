import * as React from "react";
import './modal.less';
import {FiX} from "react-icons/fi";

interface ModalProps {
    children: React.JSX.Element;
    open: boolean;
    onClose: () => void;
    title: string;
}

export const Modal = (props: ModalProps) => {
    return (
        <div className={`modal${props.open ? ' modal-open' : ''}`}>
           <div className="modal-content">
               <div className="modal-content-title">
                   {props.title}
                   <FiX size={20} onClick={props.onClose} />
               </div>
               {props.children}
           </div>
        </div>
    );
}
