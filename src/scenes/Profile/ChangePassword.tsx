import { toaster } from "@/components/ui/toaster";
import { Button, Field, Heading, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updatePassword } from "./server";

type ChangePasswordForm = {
  newPassword: string;
  confirmNewPassword: string;
};

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordForm>();
  const newPasswordValue = getValues("newPassword");

  const onSubmit = (data: ChangePasswordForm) => {
    return new Promise<void>((resolve) => {
      updatePassword(data.newPassword).then((res) => {
        reset();
        if (res === "ERROR") {
          toaster.create({
            title: "Couldn't change password. Please try again later.",
            type: "error",
          });
          resolve();
          return;
        }
        toaster.create({
          title: "Password changed successfully.",
          type: "success",
        });
        resolve();
      });
    });
  };

  console.log(errors);

  return (
    <VStack gap={4} w="full" asChild alignItems="start">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size="md">Change password</Heading>
        <Field.Root invalid={!!errors.newPassword}>
          <Field.Label>New password</Field.Label>
          <Input
            {...register("newPassword", { required: true, minLength: 8 })}
            type="password"
          />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            {errors.newPassword?.type === "minLength"
              ? "Password must be at least 8 characters"
              : "This field is required"}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.confirmNewPassword}>
          <Field.Label>Confirm new password</Field.Label>
          <Input
            {...register("confirmNewPassword", {
              required: true,
              validate: (value) =>
                value === newPasswordValue ? true : "Passwords do not match",
            })}
            type="password"
          />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            {errors.confirmNewPassword?.message || "This field is required"}
          </Field.ErrorText>
        </Field.Root>
        <Button type="submit" colorPalette="orange">
          Change password
        </Button>
      </form>
    </VStack>
  );
};
