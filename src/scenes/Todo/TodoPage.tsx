import { Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { TaskBox } from "./TaskBox";
import type { SortType, Task, TodoSettings } from "./types";
import { TodoTopBar } from "./TodoTopBar";
import { AddTask } from "./AddTask";

interface TodoPageProps {
  tasks: Task[];
  settings: TodoSettings;
  refreshSettings: () => void;
  refreshTasks: () => void;
}

export const TodoPage = ({
  tasks,
  settings,
  refreshSettings,
  refreshTasks,
}: TodoPageProps) => {
  const endTime = settings.end_time?.slice(0, 2) ?? "18";
  const [sortBy, setSortBy] = useState<SortType>({
    by: "title",
    direction: "asc",
  });

  const sortList = (list: Task[]) => {
    const directionMultiplier = sortBy.direction === "asc" ? 1 : -1;

    return [...list].sort((a, b) => {
      // Always keep done tasks at the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      let result = 0;

      if (sortBy.by === "title") {
        result = a.title.localeCompare(b.title, "nb", {
          sensitivity: "base",
        });
      }

      if (sortBy.by === "duration_minutes") {
        result = a.duration_minutes - b.duration_minutes;
      }

      return result * directionMultiplier;
    });
  };

  return (
    <>
      <TodoTopBar
        tasks={tasks}
        savedEndTime={endTime}
        refreshSettings={refreshSettings}
      />
      <AddTask refreshTasks={refreshTasks} />
      <HStack w="full" justifyContent="end" marginTop="2">
        <Button
          variant="ghost"
          size="xs"
          textDecoration={sortBy.by === "title" ? "underline" : "none"}
          onClick={() =>
            setSortBy({
              by: "title",
              direction: sortBy.direction === "asc" ? "desc" : "asc",
            })
          }
        >
          Task
          {sortBy.by === "title" && sortBy.direction === "asc" ? (
            <FaSortAlphaDown />
          ) : (
            <FaSortAlphaUp />
          )}
        </Button>
        <Button
          variant="ghost"
          size="xs"
          textDecoration={
            sortBy.by === "duration_minutes" ? "underline" : "none"
          }
          onClick={() =>
            setSortBy({
              by: "duration_minutes",
              direction: sortBy.direction === "asc" ? "desc" : "asc",
            })
          }
        >
          Duration
          {sortBy.by === "duration_minutes" && sortBy.direction === "asc" ? (
            <FaSortAlphaDown />
          ) : (
            <FaSortAlphaUp />
          )}
        </Button>
      </HStack>
      <Grid
        paddingTop="2"
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap="4"
      >
        {sortList(tasks).map((task) => (
          <GridItem key={task.id}>
            <TaskBox
              task={task}
              refreshTasks={refreshTasks}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
