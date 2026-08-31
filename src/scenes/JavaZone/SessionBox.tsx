import type { Session } from "./type";
import { formatTime, getSessionStart } from "./utils";
import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useContext } from "react";
import { JavaZoneContext } from "./JavaZoneContext";

interface SessionBoxProps {
    session: Session;
}

export const SessionBox = ({ session }: SessionBoxProps) => {
    const context = useContext(JavaZoneContext);
    return (
        <VStack width="100%" height="100%" align="stretch">
            <HStack align="center" justify="space-between" width="100%">
                <Text fontSize="sm" color="gray.500">{formatTime(getSessionStart(session)) ?? "-"}</Text>
                <IconButton
                    aria-label="Add to favorites"
                    size="sm"
                    variant="ghost"
                    onClick={() => context.toggleFavorite(session.id)}
                >
                    {context.isFavorite(session.id) ? <IoIosHeart /> : <IoIosHeartEmpty />}
                </IconButton>
            </HStack>
            <Text fontWeight="bold">{session.title}</Text>
        </VStack>
    );
};