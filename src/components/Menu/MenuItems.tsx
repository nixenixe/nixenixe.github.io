import { routes } from "@/routes";
import { HStack, Link, VStack } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

interface MenuItemsProps {
  isMobile?: boolean;
  isLoggedIn: boolean;
}

const menuItems = [
  { label: "To-do", path: routes.HOME },
  { label: "Vacation", path: routes.VACATION },
  { label: "JavaZone", path: routes.JAVAZONE.PROGRAM, public: true },
];

export const MenuItems = ({ isMobile = false, isLoggedIn }: MenuItemsProps) => {
  const Tag = isMobile ? VStack : HStack;

  const getMenuItems = () => {
    return menuItems.filter(item => isLoggedIn || (!isLoggedIn && item.public));
  };

  return (
    <Tag>
      {getMenuItems().map((item) => (
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
