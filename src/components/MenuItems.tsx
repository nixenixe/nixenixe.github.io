import { routes } from "@/routes";
import { HStack, Link, VStack } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

interface MenuItemsProps {
  isMobile?: boolean;
}

const menuItems = [
  { label: "Todo", path: routes.home },
  // { label: "Projects", path: routes.projects },
];

export const MenuItems = ({ isMobile = false }: MenuItemsProps) => {
  const Tag = isMobile ? VStack : HStack;

  return (
    <Tag>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          asChild
          variant="underline"
          fontWeight="bold"
          fontSize={isMobile ? "2xl" : "md"}
          padding={isMobile ? "4" : "2"}
        >
          <ReactLink to={item.path}>{item.label}</ReactLink>
        </Link>
      ))}
    </Tag>
  );
};
