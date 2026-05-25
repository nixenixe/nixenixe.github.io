import { Button, Field, Heading, Input, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "./server";
import { NarrowCenteredPage } from "@/components/NarrowCenteredPage";
import { useState } from "react";
import { Message } from "@/components/Message";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link as ReactLink } from "react-router-dom";
import { routes } from "@/routes";

type ForgotPasswordFormValues = {
  email: string;
};

export const ForgotPasswordPage = () => {
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>();

  function onSubmit(values: ForgotPasswordFormValues) {
    return new Promise<void>((resolve) => {
      setMessage(null);
      sendPasswordResetEmail(values.email).then((res) => {
        if (res.type === "ERROR") {
          const messageText =
            res.code === "over_email_send_rate_limit"
              ? "Too many reset requests. Please wait a while before trying again."
              : "Couldn't send reset email. Please try again later.";
          setMessage({
            type: "error",
            text: messageText,
          });
          resolve();
          return;
        }
        setMessage({
          type: "success",
          text: "A password reset email has been sent to your email address if it exists in our system. Please check your inbox and follow the instructions in the email to reset your password.",
        });
        resolve();
      });
    });
  }

  return (
    <NarrowCenteredPage asChild>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Link asChild>
          <ReactLink to={routes.LOGIN}>
            <IoIosArrowRoundBack /> Back to login
          </ReactLink>
        </Link>
        <Heading>Forgot your password?</Heading>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Your email</Field.Label>
          <Input
            {...register("email", {
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
            {errors.email?.message || "This field is required"}
          </Field.ErrorText>
        </Field.Root>

        {message && <Message type={message.type}>{message.text}</Message>}

        <Button type="submit" disabled={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </NarrowCenteredPage>
  );
};
