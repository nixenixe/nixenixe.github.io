import * as React from "react";
import {FiPlus} from "react-icons/fi";
import './buttons.less';
import {Spacer} from "../Spacer/Spacer";

interface AddButtonProps {
    label: string;
    onClick: () => void;
}

export const AddButton  = (props: AddButtonProps) => {
    return (
        <div className="add-button" onClick={props.onClick}>
            <FiPlus />
            <Spacer size="s" />
            {props.label}
        </div>
    )
}