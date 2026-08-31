import type { Session } from "./type";
import { Box, Button, HStack, VStack, CloseButton, Dialog, Portal, SimpleGrid, InputGroup, Input, Spacer } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { JavaZoneContext } from "./JavaZoneContext";
import { IoIosHeartEmpty } from "react-icons/io";
import { SessionBox } from "./SessionBox";
import { SessionDialogContent } from "./SessionDialogContent";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

interface SessionsPageProps {
    sessions: Session[];
}

export const SessionsPage = ({ sessions }: SessionsPageProps) => {
    const context = useContext(JavaZoneContext);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [selectedDate, setSelectedDate] = useState<"2026-09-02" | "2026-09-03">("2026-09-02");

    const filteredSessions = () => sessions.filter((s) => s.startTime?.startsWith(selectedDate) && s.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <VStack align="start" gap="6" marginTop="6">
            <HStack gap="6" width="100%" wrap="wrap">
                <Button variant={selectedDate === "2026-09-02" ? "solid" : "subtle"} onClick={() => setSelectedDate("2026-09-02")}>Wednesday</Button>
                <Button variant={selectedDate === "2026-09-03" ? "solid" : "subtle"} onClick={() => setSelectedDate("2026-09-03")}>Thursday</Button>
                <Spacer />
                <InputGroup startElement={<IoIosSearch />} width="100%" maxWidth={{ base: "100%", md: "400px" }}>
                    <Input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </InputGroup>
            </HStack>
            <SimpleGrid gap="6" minChildWidth="xs" width="100%">
                {filteredSessions().length === 0 && (
                    <Box width="100%" padding="4">
                        No sessions found.
                    </Box>
                )}
                {filteredSessions().map((session) => (
                    <Dialog.Root key={session.id} size="md" placement="center">
                        <Dialog.Trigger asChild>
                            <Box
                                key={session.id}
                                borderWidth="1px"
                                borderRadius="md"
                                padding="4"
                                paddingTop="2"
                                shadow="md"
                                textAlign="start"
                            >
                                <SessionBox session={session} />
                            </Box>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>{session.title}</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <SessionDialogContent session={session} />
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Button variant={context.isFavorite(session.id) ? "subtle" : "outline"} onClick={() => context.toggleFavorite(session.id)}>
                                            {context.isFavorite(session.id) ? <IoIosHeart /> : <IoIosHeartEmpty />}
                                            Favorite{context.isFavorite(session.id) ? "d" : ""}
                                        </Button>
                                        <Dialog.ActionTrigger asChild>
                                            <Button>
                                                Close
                                            </Button>
                                        </Dialog.ActionTrigger>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                ))}
            </SimpleGrid>
        </VStack>
    );
};