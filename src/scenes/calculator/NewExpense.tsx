import * as React from 'react';
import {Input} from "../../components/Input/Input";
import {Selector} from "../../components/Input/Selector";

export const NewExpense = () => {
    return (
        <>
            <Input />
            <Selector options={[]} />
        </>
    );
};
