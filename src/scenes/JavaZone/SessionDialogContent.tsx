import { VStack, Text, Tag, HStack } from "@chakra-ui/react";
import { KeywordTags } from "./KeywordTags";
import type { Session } from "./type";
import { getDay } from "./utils";
import { formatTime, getSessionEnd, getSessionStart } from "./utils";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosGlobe } from "react-icons/io";


export const SessionDialogContent = ({ session }: { session: Session }) => {
    return (
        <VStack align="start" gap="4">
            <Text fontWeight="bold" color="orange.600">{`${getDay(getSessionStart(session)) ?? ""} ${formatTime(getSessionStart(session)) ?? ""}-${formatTime(getSessionEnd(session)) ?? ""}`}</Text>
            <HStack>
                <Tag.Root variant="solid" padding="2">
                    <Tag.Label>
                        <HStack align="center" justify="center">
                            <IoIosTime />
                            <Text textAlign="center" lineHeight="1">{session.length} min</Text>
                        </HStack>
                    </Tag.Label>
                </Tag.Root>
                <Tag.Root variant="solid" padding="2">
                    <Tag.Label>
                        <HStack align="center" justify="center">
                            <FaLocationDot />
                            <Text textAlign="center" lineHeight="1">{session.room}</Text>
                        </HStack>
                    </Tag.Label>
                </Tag.Root>
                <Tag.Root variant="solid" padding="2">
                    <Tag.Label>
                        <HStack align="center" justify="center">
                            <IoIosGlobe />
                            <Text textAlign="center" lineHeight="1">{session.language?.toLocaleUpperCase()}</Text>
                        </HStack>
                    </Tag.Label>
                </Tag.Root>
            </HStack>
            <Text>{session.abstract ?? ""}</Text>
            <Text><b>Speakers: </b>{session.speakers.map(speaker => speaker.name).join(", ")}</Text>
            <KeywordTags suggestedKeywords={session.suggestedKeywords} id={session.id} />
        </VStack>
    );
};