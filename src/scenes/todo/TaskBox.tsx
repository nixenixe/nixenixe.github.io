import * as React from 'react';
import {Task} from "./types";
import {Input} from "../../components/Input/Input";
import {useState} from "react";
import {MdDelete} from "react-icons/md";

interface TaskBoxProps {
    task: Task;
    onCheck: (task: Task) => void;
    changeTaskValue: (newValues: Task) => void;
    deleteTask: (task: Task) => void;
}

export const TaskBox = ({task, onCheck, changeTaskValue, deleteTask}: TaskBoxProps) => {
    const [editTask, setEditTask] = useState<boolean>(false);
    const [editTime, setEditTime] = useState<boolean>(false);

    const onTaskBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== '') {

            console.log('1');
            const {taskDescription, ...rest} = task;
            const newValues: Task = {taskDescription: e.currentTarget.value, ...rest};
            changeTaskValue(newValues);
        }
        setEditTask(false);
    };

    const onTimeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== '') {
            const {time, ...rest} = task;
            const newValues: Task = {time: parseInt(e.currentTarget.value), ...rest};
            changeTaskValue(newValues);
        }
        setEditTime(false);
    };

    return (
        <div className={`task-container ${task.done ? 'task-container-done' : ''}`}>
            <Input type="checkbox" defaultChecked={task.done} onClick={() => onCheck(task)}/>
            {!editTask &&
                <p
                    className="task-text"
                    onClick={() => {
                        if (!task.done) {
                            setEditTask(true);
                        }
                    }}
                >
                    {task.taskDescription}
                </p>}
            {editTask &&
                <Input
                    defaultValue={task.taskDescription}
                    onBlur={onTaskBlur}
                    autoFocus={true}
                />}
            {!editTime && <p
                onClick={() => {
                    if (!task.done) {
                        setEditTime(true)
                    }
                }}
            >
                {task.time}
            </p>}
            {editTime &&
                <Input
                    defaultValue={task.time}
                    onBlur={onTimeBlur}
                    type="number"
                    className="time-input"
                    autoFocus={true}
                />}
            <MdDelete onClick={() => deleteTask(task)}/>
        </div>
    );
};

