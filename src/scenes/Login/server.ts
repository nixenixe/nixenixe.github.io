import { supabase } from "@/supabaseClient";
import type { FetchResultWithError } from "@/types";

export async function handleLogin(
  email: string,
  password: string,
): Promise<FetchResultWithError<"SUCCESS">> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { type: "ERROR", ...error.toJSON() };
  }

  return { type: "DATA", data: "SUCCESS" };
}
