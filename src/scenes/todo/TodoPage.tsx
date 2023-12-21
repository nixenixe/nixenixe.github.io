import * as React from 'react';
import './todo.less';
import {Input} from "../../components/Input/Input";
import {Spacer} from "../../components/Spacer/Spacer";
import {Button} from "../../components/Buttons/Button";
import {useEffect, useState} from "react";
import {Task} from "./types";
import {v4 as uuidv4} from 'uuid';
import {IconButton} from "../../components/Buttons/IconButton";
import {TaskBox} from "./TaskBox";
import {EndTime} from "./EndTime";
import moment, {Moment} from "moment";
import {formatDuration} from "./utils";
import {GoColumns} from "react-icons/go";


export const TodoPage = () => {
    const tasksKey = 'tasks';
    const endTimeKey = 'endTime';
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTask, setCurrentTask] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('18');
    const [timeNow, setTimeNow] = useState<Moment>(moment().set('second', 0));

    useEffect(() => {
        const savedTasksString = localStorage.getItem(tasksKey);
        if (savedTasksString) {
            const savedTasks = JSON.parse(savedTasksString) as Task[];
            setTasks(savedTasks);
        }

        const savedEndTime = localStorage.getItem(endTimeKey);
        if (savedEndTime) {
            setEndTime(savedEndTime);
        }
        const interval = setInterval(() => setTimeNow((moment().set('second', 0))), 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeNow(moment().set('second', 0));
    }, [endTime]);

    const addTask = () => {
        const newTask: Task = {
            id: uuidv4(),
            taskDescription: currentTask!,
            time: parseInt(currentTime)!,
            done: false,
        };
        setTasks((old) => [...old, newTask]);
        const savedTasksString = localStorage.getItem(tasksKey);
        if (savedTasksString) {
            const savedTasks = JSON.parse(savedTasksString) as Task[];
            localStorage.setItem(tasksKey, JSON.stringify([...savedTasks, newTask]));
        } else {
            localStorage.setItem(tasksKey, JSON.stringify([newTask]));
        }
        setCurrentTask('');
        setCurrentTime('');
        document.getElementById("task-description-id").focus();
    };

    const getStartTime = () => {
        if (tasks.length > 0) {
            const timeUndone = tasks.filter((t) => !t.done).map((d) => d.time);
            if (timeUndone.length > 0) {
                const totalTime = timeUndone.reduce((p, a) => p + a);
                const endTimeMoment = moment().set({hour: parseInt(endTime), minute: 0, second: 0});
                const startMoment = endTimeMoment.subtract(totalTime, 'minute');
                return startMoment.format('HH:mm');
            }
        }
        return '-';

    };

    const getTimeLeft = () => {
        const endTimeMoment = moment().set({hour: parseInt(endTime), minute: 0, second: 0});
        const negativeTime = endTimeMoment.diff(timeNow) < 0;
        const diff = negativeTime ? timeNow.diff(endTimeMoment) : endTimeMoment.diff(timeNow);
        return `${negativeTime ? '-' : ''}${formatDuration(moment.duration(diff))}`;
    };

    const getTimeAmount = () => {
        if (tasks.length > 0) {
            const timeUndone = tasks.filter((t) => !t.done).map((d) => d.time);
            if (timeUndone.length > 0) {
                const totalTime = timeUndone.reduce((p, a) => p + a);
                const duration = moment.duration(totalTime, 'minute');
                return formatDuration(duration);
            }
        }
        return '-';
    };

    const getSurplus = () => {
        if (tasks.length > 0) {
            const timeUndone = tasks.filter((t) => !t.done).map((d) => d.time);
            if (timeUndone.length > 0) {
                const totalTime = timeUndone.reduce((p, a) => p + a);
                const endTimeMoment = moment().set({hour: parseInt(endTime), minute: 0, second: 0});
                const startMoment = endTimeMoment.subtract(totalTime, 'minute');
                const surplus = startMoment.diff(timeNow) > 0;
                const diff = surplus ? startMoment.diff(timeNow) : timeNow.diff(startMoment);
                return `${surplus ? '' : '-'}${formatDuration(moment.duration(diff))}`;
            }

        }
        return '-';
    };

    const getInfoWithLabel = (label: string, info: string) => {
        return (
            <div>
                <label>{label}</label>
                <p>{info}</p>
            </div>
        );
    };

    const changeTaskValues = (newValues: Task) => {
        setTasks((old) => {
            const index = old.findIndex((t => t.id === newValues.id));
            if (index >= 0) {
                const newArray = [...old];
                newArray.splice(index, 1);
                return [...newArray, newValues];
            } else {
                return old;
            }
        });
        const savedTasksString = localStorage.getItem(tasksKey);
        if (savedTasksString) {
            const savedTasks = JSON.parse(savedTasksString) as Task[];
            const index = savedTasks.findIndex((t => t.id === newValues.id));
            if (index >= 0) {
                const newArray = [...savedTasks];
                newArray.splice(index, 1);
                localStorage.setItem(tasksKey, JSON.stringify([...newArray, newValues]));
            }
        }
    }

    const sortList = (list: Task[]) => {
        return list.sort((a, b) => {
            if (a.done > b.done) {
                return 1;
            } else if (a.done < b.done) {
                return -1;
            }
            return a.taskDescription.localeCompare(b.taskDescription);
        });
    };

    const checkAsDone = (task: Task) => {
        const {done, ...rest} = task;
        changeTaskValues({done: !done, ...rest});
    }

    const deleteAll = () => {
        setTasks([]);
        localStorage.setItem(tasksKey, JSON.stringify([]));
    }

    const getPercentDone = () => {
        const amountDone = tasks.filter((t) => t.done);
        if (amountDone.length > 0) {
            const cal = (amountDone.length / tasks.length) * 100;
            return Math.trunc(cal).toString() + '%';
        }
        return '0%';
    }

    const saveEndTime = (newTime: string) => {
        setEndTime(newTime);
        localStorage.setItem(endTimeKey, newTime);
    };

    const deleteTask = (task: Task) => {
        setTasks((old) => {
            const index = old.findIndex((t => t.id === task.id));
            if (index >= 0) {
                const newArray = [...old];
                newArray.splice(index, 1);
                return [...newArray];
            } else {
                return old;
            }
        });
        const savedTasksString = localStorage.getItem(tasksKey);
        if (savedTasksString) {
            const savedTasks = JSON.parse(savedTasksString) as Task[];
            const index = savedTasks.findIndex((t => t.id === t.id));
            if (index >= 0) {
                const newArray = [...savedTasks];
                newArray.splice(index, 1);
                localStorage.setItem(tasksKey, JSON.stringify([...newArray]));
            }
        }
    };

    return (
        <div className="todo-page">
            <div className="todo-info-box">
                {getInfoWithLabel('Done', getPercentDone())}
                {getInfoWithLabel('Duration', getTimeAmount())}
                {getInfoWithLabel('Time left', getTimeLeft())}
                {getInfoWithLabel('Surplus', getSurplus())}
                {getInfoWithLabel('Start time', getStartTime())}
                <EndTime endTime={endTime} setEndTime={saveEndTime} />
                <IconButton icon="delete" onClick={deleteAll} />
            </div>
            <Spacer size="m" />
            <div className="todo-input-container">
                <Input
                    onChange={(e) => {
                        setCurrentTask(e.currentTarget.value);
                    }}
                    value={currentTask}
                    placeholder="Task"
                    className="task-input"
                    id="task-description-id"
                />
                <Input
                    type="number"
                    onChange={(e) => {
                        setCurrentTime(e.currentTarget.value);
                    }}
                    value={currentTime}
                    placeholder="Time"
                    className="time-input"
                    onKeyDown={(event) => {
                        if (currentTime !== '' && currentTask !== '' && event.key === 'Enter') {
                            addTask();
                        }
                    }}
                />
                <Spacer size="s" />
                <Button onClick={addTask} disabled={!currentTask || !currentTime}>
                    Add
                </Button>

            </div>
            <Spacer size="m" />
            <div className={`tasks-list`}>
                {sortList(tasks).map((t) => {
                    return (
                        <TaskBox
                            task={t}
                            onCheck={(task) => checkAsDone(task)}
                            key={t.id}
                            changeTaskValue={(newValues) => changeTaskValues(newValues)}
                            deleteTask={(task) => deleteTask(task)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
