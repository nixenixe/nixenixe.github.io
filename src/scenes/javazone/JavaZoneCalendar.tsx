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
    const [events, setEvents] = useState<Event[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [view, setView] = useState<'ALL' | 'FAV'>('FAV');
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
            if (view === 'ALL') {
                setEvents(lecturesToEvents(lectures.sessions));
            } else {
                const justFav = lectures.sessions.filter((l) => favorites.includes(l.id));
                setEvents(lecturesToEvents(justFav));
            }
        }
    }, [lectures, view, favorites]);

    if (lectures === null) {
        return <Spinner />;
    }

    if (lectures === 'ERROR') {
        return <p>Something went wrong.</p>;
    }

    const getLectureList = (lectures: Lecture[]) => {
        const lecturesWednesday = lectures.filter((l) => moment(l.startTime).date() === 6)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
        const lecturesThursday = lectures.filter((l) => moment(l.startTime).date() === 7)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
        return (
            <div className="lecture-boxes-in-card">
                <div>
                    <h3>Wednesday 6. sep</h3>
                    {lecturesWednesday.map((l) => <LectureBox
                        key={l.id}
                        lecture={l}
                        setFavorites={saveFavorite}
                        favorite={favorites.includes(l.id)} />
                    )}
                </div>
                <div>
                <h3>Thursday 7. sep</h3>
                {lecturesThursday.map((l) => <LectureBox
                    key={l.id}
                    lecture={l}
                    setFavorites={saveFavorite}
                    favorite={favorites.includes(l.id)} />
                )}
            </div>
    </div>
    )
        ;
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

    return (
        <>
            <h1>Calendar</h1>
            <Spacer size="m" />
            <ExpandableCard
                label="Lectures"
                content={getLectureList(lectures.sessions)}
                color="GREEN"
            />
            <Spacer size="l" />
            <div className="button-container">
                <Button onClick={() => setView('ALL')} className={view === 'ALL' ? 'button-selected' : ''}>
                    All
                </Button>
                <Spacer size="m" />
                <Button onClick={() => setView('FAV')} className={view === 'FAV' ? 'button-selected' : ''}>
                    Favorites
                </Button>
            </div>
            <Spacer size="l" />
            <div className="calendar-view">
                <div className="calendar-box">
                    <h3>Wednesday 6. sep</h3>
                    <Spacer size="s" />
                    <Calendar
                        localizer={localizer}
                        defaultView="day"
                        toolbar={false}
                        defaultDate={'2023-09-06'}
                        events={events}
                    />
                </div>
                <div className="calendar-box">
                    <h3>Thursday 7. sep</h3>
                    <Spacer size="s" />
                    <Calendar
                        localizer={localizer}
                        defaultView="day"
                        toolbar={false}
                        defaultDate={'2023-09-07'}
                        events={events}
                    />
                </div>
            </div>
        </>
    );
}
