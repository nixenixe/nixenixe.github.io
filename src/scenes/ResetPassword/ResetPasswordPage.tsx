import {
  ChangePasswordForm,
  type ChangePasswordFormType,
} from "@/components/ChangePassword/ChangePasswordForm";
import { NarrowCenteredPage } from "@/components/NarrowCenteredPage";
import { Button, Heading } from "@chakra-ui/react";
import { updatePassword } from "../Profile/server";
import { useState } from "react";
import { Message } from "@/components/Message";
import { routes } from "@/routes";
import { useNavigate } from "react-router-dom";
import { getAuthParams } from "@/utils";
import { Link as ReactLink } from "react-router-dom";

export const ResetPasswordPage = () => {
  const params = getAuthParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function onSubmit(values: ChangePasswordFormType, reset: () => void) {
    return new Promise<void>((resolve) => {
      updatePassword(values.newPassword).then((res) => {
        if (res.type === "ERROR") {
          setErrorMessage(
            res.message || "Couldn't reset password. Please try again later.",
          );
          resolve();
          return;
        }
        resolve();
        reset();
        navigate(`${routes.LOGIN}?password_reset=success`, { replace: true });
      });
    });
  }

  if (params.errorCode === "otp_expired") {
    return (
      <NarrowCenteredPage>
        <Message type="error">
          This password reset link has expired. Please request a new one.
        </Message>
        <Button asChild>
          <ReactLink to={routes.FORGOT_PASSWORD}>
            Request new password reset link
          </ReactLink>
        </Button>
      </NarrowCenteredPage>
    );
  }

  return (
    <NarrowCenteredPage>
      <Heading>Reset your password</Heading>
      <ChangePasswordForm updatePassword={onSubmit} />
      {errorMessage && <Message type="error">{errorMessage}</Message>}
    </NarrowCenteredPage>
  );
};
