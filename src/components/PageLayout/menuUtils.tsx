import * as React from 'react';
import {ViewType} from "../../context";
import {FaMoneyBillWave} from "react-icons/fa";
import {BiSolidCoffee} from "react-icons/bi";
import {JSX} from "react";

interface MenuItem {
    title: string;
    view: ViewType;
    icon: JSX.Element;
}

export const menuItems: MenuItem[] = [
    {
        title: 'Split the bill',
        view: 'CALCULATOR',
        icon: <FaMoneyBillWave />,
    },
    {
        title: 'JavaZone calendar',
        view: 'JAVAZONE',
        icon: <BiSolidCoffee />,
    },
];


