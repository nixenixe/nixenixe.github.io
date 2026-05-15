import { Drawer, Icon, Portal, useDisclosure } from "@chakra-ui/react";
import { MenuItems } from "./MenuItems";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { colorScale } from "@/types";

export const MobileMenu = () => {
  const { open, onToggle } = useDisclosure();
  const IconTag = open ? IoClose : IoMenu;
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onToggle}
      size="full"
      placement="bottom"
    >
      <Drawer.Trigger asChild>
        <button style={{cursor: 'pointer'}}>
          <Icon asChild color={`${colorScale}.800`}>
            <IconTag size={30} />
          </Icon>
        </button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop backgroundColor="transparent" />
        <Drawer.Positioner marginTop={74}>
          <Drawer.Content bg={`${colorScale}.400`} shadow="none">
            <Drawer.Body>
              <MenuItems isMobile />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
