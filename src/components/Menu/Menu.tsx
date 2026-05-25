import { Box, Flex } from "@chakra-ui/react";
import { HomeLogoLink } from "../Logo";
import { MobileMenu } from "./MobileMenu";
import { MenuItems } from "./MenuItems";
import { ProfileIconPopover } from "./ProfileIconPopover";

interface MenuProps {
  isLoggedIn: boolean;
}

export const Menu = ({ isLoggedIn }: MenuProps) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify={{ base: "space-between", md: "start" }}
      wrap="wrap"
      gap={{ base: 8, lg: 16 }}
      px={{ base: 6, lg: 12 }}
      py={3}
      w="100%"
      mx="auto"
      bg="orange.emphasized"
      minHeight="64px"
    >
      <HomeLogoLink />

      {/* Desktop Menu */}
      {isLoggedIn && (
        <Box display={{ base: "none", md: "block" }}>
          <MenuItems />
        </Box>
      )}

      <ProfileIconPopover />

      {/* Mobile Drawer */}
      {isLoggedIn && (
        <Box display={{ base: "block", md: "none" }}>
          <MobileMenu />
        </Box>
      )}
    </Flex>
  );
};
