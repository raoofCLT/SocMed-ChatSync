import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { LiaUserSlashSolid } from "react-icons/lia";
import { TbMessageReport } from "react-icons/tb";
import { AiOutlineLink } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";

import Actions from "./Actions";
import { useState } from "react";

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        toast({
          status: "success",
          description: "Post link copied.",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSave = () => {
    const link = document.createElement("a");
    link.href = postImg;
    link.download = postTitle || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Link to={"/markzukerberg/post/1"}>
      <Flex gap={2} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name="Mark Zukerberg"
            src="/Images/zuck-avatar.webp"
          />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size="xs"
              name="Kola Tioluwani"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              top={"-1px"}
              left={"13px"}
              padding={"1px"}
            />
            <Avatar
              size="xs"
              name="Kent Dodds"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              right={"-2px"}
              padding={"1px"}
            />
            <Avatar
              size="xs"
              name="Ryan Florence"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              bottom={"0px"}
              left={"0px"}
              padding={"1px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={8}>
                markzuckerberg
              </Text>
              <Image src="/Images/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex
              gap={4}
              alignItems={"center"}
              onClick={(e) => e.preventDefault()}
            >
              <Text fontStyle={"sm"} color={"gray.light"}>
                Id
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
                    onClick={handleSave}
                  >
                    <Text>Save</Text>
                    <MdSaveAlt size={20} style={{ marginRight: "8px" }} />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    bg={"gray.dark"}
                    justifyContent={"space-between"}
                    display="flex"
                  >
                    <Text>Not interested</Text>
                    <FaRegEyeSlash size={20} style={{ marginRight: "8px" }} />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    bg={"gray.dark"}
                    justifyContent={"space-between"}
                    display="flex"
                  >
                    <Text>Mute</Text>
                    <VscMute size={20} style={{ marginRight: "8px" }} />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    bg={"gray.dark"}
                    justifyContent={"space-between"}
                    display="flex"
                  >
                    <Text>Unfollow</Text>
                    <LiaUserSlashSolid
                      size={20}
                      style={{ marginRight: "8px" }}
                    />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    bg={"gray.dark"}
                    justifyContent={"space-between"}
                    display="flex"
                  >
                    <Text>Report </Text>
                    <TbMessageReport size={20} style={{ marginRight: "8px" }} />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    bg={"gray.dark"}
                    justifyContent={"space-between"}
                    display="flex"
                    onClick={copyURL}
                  >
                    <Text>Copy link</Text>
                    <AiOutlineLink size={20} style={{ marginRight: "8px" }} />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
