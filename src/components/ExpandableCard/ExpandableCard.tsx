import * as React from "react";
import './expandable-card.less';
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {JSX} from "react";
import cx from 'classnames';

interface ExpandableCardProps {
    label: string;
    content: JSX.Element;
    color?: 'WHITE' | 'GREEN';
}

export const ExpandableCard = (props: ExpandableCardProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const colorSelected = props.color ?? 'WHITE';

    const classnames = cx({
        'expandable-card': true,
        'expandable-card-open': open,
        'expandable-card-closed': !open,
        'expandable-card-white': colorSelected === 'WHITE',
        'expandable-card-green': colorSelected === 'GREEN',
    });

    return (
        <div className={classnames}>
            <div className="expandable-card-title" onClick={() => setOpen((old) => !old)}>
                {props.label}
                {open ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </div>
            {open &&
                <div className="expandable-card-content">
                    {props.content}
                </div>}
        </div>
    )
}
