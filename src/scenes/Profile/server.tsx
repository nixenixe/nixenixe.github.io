import { supabase } from "@/supabaseClient";

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

export async function updateEmail(newEmail: string) {
  const email = newEmail.trim().toLowerCase();

  const { data, error } = await supabase.auth.updateUser({
    email,
  });

  if (error) {
    return "ERROR";
  }

  return data;
}
