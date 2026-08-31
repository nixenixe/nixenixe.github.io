import type { Session } from "./type";
import { SessionsPage } from "./SessionsPage";
import { sortSessionsByStart } from "./utils";

interface ProgramPageProps {
    sessions: Session[];
}

export const ProgramPage = ({ sessions }: ProgramPageProps) => {
    return (
        <SessionsPage sessions={sortSessionsByStart(sessions)} />
    );
};  