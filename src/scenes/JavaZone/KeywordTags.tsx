import { HStack, Tag } from "@chakra-ui/react";
import { capitalize } from "./utils";

export const KeywordTags = ({ suggestedKeywords, id }: { suggestedKeywords: string; id: string }) => {
  const keywords = [
    ...new Set(
      suggestedKeywords
        .split(/[\s,]+/)
        .filter((keyword: string) => keyword.trim().length > 0),
    ),
  ];
  return (
    <HStack wrap="wrap" gap="2">
      {keywords.map((keyword: string) => (
        <Tag.Root key={id + "-" + keyword}>
          <Tag.Label>{capitalize(keyword)}</Tag.Label>
        </Tag.Root>
      ))}
    </HStack>
  );
};
