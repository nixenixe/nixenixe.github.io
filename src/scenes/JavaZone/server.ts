import type { FetchResult } from '@/types';
import type { Session } from './type';
import { supabase } from '@/supabaseClient';

function isSessionsResponse(value: unknown): value is { sessions: Session[] } {
    return !!value && typeof value === 'object' && Array.isArray((value as { sessions?: unknown }).sessions)
}

export async function fetchProgram(): Promise<FetchResult<Session[]>> {
    const res = await fetch('https://sleepingpill.javazone.no/public/allSessions/javazone_2026')
    if (!res.ok) {
        console.log(`HTTP ${res.status}`);
        return "ERROR";
    }
    const data: unknown = await res.json()
    if (!isSessionsResponse(data)) {
        console.log('Unexpected response shape')
        return "ERROR";
    }
    return data.sessions.filter((s) => s.title && s.format !== "workshop");
}
    
export async function getFavoriteTalkIds(): Promise<FetchResult<string[]>> {
  const { data, error } = await supabase
    .from("favorite_talks")
    .select("event_id");

  if (error) {
    return "ERROR";
  }

  return data.map((favorite) => favorite.event_id);
};

export async function addFavoriteTalk(eventId: string): Promise<"SUCCESS" | "ERROR"> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "ERROR";
  }

  const { data, error } = await supabase
    .from("favorite_talks")
    .insert({
      user_id: user.id,
      event_id: eventId,
    })
    .select()
    .single();

  if (error) {
    return "ERROR";
  }

  return "SUCCESS";
};

export async function removeFavoriteTalk(eventId: string): Promise<"SUCCESS" | "ERROR"> {
  const { error } = await supabase
    .from("favorite_talks")
    .delete()
    .eq("event_id", eventId);

  if (error) {
    return "ERROR";
  }

  return "SUCCESS";
}