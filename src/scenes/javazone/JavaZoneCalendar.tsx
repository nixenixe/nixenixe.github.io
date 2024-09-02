import * as React from "react";
import {useEffect, useState} from "react";
import {fetchProgram} from "./fetcher";
import {Calendar, momentLocalizer, Event} from "react-big-calendar";
import moment from "moment";
import {FetchResponse} from "../../types";
import {Lecture, LectureResponse} from "./types";
import {ExpandableCard} from "../../components/ExpandableCard/ExpandableCard";
import {Spinner} from "../../components/Spinner/Spinner";
import {LectureBox} from "./LectureBox";
import "./javazone.less";
import {Spacer} from "../../components/Spacer/Spacer";
import {Button} from "../../components/Buttons/Button";

export const JavaZoneCalendar = () => {
    const [lectures, setLectures] = useState<FetchResponse<LectureResponse> | null>(null);
    const [view, setView] = useState<'CALENDAR' | 'PROGRAM'>('CALENDAR');
    const [events, setEvents] = useState<Event[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [filterView, setFilterView] = useState<'ALL' | 'FAV'>('FAV');
    const localizer = momentLocalizer(moment);

    const lecturesToEvents = (lectures: Lecture[]) => {
        return lectures.map((l) => {
            return ({
                title: `(${l.room}) ${l.title}`,
                start: moment(l.startTime).toDate(),
                end: moment(l.endTime).toDate(),
            });
        });
    };

    useEffect(() => {
        fetchProgram().then(setLectures);
        const fav = localStorage.getItem('favorites');
        if (fav) {
            try {
                const savedFav: string[] = JSON.parse(fav);
                setFavorites(savedFav);
            } catch (_) {
            }
        }
    }, []);

    useEffect(() => {
        if (lectures !== null && lectures !== 'ERROR') {
            if (filterView === 'ALL') {
                setEvents(lecturesToEvents(lectures.sessions));
            } else {
                const justFav = lectures.sessions.filter((l) => favorites.includes(l.id));
                setEvents(lecturesToEvents(justFav));
            }
        }
    }, [lectures, filterView, favorites]);

    if (lectures === null) {
        return <Spinner/>;
    }

    if (lectures === 'ERROR') {
        return <p>Something went wrong.</p>;
    }

    const getLectureList = (lectures: Lecture[], date: number) => {
        const lecturesDate = lectures.filter((l) => moment(l.startTime).date() === date)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
        return (
            <div className="lecture-boxes-in-card">
                <div>
                    {lecturesDate.map((l) => <LectureBox
                        key={l.id}
                        lecture={l}
                        setFavorites={saveFavorite}
                        favorite={favorites.includes(l.id)}/>
                    )}
                </div>
            </div>
        );
    };

    const saveFavorite = (fav: string) => {
        setFavorites((old) => {
            const index = old.indexOf(fav);
            if (index === -1) {
                return [...old, fav];
            } else {
                const newValue = [...old];
                newValue.splice(index, 1);
                return newValue;
            }
        });
    };

    const viewCalendar = () => {
        return (
            <>
                <Spacer size="l"/>
                <div className="button-container">
                    <Button onClick={() => setFilterView('ALL')}
                            className={filterView === 'ALL' ? 'button-selected' : ''}>
                        All
                    </Button>
                    <Spacer size="m"/>
                    <Button onClick={() => setFilterView('FAV')}
                            className={filterView === 'FAV' ? 'button-selected' : ''}>
                        Favorites
                    </Button>
                </div>
                <Spacer size="l"/>
                <ExpandableCard
                    label="Wednesday 4. sep"
                    content={
                        <Calendar
                            localizer={localizer}
                            defaultView="day"
                            toolbar={false}
                            defaultDate={'2024-09-04'}
                            events={events}
                        />
                    }
                />
                <Spacer size="l"/>
                <ExpandableCard
                    label={'Thursday 5. sep'}
                    content={
                        <Calendar
                            localizer={localizer}
                            defaultView="day"
                            toolbar={false}
                            defaultDate={'2024-09-05'}
                            events={events}
                        />}
                />
            </>
        );
    };

    const viewProgram = () => {
        return (
            <>
                <Spacer size="l"/>
                <ExpandableCard
                    label="Wednesday 4. sep"
                    content={getLectureList(lectures.sessions, 4)}
                />
                <Spacer size="s"/>
                <ExpandableCard
                    label="Thursday 5. sep"
                    content={getLectureList(lectures.sessions, 5)}
                />
            </>
        );
    }

    return (
        <>
            <h1>JavaZone calendar</h1>
            <Spacer size="m"/>
            <div className="button-container">
                <Button
                    className={view === 'CALENDAR' ? 'button-selected' : ''}
                    onClick={() => setView('CALENDAR')}
                >
                    Calendar
                </Button>
                <Spacer size="m"/>
                <Button
                    className={view === 'PROGRAM' ? 'button-selected' : ''}
                    onClick={() => setView('PROGRAM')}
                >
                    Program
                </Button>
            </div>
            {view === 'CALENDAR' && viewCalendar()}
            {view === 'PROGRAM' && viewProgram()}
        </>
    );
}
