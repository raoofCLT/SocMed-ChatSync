import {
  Avatar,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({comment, createdAt, likes, username, userAvatar}) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
    <Avatar src={userAvatar} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column0"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {username}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                {createdAt}
              </Text>
              <Menu>
                <MenuButton ml={3}>
                  <BsThreeDots size={24} color={"gray"} cursor={"pointer"} />
                </MenuButton>
                <MenuList bg={"gray.dark"}>
                  <MenuItem
                    bg={"gray.dark"}
                    justifyContent={"space-between"}
                    display="flex"
                  >
                    <Text>Save</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text>{comment}</Text>
      <Actions liked={liked} setLiked={setLiked} />
      <Text color={"gray.light"} fontSize={"sm"}>
        {likes + (liked ? 1 : 0)} likes
      </Text>
      <Divider my={4} />
    </>
  );
};

export default Comment;
