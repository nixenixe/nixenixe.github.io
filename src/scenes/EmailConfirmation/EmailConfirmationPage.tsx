import { Message } from "@/components/Message";
import { getAuthParams } from "@/utils";
import { Button } from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { routes } from "@/routes";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { FullPageSpinner } from "@/components/FullPageSpinner";
import { NarrowCenteredPage } from "@/components/NarrowCenteredPage";

export function EmailConfirmationPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = getAuthParams();
  const type = params.type;
  const errorDescription = params.errorDescription;
  const errorCode = params.errorCode;

  useEffect(() => {
    async function checkConfirmation() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate(routes.HOME, { replace: true });
        return;
      }
      setLoading(false);
    }

    checkConfirmation();
  }, [navigate]);

  if (loading) {
    return <FullPageSpinner />;
  }

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

  const message =
    errorCode === "otp_expired"
      ? "This email link has already been used or has expired."
      : errorDescription
        ? errorDescription.replaceAll("+", " ")
        : type === "email_change"
          ? "Your email change has been confirmed."
          : "Your email has been confirmed. You can now log in.";

  return (
    <NarrowCenteredPage>
      <Message type="success">{message}</Message>
      {type === "signup" && (
        <Button asChild>
          <ReactLink to={routes.LOGIN}>Login</ReactLink>
        </Button>
      )}
    </NarrowCenteredPage>
  );
}
