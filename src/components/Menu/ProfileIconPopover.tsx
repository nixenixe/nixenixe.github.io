import { UserContext } from "@/types";
import {
  Popover,
  Portal,
  Icon,
  Text,
  Separator,
  Stack,
  Link,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link as ReactLink } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { supabase } from "@/supabaseClient";

export const ProfileIconPopover = () => {
  const userContext = useContext(UserContext);

  if (
    !userContext ||
    userContext.user === "ERROR" ||
    userContext.user === null
  ) {
    return null;
  }

  const profile =
    userContext.profile && userContext.profile !== "ERROR"
      ? userContext.profile
      : null;

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }} size="xs">
      <Popover.Trigger asChild>
        <button style={{ cursor: "pointer", marginLeft: "auto" }}>
          <Icon asChild>
            <FaCircleUser size={30} />
          </Icon>
        </button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="auto">
            <Popover.Arrow />
            <Popover.Body>
              <Stack gap={0}>
                <div>
                  <Text fontWeight="bold" fontSize="sm">
                    {profile && profile.name
                      ? `Hi, ${profile.name}!`
                      : "Account:"}
                  </Text>
                  <Text fontSize="sm">{userContext.user.email}</Text>
                </div>
                <Separator marginTop={4} marginBottom={2} />
                <Popover.Trigger asChild>
                  <Button
                    as={Link}
                    variant="ghost"
                    justifyContent="start"
                    paddingInline={2}
                    size="xs"
                    asChild
                  >
                    <ReactLink to="/profile">
                      <HStack>
                        <Icon asChild>
                          <IoMdSettings />
                        </Icon>
                        <Text fontSize="sm">Settings</Text>
                      </HStack>
                    </ReactLink>
                  </Button>
                </Popover.Trigger>
                <Separator marginTop={2} marginBottom={4} />
                <Popover.Trigger asChild>
                  <Button
                    onClick={() => supabase.auth.signOut()}
                    size="xs"
                    variant="subtle"
                  >
                    Log out
                  </Button>
                </Popover.Trigger>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
