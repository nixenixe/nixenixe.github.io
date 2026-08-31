import type { Session } from './type';
import type { FetchResult } from '@/types';
import { fetchProgram } from './server';
import { useState, useEffect } from 'react';
import { Message } from '@/components/Message';
import { FullPageSpinner } from '@/components/FullPageSpinner';
import { JavaZonePage } from './JavaZonePage';

export const JavaZone = () => {
    const [sessions, setSessions] = useState<FetchResult<Session[]> | null>(null);

    useEffect(() => {
        fetchProgram().then(setSessions);
    }, []);

    if (sessions === null) {
        return <FullPageSpinner />;
    }

    if (sessions === "ERROR") {
        return <Message type="error">Couldn't load sessions</Message>;
    }

    return (
        <JavaZonePage sessions={sessions} />
    );
};