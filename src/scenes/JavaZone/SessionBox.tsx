import type { Session } from "./type";
import { capitalize, formatTime, getSessionStart } from "./utils";
import { HStack, IconButton, Tag, Text, VStack } from "@chakra-ui/react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useContext } from "react";
import { JavaZoneContext } from "./JavaZoneContext";

interface SessionBoxProps {
    session: Session;
}

export const SessionBox = ({ session }: SessionBoxProps) => {
    const context = useContext(JavaZoneContext);

    const keywords = [... new Set(session.suggestedKeywords.split(/[\s,]+/).filter((keyword) => keyword.trim().length > 0))];

    return (
        <VStack width="100%" height="100%" align="stretch">
            <HStack align="center" justify="space-between" width="100%">
                <Text fontSize="sm" color="gray.500">{formatTime(getSessionStart(session)) ?? "-"}</Text>
                <IconButton
                    aria-label="Add to favorites"
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation();
                        context.toggleFavorite(session.id);
                    }}
                >
                    {context.isFavorite(session.id) ? <IoIosHeart /> : <IoIosHeartEmpty />}
                </IconButton>
            </HStack>
            <Text fontWeight="bold" height="100px">{session.title}</Text>
            <HStack wrap="wrap">
                {keywords.map((keyword: string) => (
                    <Tag.Root key={session.id + "-" + keyword}>
                        <Tag.Label>{capitalize(keyword)}</Tag.Label>
                    </Tag.Root>
                ))}
            </HStack>
        </VStack>
    );
};