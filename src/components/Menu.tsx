import { Box, Flex } from "@chakra-ui/react";
import { HomeLogoLink } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { MenuItems } from "./MenuItems";

export const Menu = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify={{base: "space-between", md: "start"}}
      wrap="wrap"
      gap={{ base: 8, lg: 16 }}
      px={{ base: 6, lg: 12 }}
      py={3}
      w="100%"
      mx="auto"
      bg="orange.emphasized"
    >
      <HomeLogoLink />
      {/* Desktop Menu */}
      <Box display={{ base: "none", md: "block" }}>
        <MenuItems />
      </Box>

      {/* Mobile Drawer */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileMenu />
      </Box>
    </Flex>
  );
};
