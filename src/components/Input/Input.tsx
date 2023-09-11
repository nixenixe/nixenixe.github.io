import * as React from "react";
import {InputHTMLAttributes} from "react";
import "./input.less";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'required'> {
    label?: string;
}

export const Input = (props: InputProps) => {
    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <input />
        </div>
    );
}
