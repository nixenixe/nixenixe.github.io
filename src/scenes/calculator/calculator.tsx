import * as React from "react";
import './calculator.less';
import {Spacer} from "../../components/Spacer/Spacer";
import {AddButton} from "../../components/Buttons/AddButton";
import {useState} from "react";
import {Modal} from "../../components/Modal/Modal";
import {NewExpense} from "./NewExpense";

export const Calculator = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <div className="page-setup calculator-page">
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={'New expense'}
                children={<NewExpense />}
            />
            <h1>Split the bill</h1>
            <Spacer size="m" />
            <AddButton label="Add expense" onClick={() => setOpenModal(true)} />
        </div>
    );
};
