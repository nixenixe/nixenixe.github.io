import type { FetchResult } from '@/types';
import type { Session } from './type';

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