import * as React from "react";

interface SpacerProps {
    size: 's' | 'm' | 'l';
}
export const Spacer = ({size}: SpacerProps) => {
    return <div className={'spacer-' + size} />
}