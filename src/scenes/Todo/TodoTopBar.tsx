import {
  VStack,
  Text,
  Box,
  HStack,
  Editable,
  Spinner,
} from "@chakra-ui/react";
import type { Task } from "./types";
import { useEffect, useState } from "react";
import type { Moment } from "moment";
import moment from "moment";
import { formatDuration } from "@/utils";
import { saveTodoEndTime } from "./server";
import { toaster } from "@/components/ui/toaster";

interface TodoPageProps {
  tasks: Task[];
  savedEndTime: string;
  refreshSettings: () => void;
}

export const TodoTopBar = ({
  tasks,
  savedEndTime,
  refreshSettings,
}: TodoPageProps) => {
  const [saveEndTimeLoading, setSaveEndTimeLoading] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>(savedEndTime);
  const [timeNow, setTimeNow] = useState<Moment>(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(moment());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const infoWithLabel = (label: string, info: string | React.ReactNode) => (
    <VStack align="start" minHeight="53px" minWidth="83px" gap="0.25">
      <Text fontSize="sm">
        <strong>{label}:</strong>
      </Text>
      {typeof info === "string" ? <Text fontSize="sm">{info}</Text> : info}
    </VStack>
  );

  const getPercentDone = () => {
    const amountDone = tasks.filter((t) => t.completed);
    if (amountDone.length > 0) {
      const cal = (amountDone.length / tasks.length) * 100;
      return Math.trunc(cal).toString() + "%";
    }
    return "0%";
  };

  const getTimeAmount = () => {
    if (tasks.length > 0) {
      const timeUndone = tasks
        .filter((t) => !t.completed)
        .map((d) => d.duration_minutes);
      if (timeUndone.length > 0) {
        const totalTime = timeUndone.reduce((p, a) => p + a);
        const duration = moment.duration(totalTime, "minute");
        return formatDuration(duration);
      }
    }
    return "-";
  };

  const getTimeLeft = () => {
    const endTimeMoment = moment().set({
      hour: parseInt(endTime),
      minute: 0,
      second: 0,
    });
    const negativeTime = endTimeMoment.diff(timeNow) < 0;
    const diff = negativeTime
      ? timeNow.diff(endTimeMoment)
      : endTimeMoment.diff(timeNow);
    return `${negativeTime ? "-" : ""}${formatDuration(moment.duration(diff))}`;
  };
  const getSurplus = () => {
    if (tasks.length > 0) {
      const timeUndone = tasks
        .filter((t) => !t.completed)
        .map((d) => d.duration_minutes);
      if (timeUndone.length > 0) {
        const totalTime = timeUndone.reduce((p, a) => p + a);
        const endTimeMoment = moment().set({
          hour: parseInt(endTime),
          minute: 0,
          second: 0,
        });
        const startMoment = endTimeMoment.subtract(totalTime, "minute");
        const surplus = startMoment.diff(timeNow) > 0;
        const diff = surplus
          ? startMoment.diff(timeNow)
          : timeNow.diff(startMoment);
        return `${surplus ? "" : "-"}${formatDuration(moment.duration(diff))}`;
      }
    }
    return "-";
  };
  const getStartTime = () => {
    if (tasks.length > 0) {
      const timeUndone = tasks
        .filter((t) => !t.completed)
        .map((d) => d.duration_minutes);
      if (timeUndone.length > 0) {
        const totalTime = timeUndone.reduce((p, a) => p + a);
        const endTimeMoment = moment().set({
          hour: parseInt(endTime),
          minute: 0,
          second: 0,
        });
        const startMoment = endTimeMoment.subtract(totalTime, "minute");
        return startMoment.format("HH:mm");
      }
    }
    return "-";
  };

  const saveEndTime = (newTime: string) => {
    const timeFormat = `${newTime}:00`;
    setSaveEndTimeLoading(true);
    saveTodoEndTime(timeFormat).then((res) => {
      setSaveEndTimeLoading(false);
      if (res === "ERROR") {
        toaster.create({
          title: "Couldn't save end time. Please try again later.",
          type: "error",
        });
        return;
      }
      refreshSettings();
    });
  };

  return (
    <Box
      borderColor="orange.focusRing"
      borderWidth="1px"
      borderRadius="md"
      padding="4"
      paddingBottom="5px"
      justifyContent="space-between"
      display="flex"
      alignItems="start"
    >
      <HStack gap={{ base: 2, md: 8 }} alignItems="start" flexWrap="wrap">
        {infoWithLabel("Done", getPercentDone())}
        {infoWithLabel("Duration", getTimeAmount())}
        {infoWithLabel("Time left", getTimeLeft())}
        {infoWithLabel("Surplus", getSurplus())}
        {infoWithLabel("Start time", getStartTime())}
        {infoWithLabel(
          "End time",
          <HStack>
            <Editable.Root
              value={savedEndTime}
              onValueChange={(e) => setEndTime(e.value)}
              onBlur={() => saveEndTime(endTime)}
            >
              <Editable.Preview>{`${savedEndTime}:00`}</Editable.Preview>
              <Editable.Input maxW="60px" type="number" />
            </Editable.Root>
            {saveEndTimeLoading && <Spinner size="xs" color="orange.500" />}
          </HStack>,
        )}
      </HStack>
    </Box>
  );
};
