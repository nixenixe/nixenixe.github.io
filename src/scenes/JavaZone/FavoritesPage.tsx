import type { Session } from "./type";
import { SessionsPage } from "./SessionsPage";
import { JavaZoneContext } from "./JavaZoneContext";
import { useContext } from "react";
interface FavoritesPageProps {
    sessions: Session[];
}

export const FavoritesPage = ({sessions}: FavoritesPageProps) => {
    const context = useContext(JavaZoneContext);
    const favoriteSessions = sessions.filter(session => context.isFavorite(session.id));
    return (
        <SessionsPage sessions={favoriteSessions} />
    );
};