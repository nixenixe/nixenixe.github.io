import * as React from 'react';
import {FiArrowLeft} from "react-icons/fi";
import "./header.less";

interface HeaderWithBackButtonProps {
    header: string;
    onClick: () => void;
}

export const HeaderWithBackButton = ({header, onClick}: HeaderWithBackButtonProps) => {
    return (
        <div className="header-with-back-button">
            <FiArrowLeft size={20} onClick={onClick}/>
            <h3>{header}</h3>
        </div>
    );
}
