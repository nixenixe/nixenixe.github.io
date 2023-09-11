import * as React from 'react';
import {Options} from "react-select";
import Select from "react-select";

interface SelectorProps {
    options: Options<any>;
}

export const Selector = (props: SelectorProps) => {
    return (
        <Select
            options={props.options}
            styles={{}}
        />
    );
}
