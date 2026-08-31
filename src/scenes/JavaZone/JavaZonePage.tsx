import { Tabs, Text } from "@chakra-ui/react";
import { JavaZoneRouter } from "./JavaZoneRouter";
import { routes } from "@/routes";
import { Link } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import type { Session } from "./type";
import { JavaZoneContextProvider } from "./JavaZoneContext";

interface JavaZonePageProps {
    sessions: Session[];
}

export const JavaZonePage = ({ sessions }: JavaZonePageProps) => {
    return (
        <JavaZoneContextProvider>
            <div style={{ height: "100%" }}>
                <Text fontSize="2xl" fontWeight="bold" marginBottom="4">JavaZone</Text>
                <Tabs.Root defaultValue="program">
                    <Tabs.List>
                        <Tabs.Trigger value="program" asChild>
                            <Link to={routes.JAVAZONE.PROGRAM}>
                                <IoIosListBox />
                                Program
                            </Link>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="favorites" asChild>
                            <Link to={routes.JAVAZONE.FAVORITES}>
                                <IoIosHeart />
                                Favorites
                            </Link>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="calendar" asChild>
                            <Link to={routes.JAVAZONE.CALENDAR}>
                                <IoCalendar />
                                Calendar
                            </Link>
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
                <JavaZoneRouter sessions={sessions} />
            </div>
        </JavaZoneContextProvider>
    );
};