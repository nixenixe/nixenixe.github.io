import { toaster } from "@/components/ui/toaster";
import { Group, Input, Button, Field } from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addTodo } from "./server";

type AddTaskForm = {
  title: string;
  duration_minutes: number;
};

interface AddTaskProps {
  refreshTasks: () => void;
}

export const AddTask = ({ refreshTasks }: AddTaskProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskForm>();
  
  const onSubmit: SubmitHandler<AddTaskForm> = (data) => {
    return new Promise<void>((resolve) => {
      addTodo(data.title, data.duration_minutes).then((res) => {
        if (res === "ERROR") {
          toaster.create({
            title: "Couldn't add task. Please try again later.",
            type: "error",
          });
          resolve();
          return;
        }
        reset();
        document.getElementById("task-description-id")?.focus();
        refreshTasks();
        resolve();
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group attached w="full" alignItems="start" marginTop="4">
        <Field.Root invalid={!!errors.title}>
          <Field.Label hidden>Task</Field.Label>
          <Input
            placeholder="Task"
            {...register("title", { required: true })}
            id="task-description-id"
            borderRadius="4px 0 0 4px"
          />
          {errors.title && (
            <Field.ErrorText>
              {" "}
              <Field.ErrorIcon />
              This field is required
            </Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root w="40%" invalid={!!errors.duration_minutes}>
          <Input
            placeholder="Time"
            {...register("duration_minutes", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            borderRadius="0"
          />
          {errors.duration_minutes && (
            <Field.ErrorText>
              {" "}
              <Field.ErrorIcon />
              This field is required
            </Field.ErrorText>
          )}
        </Field.Root>
        <Button colorPalette="orange" loading={isSubmitting} type="submit">
          Add
        </Button>
      </Group>
    </form>
  );
};
