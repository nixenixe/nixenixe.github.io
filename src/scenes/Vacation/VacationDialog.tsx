import {
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  HStack,
  Input,
  Portal,
  RadioCard,
  VStack,
} from "@chakra-ui/react";

import { LuCalendar } from "react-icons/lu";
import type { TimeOffEntry, TimeOffType } from "./types";
import { useForm } from "react-hook-form";

type TimeOffForm = {
  type: TimeOffType;
  title: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
};

interface VacationDialogProps {
  buttonContent: React.ReactNode;
  vacationData: TimeOffEntry | null;
  saveVacation: (vacation: TimeOffEntry) => void;
}

export const VacationDialog = (props: VacationDialogProps) => {
  const { buttonContent } = props;
  const { register, setValue, getValues } = useForm<TimeOffForm>();

  console.log(getValues("type"));

  const onSave = () => {
    console.log("save");
  };

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
                  placeholder="Title"
                  {...register("title", { required: true })}
                />
                <RadioCard.Root
                  size="sm"
                  w="full"
                  {...register("type", { required: true })}
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
                  locale="no-NO"
                  startOfWeek={1}
                  onValueChange={(value) => {
                    setValue("start_date", value.valueAsString[0] || "");
                    setValue("end_date", value.valueAsString[1] || "");
                  }}
                  fixedWeeks
                  openOnClick
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
                {/*getValues("type") === "TIMEOFF_HOURS" && (
                  <HStack gap="2" w="full">
                    <Input
                      placeholder="Start time"
                      type="time"
                      {...register("start_time")}
                      step="600"
                    />
                    <Input
                      placeholder="End time"
                      type="time"
                      {...register("end_time")}
                      step="600"
                    />
                  </HStack>
                )*/}
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
