import { VStack, Heading, Field, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export interface ChangePasswordFormType {
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordFormProps {
  updatePassword: (
    formValues: ChangePasswordFormType,
    reset: () => void,
  ) => Promise<void>;
}

export const ChangePasswordForm = ({
  updatePassword,
}: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ChangePasswordFormType>({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });
  const newPasswordValue = getValues("newPassword");

  return (
    <VStack gap={6} w="full" asChild alignItems="start">
      <form onSubmit={handleSubmit((data) => updatePassword(data, reset))}>
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
        <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
          Change password
        </Button>
      </form>
    </VStack>
  );
};
