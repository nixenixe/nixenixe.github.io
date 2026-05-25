import { VStack } from "@chakra-ui/react";

interface NarrowCenteredPageProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const NarrowCenteredPage: React.FC<NarrowCenteredPageProps> = ({
  children,
  asChild = false,
}) => {
  return (
    <VStack
      gap={6}
      align="stretch"
      maxW="md"
      mx="auto"
      mt={10}
      asChild={asChild}
    >
      {children}
    </VStack>
  );
};
