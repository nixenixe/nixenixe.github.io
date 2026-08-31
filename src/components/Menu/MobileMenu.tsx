import { Drawer, Icon, Portal, useDisclosure } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { MenuItems } from "./MenuItems";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

export const MobileMenu = ({ isLoggedIn }: MobileMenuProps) => {
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
          <Icon asChild color="fg">
            <IconTag size={30} />
          </Icon>
        </button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop backgroundColor="transparent" />
        <Drawer.Positioner marginTop="54px">
          <Drawer.Content bg="orange.emphasized" shadow="none">
            <Drawer.Body>
              <MenuItems isMobile isLoggedIn={isLoggedIn} toggleMobileMenu={onToggle} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
