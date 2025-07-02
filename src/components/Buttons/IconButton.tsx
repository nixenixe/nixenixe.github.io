import * as React from 'react';
import {MdDelete, MdRefresh} from "react-icons/md";

interface IconButtonProps {
    icon: 'delete' | 'refresh';
    onClick: () => void;
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <div onClick={props.onClick} className="icon-button">
            {props.icon === 'delete' && <MdDelete />}
            {props.icon === 'refresh' && <MdRefresh />}
        </div>
    )
}
