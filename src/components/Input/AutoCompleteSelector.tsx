import * as React from 'react';
import Select from 'react-select';
import {customStyle} from "./customStyle";

export interface Option {
    label: string;
    value: string | number | undefined;
    isDisabled?: boolean;
}

interface SelectorProps {
    options: Option[]
}

export const AutoCompleteSelector = (props: SelectorProps) => {
    return (
        <Select
            // styles={customStyle}
        />
    );
}
