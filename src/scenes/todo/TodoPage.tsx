import {
  Box,
  Button,
  Grid,
  GridItem,
  Group,
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { IoRefresh } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TaskBox } from "./TaskBox";
import { useState } from "react";
import { type SortType, type Task } from "@/types";
import type { Moment } from "moment";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { formatDuration } from "@/utils";
import { EndTime } from "./EndTime";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";

export const TodoPage = () => {
  const tasksKey = "tasks";
  const endTimeKey = "endTime";
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasksString = localStorage.getItem(tasksKey);

    if (!savedTasksString) {
      return [];
    }

    try {
      return JSON.parse(savedTasksString) as Task[];
    } catch {
      return [];
    }
  });

  const [endTime, setEndTime] = useState<string>(() => {
    return localStorage.getItem(endTimeKey) ?? "18";
  });
  const [currentTask, setCurrentTask] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortType>({
    by: "taskDescription",
    direction: "asc",
  });
  const [timeNow, setTimeNow] = useState<Moment>(moment());

  const changeTaskValues = (newValues: Task) => {
    setTasks((old) => {
      const restOfArray = [...old].filter((t) => t.id !== newValues.id);
      localStorage.setItem(
        tasksKey,
        JSON.stringify([...restOfArray, newValues]),
      );
      return [...restOfArray, newValues];
    });
  };

  const infoWithLabel = (label: string, info: string) => (
    <VStack align="start" minHeight="53px" minWidth="83px" gap="0.25">
      <Text fontSize="sm">
        <strong>{label}:</strong>
      </Text>
      <Text fontSize="sm">{info}</Text>
    </VStack>
  );

  const checkAsDone = (task: Task) => {
    const { done, ...rest } = task;
    changeTaskValues({ done: !done, ...rest });
  };

  const deleteAll = () => {
    setTasks([]);
    localStorage.setItem(tasksKey, JSON.stringify([]));
  };

  const deleteTask = (task: Task) => {
    setTasks((old) => {
      const newArray = [...old].filter((t) => t.id !== task.id);
      localStorage.setItem(tasksKey, JSON.stringify(newArray));
      return newArray;
    });
  };

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
    setCurrentTask("");
    setCurrentTime("");
    document.getElementById("task-description-id")?.focus();
  };

  const onRefresh = () => setTimeNow(moment());

  const getPercentDone = () => {
    const amountDone = tasks.filter((t) => t.done);
    if (amountDone.length > 0) {
      const cal = (amountDone.length / tasks.length) * 100;
      return Math.trunc(cal).toString() + "%";
    }
    return "0%";
  };

  const getTimeAmount = () => {
    if (tasks.length > 0) {
      const timeUndone = tasks.filter((t) => !t.done).map((d) => d.time);
      if (timeUndone.length > 0) {
        const totalTime = timeUndone.reduce((p, a) => p + a);
        const duration = moment.duration(totalTime, "minute");
        return formatDuration(duration);
      }
    }
    return "-";
  };

  const getTimeLeft = () => {
    const endTimeMoment = moment().set({
      hour: parseInt(endTime),
      minute: 0,
      second: 0,
    });
    const negativeTime = endTimeMoment.diff(timeNow) < 0;
    const diff = negativeTime
      ? timeNow.diff(endTimeMoment)
      : endTimeMoment.diff(timeNow);
    return `${negativeTime ? "-" : ""}${formatDuration(moment.duration(diff))}`;
  };

  const getSurplus = () => {
    if (tasks.length > 0) {
      const timeUndone = tasks.filter((t) => !t.done).map((d) => d.time);
      if (timeUndone.length > 0) {
        const totalTime = timeUndone.reduce((p, a) => p + a);
        const endTimeMoment = moment().set({
          hour: parseInt(endTime),
          minute: 0,
          second: 0,
        });
        const startMoment = endTimeMoment.subtract(totalTime, "minute");
        const surplus = startMoment.diff(timeNow) > 0;
        const diff = surplus
          ? startMoment.diff(timeNow)
          : timeNow.diff(startMoment);
        return `${surplus ? "" : "-"}${formatDuration(moment.duration(diff))}`;
      }
    }
    return "-";
  };

  const getStartTime = () => {
    if (tasks.length > 0) {
      const timeUndone = tasks.filter((t) => !t.done).map((d) => d.time);
      if (timeUndone.length > 0) {
        const totalTime = timeUndone.reduce((p, a) => p + a);
        const endTimeMoment = moment().set({
          hour: parseInt(endTime),
          minute: 0,
          second: 0,
        });
        const startMoment = endTimeMoment.subtract(totalTime, "minute");
        return startMoment.format("HH:mm");
      }
    }
    return "-";
  };

  const sortList = (list: Task[]) => {
    const directionMultiplier = sortBy.direction === "asc" ? 1 : -1;

    return [...list].sort((a, b) => {
      // Always keep done tasks at the bottom
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }

      let result = 0;

      if (sortBy.by === "taskDescription") {
        result = a.taskDescription.localeCompare(b.taskDescription, "nb", {
          sensitivity: "base",
        });
      }

      if (sortBy.by === "time") {
        result = a.time - b.time;
      }

      return result * directionMultiplier;
    });
  };

  const saveEndTime = (newTime: string) => {
    setEndTime(newTime);
    localStorage.setItem(endTimeKey, newTime);
  };

  return (
    <>
      <Box
        borderColor="orange.focusRing"
        borderWidth="1px"
        borderRadius="md"
        padding="4"
        paddingBottom="5px"
        justifyContent="space-between"
        display="flex"
        alignItems="start"
      >
        <HStack gap={{ base: 2, md: 8 }} alignItems="start" flexWrap="wrap">
          {infoWithLabel("Done", getPercentDone())}
          {infoWithLabel("Duration", getTimeAmount())}
          {infoWithLabel("Time left", getTimeLeft())}
          {infoWithLabel("Surplus", getSurplus())}
          {infoWithLabel("Start time", getStartTime())}
          <EndTime endTime={endTime} setEndTime={saveEndTime} />
        </HStack>
        <HStack>
          <IconButton variant="subtle" onClick={onRefresh} bg="orange.subtle">
            <IoRefresh />
          </IconButton>
          <IconButton variant="subtle" onClick={deleteAll} bg="orange.subtle">
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
      <HStack marginTop="6">
        <Group attached w="full">
          <Input
            placeholder="Task"
            onChange={(e) => setCurrentTask(e.target.value)}
            value={currentTask}
            id="task-description-id"
          />
          <Input
            placeholder="Time"
            w="52"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
            onKeyDown={(event) => {
              if (
                currentTime !== "" &&
                currentTask !== "" &&
                event.key === "Enter"
              ) {
                addTask();
              }
            }}
          />
          <Button disabled={!currentTask || !currentTime} onClick={addTask}>
            Add
          </Button>
        </Group>
      </HStack>
      <HStack w="full" justifyContent="end" marginTop="4">
        <Button
          variant="ghost"
          size="xs"
          textDecoration={
            sortBy.by === "taskDescription" ? "underline" : "none"
          }
          onClick={() =>
            setSortBy({
              by: "taskDescription",
              direction: sortBy.direction === "asc" ? "desc" : "asc",
            })
          }
        >
          Task
          {sortBy.by === "taskDescription" && sortBy.direction === "asc" ? (
            <FaSortAlphaDown />
          ) : (
            <FaSortAlphaUp />
          )}
        </Button>
        <Button
          variant="ghost"
          size="xs"
          textDecoration={sortBy.by === "time" ? "underline" : "none"}
          onClick={() =>
            setSortBy({
              by: "time",
              direction: sortBy.direction === "asc" ? "desc" : "asc",
            })
          }
        >
          Time
          {sortBy.by === "time" && sortBy.direction === "asc" ? (
            <FaSortAlphaDown />
          ) : (
            <FaSortAlphaUp />
          )}
        </Button>
      </HStack>
      <Grid
        paddingTop="4"
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap="4"
      >
        {sortList(tasks).map((task) => (
          <GridItem key={task.id}>
            <TaskBox
              task={task}
              onCheck={(task) => checkAsDone(task)}
              changeTaskValue={(newValues) => changeTaskValues(newValues)}
              deleteTask={(task) => deleteTask(task)}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
