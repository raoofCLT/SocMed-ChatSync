import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { PiUserCircleFill } from "react-icons/pi";
import { Link} from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom)

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>

      {user && (
        <Link to={"/"} >
          <AiFillHome  size={24}/>
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
    <Link to={`/${user.username}`} >
      <PiUserCircleFill  size={24}/>
    </Link>
  )}
    </Flex>
  );
};

export default Header;
