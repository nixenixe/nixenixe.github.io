// src/auth.ts
import { supabase } from "./supabaseClient";

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("Login response:", { data, error });

  if (error) {
    throw error;
  }

  return data;
}