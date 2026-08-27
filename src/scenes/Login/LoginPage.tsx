import { PasswordInput } from "@/components/ui/password-input";
import { Button, Field, Heading, Input, Link, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleLogin } from "./server";
import { Message } from "@/components/Message";
import {
  Link as ReactLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { routes } from "@/routes";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { NarrowCenteredPage } from "@/components/NarrowCenteredPage";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const fromResetPassword = searchParams.get("password_reset") === "success";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<LoginForm>();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submitLogin = (data: LoginForm) => {
    return new Promise<void>((resolve) => {
      setErrorMessage("");
      handleLogin(data.email, data.password).then((res) => {
        if (res.type === "ERROR") {
          const message =
            res.code === "invalid_credentials"
              ? "Either email or password is incorrect. Please try again."
              : "Couldn't log in. Please try again later.";
          setErrorMessage(message);
          resolve();
          return;
        }
        resolve();
        navigate(routes.HOME);
      });
    });
  };

  return (
    <NarrowCenteredPage>
      {fromResetPassword && (
        <Message type="success">
          Your password has been reset successfully. Please log in with your new
          password.
        </Message>
      )}
      <VStack gap={6} asChild alignItems="start">
        <form onSubmit={handleSubmit(submitLogin)}>
          <Heading>Log in</Heading>
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

          <VStack w="full" alignItems="end">
            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                type="password"
                visible={visible}
                onVisibleChange={setVisible}
                autoComplete="current-password"
                {...register("password", { required: true })}
              />
              <Field.ErrorText width="full">
                <Field.ErrorIcon />
                {errors.password?.message || "This field is required"}
              </Field.ErrorText>
            </Field.Root>
            <Link asChild>
              <ReactLink to={routes.FORGOT_PASSWORD}>
                Forgot your password?
              </ReactLink>
            </Link>
          </VStack>

          {errorMessage && <Message type="error">{errorMessage}</Message>}

          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            loading={isSubmitting}
          >
            Log in
          </Button>
        </form>
      </VStack>
      <Link marginTop="4" asChild>
        <ReactLink to={routes.SIGNUP}>
          Don't have an account? Sign up <FaRegFaceSmileWink />
        </ReactLink>
      </Link>
    </NarrowCenteredPage>
  );
};
