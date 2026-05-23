import { HStack, Spinner } from "@chakra-ui/react";

export const FullPageSpinner = () => {
  return (
    <HStack justify="center" align="start" paddingTop="20">
      <Spinner size="xl" borderWidth="4px" color="orange.500" />
    </HStack>
  );
};
