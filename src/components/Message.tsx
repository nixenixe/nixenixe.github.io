import { Alert } from "@chakra-ui/react";

interface MessageProps {
  type: "error" | "info" | "success" | "warning";
  children: React.ReactNode;
  hidden?: boolean;
}

export const Message = ({
  children,
  type = "info",
  hidden = false,
}: MessageProps) => {
  if (hidden) return null;

  return (
    <Alert.Root status={type} maxW="md">
      <Alert.Indicator />
      <Alert.Title>{children}</Alert.Title>
    </Alert.Root>
  );
};
