import { type Task } from "@/types";
import { Box, Checkbox, HStack, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

interface TaskBoxProps {
  task: Task;
  onCheck: (task: Task) => void;
  changeTaskValue: (newValues: Task) => void;
  deleteTask: (task: Task) => void;
}
export const TaskBox = ({
  task,
  onCheck,
  changeTaskValue,
  deleteTask,
}: TaskBoxProps) => {
  const [editTask, setEditTask] = useState<boolean>(false);
  const [editTime, setEditTime] = useState<boolean>(false);

  const onTaskBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "") {
      const newValues: Task = {
        ...task,
        taskDescription: e.currentTarget.value,
      };
      changeTaskValue(newValues);
    }
    setEditTask(false);
  };

  const onTimeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "") {
      const newValues: Task = {
        ...task,
        time: parseInt(e.currentTarget.value),
      };
      changeTaskValue(newValues);
    }
    setEditTime(false);
  };

  return (
    <Box
      borderColor="orange.focusRing"
      borderWidth="1px"
      borderRadius="md"
      padding="4"
      backgroundColor={task.done ? "orange.subtle" : "transparent"}
    >
      <HStack w="full">
        <Checkbox.Root checked={task.done} onChange={() => onCheck(task)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>{""}</Checkbox.Label>
        </Checkbox.Root>
        <HStack
          gap="4"
          justifyContent="space-between"
          w="full"
          paddingRight="4"
        >
          {editTask ? (
            <Input
              defaultValue={task.taskDescription}
              onBlur={onTaskBlur}
              autoFocus
              size="sm"
            />
          ) : (
            <span onClick={() => setEditTask(true)}>
              {task.taskDescription}
            </span>
          )}
          {editTime ? (
            <Input
              defaultValue={task.time.toString()}
              onBlur={onTimeBlur}
              autoFocus
              size="sm"
              w="4"
            />
          ) : (
            <span onClick={() => setEditTime(true)}>{task.time}</span>
          )}
        </HStack>
        <IconButton variant="subtle" onClick={() => deleteTask(task)}>
          <MdDelete />
        </IconButton>
      </HStack>
    </Box>
  );
};
