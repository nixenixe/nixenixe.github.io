import * as React from 'react';
import {MdDelete} from "react-icons/md";

interface IconButtonProps {
    icon: 'delete';
    onClick: () => void;
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <div onClick={props.onClick} className="icon-button">
            {props.icon === 'delete' && <MdDelete />}
        </div>
    )
}