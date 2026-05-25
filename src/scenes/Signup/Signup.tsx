import { PasswordInput } from "@/components/ui/password-input";
import { Button, Field, Heading, Input, Link, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Message } from "@/components/Message";
import { Link as ReactLink } from "react-router-dom";
import { routes } from "@/routes";
import { FaHeart } from "react-icons/fa";
import { createUser } from "./server";

type SignupForm = {
  email: string;
  password: string;
  name: string;
};

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SignupForm>();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const submitSignup = (data: SignupForm) => {
    return new Promise<void>((resolve) => {
      setMessage(null);
      createUser({
        email: data.email,
        password: data.password,
        name: data.name,
      }).then((res) => {
        if (res.type === "ERROR") {
          setMessage({ type: "error", text: res.message });
          resolve();
          return;
        }
        setMessage({
          type: "success",
          text: "Check your email for a confirmation link to complete your signup.",
        });
        resolve();
        return;
      });
    });
  };

  return (
    <VStack gap={6} align="stretch" maxW="md" mx="auto" mt={10} asChild>
      <form onSubmit={handleSubmit(submitSignup)}>
        <Heading>Sign up</Heading>
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Input
            type="text"
            autoComplete="name"
            {...register("name", { required: true })}
          />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            {errors.name?.message || "This field is required"}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            autoComplete="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            {errors.email?.message || "This field is required"}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            type="password"
            visible={visible}
            onVisibleChange={setVisible}
            autoComplete="current-password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Field.ErrorText width="full">
            <Field.ErrorIcon />
            {errors.password?.message || "This field is required"}
          </Field.ErrorText>
        </Field.Root>

        {message && <Message type={message.type}>{message.text}</Message>}

        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          loading={isSubmitting}
          colorPalette="orange"
        >
          Sign up
        </Button>
        <Link colorPalette="orange" marginTop="4" asChild>
          <ReactLink to={routes.LOGIN}>
            Already have an account? Log in <FaHeart />
          </ReactLink>
        </Link>
      </form>
    </VStack>
  );
};
