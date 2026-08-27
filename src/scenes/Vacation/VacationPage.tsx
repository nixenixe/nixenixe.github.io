import { HStack, VStack } from "@chakra-ui/react";
import { VacationDialog } from "./VacationDialog";
import { useState } from "react";
import type { TimeOffEntry } from "./types";

export const VacationPage = () => {
  const [vacationData, setVacationData] = useState<TimeOffEntry[]>([]);

  return (
    <VStack gap="6">
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
            {vacation.title}
            {vacation.start_date}
          </HStack>
        );
      })}
    </VStack>
  );
};
