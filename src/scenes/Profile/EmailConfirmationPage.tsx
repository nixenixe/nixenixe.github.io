import { Message } from "@/components/Message";
import { getAuthParams } from "@/utils";
import { Button, VStack } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { routes } from "@/routes";

export function EmailConfirmationPage() {
  const params = getAuthParams();

  const type = params.type;
  const errorDescription = params.errorDescription;
  const errorCode = params.errorCode;

  if (errorCode === "otp_expired") {
    return (
      <Message type="error">
        This email link has already been used or has expired.
      </Message>
    );
  }

  if (errorDescription) {
    return (
      <Message type="error">{errorDescription.replaceAll("+", " ")}</Message>
    );
  }

  return (
    <VStack gap={8} align="stretch" maxW="md" mx="auto" mt={10}>
      <Message type="success">
        {type === "email_change"
          ? "Your email change has been confirmed."
          : "Your email has been confirmed."}
      </Message>
      <Button asChild colorPalette="orange"> 
        <ReactLink to={routes.LOGIN}>Login</ReactLink>
      </Button>
    </VStack>
  );
}
