import * as React from 'react';
import "./buttons.less";
import cx from "classnames";

interface ButtonProps extends Omit<HTMLButtonElement, 'className'> {
    className: string;
}

export const Button = (props: ButtonProps) => {
    const classnames = cx({
        'button': true,
        ...props.className,
    });

    return (
        <button className={classnames} {...props}>
            {props.children}
        </button>
    );
};
