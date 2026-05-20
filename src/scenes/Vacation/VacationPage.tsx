import { HStack, VStack } from "@chakra-ui/react";
import { VacationDialog } from "./VacationDialog";
import { useState } from "react";
import { type Vacation } from "./types";

export const VacationPage = () => {
  const [vacationData, setVacationData] = useState<Vacation[]>([]);

  return (
    <VStack gap="6">
      <HStack></HStack>
      <VacationDialog
        vacationData={null}
        buttonContent="Add vacation"
        saveVacation={(vacation) =>
          setVacationData([...vacationData, vacation])
        }
      />
      {vacationData.map((vacation) => {
        return (
          <HStack key={vacation.id}>
            {vacation.label}
            {vacation.startDate}
          </HStack>
        );
      })}
    </VStack>
  );
};
