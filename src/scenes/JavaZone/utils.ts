import type { Session } from "./type";

export function getSessionStart(session: Session): Date | null {
    const raw = session.startTimeZulu ?? session.startTime
    if (!raw) return null
    const date = new Date(raw)
    return isNaN(date.getTime()) ? null : date
};

export function sortSessionsByStart(sessions: Session[]): Session[] {
    return [...sessions].sort((a, b) => {
        const at = getSessionStart(a)?.getTime() ?? Infinity
        const bt = getSessionStart(b)?.getTime() ?? Infinity
        if (at !== bt) return at - bt
        return (a.room ?? '').localeCompare(b.room ?? '', undefined, { numeric: true })
    })
};

const CONFERENCE_TIME_ZONE = 'Europe/Oslo';

function getOsloParts(date: Date) {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: CONFERENCE_TIME_ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(date)

    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
    return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') }
};

export function formatTime(date: Date | null): string | null {
    if (!date) return null;
    const { hour, minute } = getOsloParts(date);
    return `${hour}:${minute}`;
};

export function getSessionEnd(session: Session): Date | null {
    const raw = session.endTimeZulu ?? session.endTime
    if (raw) {
        const date = new Date(raw)
        if (!isNaN(date.getTime())) return date
    }
    const start = getSessionStart(session)
    const lengthMin = Number(session.length)
    if (start && lengthMin) return new Date(start.getTime() + lengthMin * 60000)
    return null
};

export const getDay = (date: Date | null): string | null => {
    if (!date) return null;
    return date.getDay() === 3 ? "Wednesday" : date.getDay() === 4 ? "Thursday" : null;
};

export const saveFavorite = (sessionId: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
    if (!favorites.includes(sessionId)) {
        favorites.push(sessionId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const removeFavorite = (sessionId: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
    const index = favorites.indexOf(sessionId);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[];
};