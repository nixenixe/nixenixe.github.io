import { supabase } from "./supabaseClient";

export async function getProfile() {
  const { data, error } = await supabase.from("profiles").select("*").single();

  if (error) {
    return "ERROR";
  }

  return data;
}
