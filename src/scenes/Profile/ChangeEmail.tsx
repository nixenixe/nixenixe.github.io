import { toaster } from "@/components/ui/toaster";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Heading,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateEmail } from "./server";
import React from "react";

type ChangeEmailForm = {
  newEmail: string;
};

interface ChangeEmailProps {
  getUserInfo: () => Promise<void>;
}

export const ChangeEmail = ({ getUserInfo }: ChangeEmailProps) => {
  const [pendingEmail, setPendingEmail] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ChangeEmailForm>({defaultValues: { newEmail: "" }});

  const onSubmit = (data: ChangeEmailForm) => {
    setPendingEmail(data.newEmail);
  };

  const saveConfirmedEmail = () => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      updateEmail(pendingEmail).then((res) => {
        setLoading(false);
        reset();
        if (res.type === "ERROR") {
          const message =
            res.code === "over_email_send_rate_limit"
              ? "Too many email change attempts. Please try again later."
              : "Couldn't change email. Please try again later.";

          toaster.create({
            title: message,
            type: "error",
          });
          resolve();
          return;
        }
        toaster.create({
          title:
            "A confirmation email has been sent to your new email address. Please confirm the change by clicking the link in the email.",
          type: "success",
        });
        getUserInfo();
        resolve();
      });
    });
  };

  return (
    <VStack gap={6} w="full" asChild alignItems="start">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size="md">Change email</Heading>
        <Field.Root invalid={!!errors.newEmail}>
          <Field.Label>New email</Field.Label>
          <Input
            {...register("newEmail", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
          />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            {errors.newEmail?.message || "This field is required"}
          </Field.ErrorText>
        </Field.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button colorPalette="orange" disabled={!isDirty} type="submit">
              Save
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Confirm email change</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    The new email will be: <strong>{pendingEmail}</strong>
                    <br />
                    Are you sure you want to change your email to this?
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      type="button"
                      colorPalette="orange"
                      onClick={saveConfirmedEmail}
                      loading={loading}
                    >
                      Confirm and save
                    </Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild type="button">
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </form>
    </VStack>
  );
};
