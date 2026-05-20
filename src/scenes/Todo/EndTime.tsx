import { useState } from "react";
import { Input, Text, VStack } from "@chakra-ui/react";

interface EndTimeProps {
  endTime: string;
  setEndTime: (newTime: string) => void;
}

export const EndTime = ({ endTime, setEndTime }: EndTimeProps) => {
  const [editEndTime, setEditEndTime] = useState<boolean>(false);

  return (
    <VStack align="start" minHeight="53px" gap="0.25">
      <Text fontSize="sm"><strong>End time</strong></Text>
      {!editEndTime && (
        <Text fontSize="sm" onClick={() => setEditEndTime(true)}>
          {endTime}
          {":00"}
        </Text>
      )}
      {editEndTime && (
        <Input
          defaultValue={endTime}
          w="16"
          size="xs"
          type="number"
          autoFocus={true}
          max={23}
          onBlur={(e: { currentTarget: { value: string } }) => {
            if (e.currentTarget.value !== "") {
              setEndTime(e.currentTarget.value);
            }
            setEditEndTime(false);
          }}
        />
      )}
    </VStack>
  );
};
