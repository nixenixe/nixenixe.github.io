import * as React from 'react';
import {Input} from "../../components/Input/Input";
import {AutoCompleteSelector} from "../../components/Input/AutoCompleteSelector";

export const NewExpense = () => {
    return (
        <>
            <Input />
            <AutoCompleteSelector options={[]} />
        </>
    );
};
