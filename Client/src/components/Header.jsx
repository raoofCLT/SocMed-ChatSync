import {
  Avatar,
  Button,
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
// import { PiUserCircleFill } from "react-icons/pi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const colorModeBg = useColorModeValue("gray.300", "gray.dark");
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link to={"/auth"} onClick={() => setAuthScreen("login")}>
          Login
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={
          colorMode === "dark"
            ? "/Images/light-logo.svg"
            : "/Images/dark-logo.svg"
        }
        onClick={toggleColorMode}
      />

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link to={`/${user.username}`}>
            <Avatar
              size={"xs"} // Adjust the size as needed
              src={user.profilePic || "https://bit.ly/broken-link"} // Fallback if no profile picture
              alt={user.username} // Alt text for accessibility
            />
          </Link>

          <Link to={"/chat"}>
            <BsFillChatQuoteFill size={20} />
          </Link>

          <Link to={"/settings"}>
            <MdOutlineSettings size={20} />
          </Link>

          <Button bg={colorModeBg} size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link to={"/auth"} onClick={() => setAuthScreen("signup")}>
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
