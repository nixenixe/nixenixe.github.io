import type { Session } from "./type";
import FullCalendar, { type CalendarRef } from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/breezy"; // YOUR THEME
import timeGridPlugin from "@fullcalendar/react/timegrid";

// stylesheets
import "@fullcalendar/react/skeleton.css"; // ALWAYS NEED SKELETON
import "@fullcalendar/react/themes/breezy/theme.css";
import "@fullcalendar/react/themes/breezy/palettes/indigo.css";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { JavaZoneContext } from "./JavaZoneContext";
import { getSessionStart, getSessionEnd } from "./utils";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { SessionDialogContent } from "./SessionDialogContent";

interface CalendarPageProps {
  sessions: Session[];
}
export const CalendarPage = ({ sessions }: CalendarPageProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Session | null>(null);
  const context = useContext(JavaZoneContext);
  const [selectedDate, setSelectedDate] = useState<"2026-09-02" | "2026-09-03">(
    "2026-09-02",
  );
  const calendarRef = useRef<CalendarRef | null>(null);

  const goToDate = (date: string) => {
    calendarRef.current?.getApi().gotoDate(date);
  };

  const filteredSessions = () =>
    sessions.filter(
      (s) =>
        getSessionStart(s)?.toISOString().startsWith(selectedDate) &&
        context.isFavorite(s.id),
    );

  const parseEvents = (sessions: Session[]) =>
    sessions.map((s) => ({
      id: s.id,
      title: `${s.title} - ${s.room?.toLocaleUpperCase()}`,
      start: getSessionStart(s)?.toISOString(),
      end: getSessionEnd(s)?.toISOString(),
    }));

  console.log(parseEvents(filteredSessions()));

  return (
    <>
      <HStack gap="6" width="100%" wrap="wrap" marginTop="6" marginBottom="6">
        <Button
          variant={selectedDate === "2026-09-02" ? "solid" : "subtle"}
          onClick={() => {
            setSelectedDate("2026-09-02");
            goToDate("2026-09-02");
          }}
        >
          Wednesday
        </Button>
        <Button
          variant={selectedDate === "2026-09-03" ? "solid" : "subtle"}
          onClick={() => {
            setSelectedDate("2026-09-03");
            goToDate("2026-09-03");
          }}
        >
          Thursday
        </Button>
      </HStack>
      <FullCalendar
        ref={calendarRef}
        plugins={[themePlugin, timeGridPlugin]}
        colorScheme="light"
        initialView="timeGridDay"
        height="auto"
        headerToolbar={false}
        dayHeaders={false}
        initialDate={selectedDate}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        locale="nb"
        slotMinTime="08:00:00"
        events={parseEvents(filteredSessions())}
        eventClick={(info) => {
          setSelectedEvent(
            sessions.find((s) => s.id === info.event.id) ?? null,
          );
        }}
      />
      <Dialog.Root
        open={!!selectedEvent}
        onOpenChange={(details) => {
          if (!details.open) {
            setSelectedEvent(null);
          }
        }}
        size="md"
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{selectedEvent?.title}</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                {selectedEvent && (
                  <SessionDialogContent session={selectedEvent} />
                )}
              </Dialog.Body>

              <Dialog.Footer>
                <Button
                  variant={
                    context.isFavorite(selectedEvent?.id ?? "")
                      ? "subtle"
                      : "outline"
                  }
                  onClick={() =>
                    context.toggleFavorite(selectedEvent?.id ?? "")
                  }
                >
                  {context.isFavorite(selectedEvent?.id ?? "") ? (
                    <IoIosHeart />
                  ) : (
                    <IoIosHeartEmpty />
                  )}
                  Favorite
                  {context.isFavorite(selectedEvent?.id ?? "") ? "d" : ""}
                </Button>
                <Dialog.ActionTrigger asChild>
                  <Button>Close</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Box height="20px" />
    </>
  );
};
