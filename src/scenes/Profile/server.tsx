import { supabase } from "@/supabaseClient";
import type { FetchResultWithError } from "@/types";
import type { User } from "@supabase/supabase-js";

export async function updateProfileName(name: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "ERROR";
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: name,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return "ERROR";
  }

  return data;
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return "ERROR";
  }

  return data;
}

export async function updateEmail(newEmail: string): Promise<FetchResultWithError<User>> {
  const email = newEmail.trim().toLowerCase();

  const { data, error } = await supabase.auth.updateUser(
    {
      email,
    },
    {
      emailRedirectTo: `${window.location.origin}/#/email-confirmation?type=email_change`,
    },
  );

  if (error) {
    return { ...error.toJSON(), type: "ERROR" };
  }

  return { type: "DATA", data: data.user };
}
