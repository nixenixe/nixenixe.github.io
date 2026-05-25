import {
  Box,
  Checkbox,
  Editable,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import type { Task } from "./types";
import { toaster } from "@/components/ui/toaster";
import { deleteTodo, updateTodoValues } from "./server";
import { useState } from "react";

interface TaskBoxProps {
  task: Task;
  refreshTasks: () => void;
}
export const TaskBox = ({ task, refreshTasks }: TaskBoxProps) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const [newDuration, setNewDuration] = useState<number>(task.duration_minutes);

  const changeTaskValue = (newValues: Task) => {
    setUpdateLoading(true);
    updateTodoValues(task.id, newValues).then((res) => {
      setUpdateLoading(false);
      if (res === "ERROR") {
        toaster.create({
          title: "Couldn't update task. Please try again later.",
          type: "error",
        });
        return;
      }
      refreshTasks();
    });
  };

  const deleteTask = () => {
    setDeleteLoading(true);
    deleteTodo(task.id).then((res) => {
      if (res === "ERROR") {
        toaster.create({ type: "error", title: "Error deleting task" });
        setDeleteLoading(false);
        return;
      }
      refreshTasks();
    });
  };

  return (
    <Box
      borderColor="orange.border"
      borderWidth="1px"
      borderRadius="md"
      padding="4"
      backgroundColor={task.completed ? "orange.subtle" : "transparent"}
      position="relative"
    >
      <HStack w="full">
        <Checkbox.Root
          checked={task.completed}
          onChange={() =>
            changeTaskValue({ ...task, completed: !task.completed })
          }
        >
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
          <Editable.Root
            value={task.title}
            onValueChange={(e) => setNewTitle(e.value)}
            onBlur={() => changeTaskValue({ ...task, title: newTitle })}
          >
            <Editable.Preview />
            <Editable.Input />
          </Editable.Root>
          <Editable.Root
            value={task.duration_minutes.toString()}
            onValueChange={(e) => setNewDuration(parseInt(e.value))}
            onBlur={() =>
              changeTaskValue({ ...task, duration_minutes: newDuration })
            }
            justifyContent="end"
          >
            <Editable.Preview />
            <Editable.Input />
          </Editable.Root>
        </HStack>
        <IconButton
          variant="subtle"
          onClick={deleteTask}
          loading={deleteLoading || updateLoading}
          size="sm"
        >
          <MdDelete />
        </IconButton>
      </HStack>
    </Box>
  );
};
