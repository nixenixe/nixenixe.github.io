import {
  ChangePasswordForm,
  type ChangePasswordFormType,
} from "@/components/ChangePassword/ChangePasswordForm";
import { NarrowCenteredPage } from "@/components/NarrowCenteredPage";
import { Heading } from "@chakra-ui/react";
import { updatePassword } from "../Profile/server";
import { useState } from "react";
import { Message } from "@/components/Message";
import { routes } from "@/routes";
import { useNavigate } from "react-router-dom";

export const ResetPasswordPage = () => {
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
        navigate(`${routes.LOGIN}?passwordReset=success`, { replace: true });
      });
    });
  }

  return (
    <NarrowCenteredPage>
      <Heading>Reset your password</Heading>
      <ChangePasswordForm updatePassword={onSubmit} />
      {errorMessage && <Message type="error">{errorMessage}</Message>}
    </NarrowCenteredPage>
  );
};
