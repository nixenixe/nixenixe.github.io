import * as React from 'react';
import "./buttons.less";
import cx from "classnames";
import {ButtonHTMLAttributes} from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    className: string;
}

export const Button = (props: ButtonProps) => {
    const {className, ...rest} = props;
    const classnames = cx({
        [className as string]: !!className,
        'button': true,
    });

    return (
        <button className={classnames} {...rest}>
            {props.children}
        </button>
    );
};
