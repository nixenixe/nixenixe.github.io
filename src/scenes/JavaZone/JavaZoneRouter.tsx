import { Routes, Route, Navigate } from "react-router-dom";
import { ProgramPage } from "./ProgramPage";
import { FavoritesPage } from "./FavoritesPage";
import { CalendarPage } from "./CalendarPage";
import { routes } from "@/routes";
import type { Session } from "./type";

interface JavaZoneRouterProps {
    sessions: Session[];
}

export const JavaZoneRouter = ({sessions}: JavaZoneRouterProps) => {
    return (
       <Routes>
        <Route path="program" element={<ProgramPage sessions={sessions} />} />
        <Route path="favorites" element={<FavoritesPage sessions={sessions} />} />
        <Route path="calendar" element={<CalendarPage sessions={sessions} />} />
        <Route path="*" element={<Navigate to={routes.JAVAZONE.PROGRAM} replace />} />
       </Routes>
    );
};