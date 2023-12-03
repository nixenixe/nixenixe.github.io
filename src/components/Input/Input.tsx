import * as React from "react";
import {InputHTMLAttributes} from "react";
import "./input.less";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'required' | 'size'> {}

export const Input = (props: InputProps) => {
    return <input {...props} />;
}
