export interface LectureResponse {
    sessions: Lecture[];
}

export interface Speaker {
    name: string;
    bio: string;
    twitter: string;
}

export interface Lecture {
    abstract: string;
    conferenceId: string;
    endTime: string;
    endTimeZulu: string;
    format: string;
    id: string;
    intendedAudience: string;
    language: string;
    length: string;
    room: string;
    sessionId: string;
    speakers: Speaker[];
    startSlot: string;
    startSlotZulu: string;
    startTime: string;
    startTimeZulu: string;
    title: string;
}
