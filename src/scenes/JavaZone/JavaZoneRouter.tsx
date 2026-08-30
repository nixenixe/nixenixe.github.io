import { Routes, Route, Navigate } from "react-router-dom";
import { ProgramPage } from "./ProgramPage";
import { FavoritesPage } from "./FavoritesPage";
import { CalendarPage } from "./CalendarPage";
import { routes } from "@/routes";

export const JavaZoneRouter = () => {
    return (
       <Routes>
        <Route path="program" element={<ProgramPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="*" element={<Navigate to={routes.JAVAZONE.PROGRAM} replace />} />
       </Routes>
    );
};