import { useState } from "react";
import { Input, Text, VStack } from "@chakra-ui/react";

interface EndTimeProps {
  endTime: string;
  setEndTime: (newTime: string) => void;
}

export const EndTime = ({ endTime, setEndTime }: EndTimeProps) => {
  const [editEndTime, setEditEndTime] = useState<boolean>(false);

  return (
    <Text fontSize="sm">
    <VStack align="start" minHeight="53px" gap="0.25">
      <strong>End time</strong>
      {!editEndTime && (
        <p onClick={() => setEditEndTime(true)}>
          {endTime}
          {":00"}
        </p>
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
    </Text>
  );
};
