import { Message } from "@/components/Message";
import { Button } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { routes } from "@/routes";
import { NarrowCenteredPage } from "@/components/NarrowCenteredPage";

export const SignupSuccess = () => {
  return (
    <NarrowCenteredPage>
      <Message type="success">
        <strong>Signup successful!</strong>
        <br />
        <br />
        Your account has been created. Please check your email to confirm your
        account before logging in.
        <br />
        <br />
        If you don't see the email, there might already be an account associated
        with this email address. Try logging in or resetting your password.
      </Message>
      <Button asChild>
        <ReactLink to={routes.LOGIN}>Login</ReactLink>
      </Button>
    </NarrowCenteredPage>
  );
};
