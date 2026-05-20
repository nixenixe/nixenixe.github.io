import {
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  HStack,
  Input,
  parseDate,
  Portal,
  RadioCard,
  VStack,
  type DateValue,
} from "@chakra-ui/react";
import type { Vacation, VacationType } from "./types";
import { useState } from "react";
import moment from "moment";
import { LuCalendar } from "react-icons/lu";

interface VacationDialogProps {
  buttonContent: React.ReactNode;
  vacationData: Vacation | null;
  saveVacation: (vacation: Vacation) => void;
}

export const VacationDialog = (props: VacationDialogProps) => {
  const { vacationData, saveVacation, buttonContent } = props;
  const [type, setType] = useState<VacationType>(
    vacationData?.type || "VACATION",
  );
  const [label, setLabel] = useState<string>(vacationData?.label || "");
  const [date, setDate] = useState<DateValue[] | undefined>(
    vacationData
      ? [parseDate(vacationData.startDate), parseDate(vacationData.endDate)]
      : undefined,
  );
  const [startTime, setStartTime] = useState<string>(
    vacationData ? moment(vacationData.startDate).format("HH:mm") : "",
  );
  const [endTime, setEndTime] = useState<string>(
    vacationData ? moment(vacationData.endDate).format("HH:mm") : "",
  );

  const onSave = () => {
    const newVacation: Vacation = {
      id: vacationData?.id || crypto.randomUUID(),
      type,
      label,
      startDate: moment(`${date?.[0]?.toString().split("T")[0]}T${startTime}`).toISOString(),
      endDate: moment(`${date?.[1]?.toString().split("T")[0]}T${endTime}`).toISOString(),
    };
    saveVacation(newVacation);
  };

  console.log({ type, label, date, startTime, endTime });

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" size="lg">
      <Dialog.Trigger asChild>
        <Button variant="outline">{buttonContent}</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add vacation</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap="6">
                <Input
                  placeholder="Label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
                <RadioCard.Root
                  size="sm"
                  defaultValue="VACATION"
                  value={type}
                  w="full"
                  onValueChange={(value) =>
                    setType(value.value as VacationType)
                  }
                >
                  <RadioCard.Label></RadioCard.Label>
                  <HStack align="stretch">
                    <RadioCard.Item value="VACATION">
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>Vacation</RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                    <RadioCard.Item value="TO_DAY">
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>Time off - day</RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                    <RadioCard.Item value="TO_HOURS">
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>
                          Time off - hours
                        </RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  </HStack>
                </RadioCard.Root>
                <DatePicker.Root
                  selectionMode="range"
                  value={date}
                  onValueChange={(e) => setDate(e.value)}
                  locale="no-NO"
                  startOfWeek={1}
                >
                  <DatePicker.Label>Select range</DatePicker.Label>
                  <DatePicker.Control>
                    <DatePicker.Input index={0} />
                    <DatePicker.Input index={1} />
                    <DatePicker.IndicatorGroup>
                      <DatePicker.Trigger>
                        <LuCalendar />
                      </DatePicker.Trigger>
                    </DatePicker.IndicatorGroup>
                  </DatePicker.Control>
                  <Portal>
                    <DatePicker.Positioner>
                      <DatePicker.Content>
                        <DatePicker.View view="day">
                          <DatePicker.Header />
                          <DatePicker.DayTable />
                        </DatePicker.View>
                        <DatePicker.View view="month">
                          <DatePicker.Header />
                          <DatePicker.MonthTable />
                        </DatePicker.View>
                        <DatePicker.View view="year">
                          <DatePicker.Header />
                          <DatePicker.YearTable />
                        </DatePicker.View>
                      </DatePicker.Content>
                    </DatePicker.Positioner>
                  </Portal>
                </DatePicker.Root>
                {type === "TO_HOURS" && (
                  <HStack gap="2" w="full">
                    <Input
                      placeholder="Start time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      step="600"
                    />
                    <Input
                      placeholder="End time"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      step="600"
                    />
                  </HStack>
                )}
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={onSave}>Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
