import { supabase } from "@/supabaseClient";
import type { FetchResultWithError } from "@/types";

export async function createUser(values: {
  email: string;
  password: string;
  name: string;
}): Promise<FetchResultWithError<"SUCCESS">> {
  const email = values.email.trim().toLowerCase();
  const name = values.name.trim();

  /*if (!email) {
    throw new Error("Email is required");
  }

  if (!name) {
    throw new Error("Name is required");
  }

  if (values.password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }*/

  const { error } = await supabase.auth.signUp({
    email,
    password: values.password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${window.location.origin}/#/email-confirmation?type=signup`,
    },
  });

  if (error) {
    return { type: "ERROR", ...error.toJSON() };
  }

  return { type: "DATA", data: "SUCCESS" };
}
