import * as React from 'react';
import {useState} from "react";
import {Input} from "../../components/Input/Input";

interface EndTimeProps {
    endTime: string;
    setEndTime: (newTime: string) => void;
}

export const EndTime = ({endTime, setEndTime}: EndTimeProps) => {
    const [editEndTime, setEditEndTime] = useState<boolean>(false);

    return (
        <div className="end-time-input">
            <label>End time</label>
            {!editEndTime &&
                <p onClick={() => setEditEndTime(true)}>
                    {endTime}{':00'}
                </p>}
            {editEndTime &&
                <Input
                    defaultValue={endTime}
                    type="number"
                    autoFocus={true}
                    onBlur={(e) => {
                        if (e.currentTarget.value !== '') {
                            setEndTime(e.currentTarget.value);
                        }
                        setEditEndTime(false);
                    }}
                />}
        </div>
    );
};