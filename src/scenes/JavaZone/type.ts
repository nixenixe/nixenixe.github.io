export interface Speaker {
  name: string
  bio?: string
  twitter?: string
  linkedin?: string
  bluesky?: string
}

export interface Session {
  id: string
  sessionId: string
  conferenceId: string
  title: string
  abstract: string
  format: string
  language: string
  length: string
  intendedAudience: string
  suggestedKeywords: string
  workshopPrerequisites?: string
  speakers: Speaker[]
  room?: string
  startTime?: string
  endTime?: string
  startTimeZulu?: string
  endTimeZulu?: string
  startSlot?: string
  startSlotZulu?: string
  video?: string
}

export type FavoriteTalk = {
  id: string;
  user_id: string;
  event_id: string;
  created_at: string;
};