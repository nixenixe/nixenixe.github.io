import { supabase } from "@/supabaseClient";
import type { FetchResultWithError } from "@/types";
import { getEmailRedirectUrl } from "@/utils";

export async function sendPasswordResetEmail(email: string): Promise<FetchResultWithError<unknown>> {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${getEmailRedirectUrl()}/reset-password`,
    },
  );

  if (error) {
    return { ...error.toJSON(), type: "ERROR" };
  }

  return { type: "DATA", data };
}
