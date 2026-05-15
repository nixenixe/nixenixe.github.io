import { Link } from "react-router";
import logoImg from "../assets/nixe.svg";
import { routes } from "@/routes";

interface LogoProps {
  width?: number;
}

export const HomeLogoLink = ({ width = 24 }: LogoProps) => {
  return (
    <Link to={routes.home}>
      <img src={logoImg} alt="Home" width={width} />
    </Link>
  );
};
