import * as React from "react";
import {ExpandableCard} from "../../components/ExpandableCard/ExpandableCard";
import './calculator.less';
import {Spacer} from "../../components/Spacer/Spacer";
import {FiArrowLeft} from "react-icons/fi";
import {AddButton} from "../../components/Buttons/AddButton";
import {Modal} from "../../components/Modal/Modal";
import {useContext, useState} from "react";
import {context, views} from "../../context";

export const Calculator = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {setView} = useContext(context);

    return (
        <div className="page-setup calculator-page">
            <Modal
                open={openModal}
                title="Add expense"
                onClose={() => setOpenModal(false)}
            >
                <p>hei</p>
            </Modal>
            <div className="header">
                <FiArrowLeft size={20} onClick={() => setView(views.HOME)}/>
                <h3>Split the bill</h3>
            </div>
            <Spacer size="m"/>
            <ExpandableCard label={'Test'}/>
            <Spacer size="s"/>
            <AddButton label="Add expense" onClick={() => setOpenModal(true)}/>
        </div>
    );
}