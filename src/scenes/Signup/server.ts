import { supabase } from "@/supabaseClient";
import type { FetchResultWithError } from "@/types";
import { getEmailRedirectUrl } from "@/utils";

export async function createUser(values: {
  email: string;
  password: string;
  name: string;
}): Promise<FetchResultWithError<"SUCCESS">> {
  const email = values.email.trim().toLowerCase();
  const name = values.name.trim();

  const { error } = await supabase.auth.signUp({
    email,
    password: values.password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${getEmailRedirectUrl()}/email-confirmation?type=signup`,
    },
  });

  if (error) {
    return { type: "ERROR", ...error.toJSON() };
  }

  return { type: "DATA", data: "SUCCESS" };
}
