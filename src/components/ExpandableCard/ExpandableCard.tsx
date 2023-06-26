import * as React from "react";
import './expandable-card.less';
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

interface ExpandableCardProps {
    label: string;
}

export const ExpandableCard = (props: ExpandableCardProps) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div
            className={`expandable-card expandable-card-${open ? 'open' : 'closed'}`}
            onClick={() => setOpen((old) => !old)}
        >
            <div className="expandable-card-title">
                {props.label}
                {open ? <FiChevronUp size={20}/> : <FiChevronDown size={20}/>}
            </div>
            {open &&
                <div className="expandable-card-content">
                    <p>Test</p>
                </div>}
        </div>
    )
}