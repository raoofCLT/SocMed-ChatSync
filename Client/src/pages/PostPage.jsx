import {
  Avatar,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { LiaUserSlashSolid } from "react-icons/lia";
import { TbMessageReport } from "react-icons/tb";
import { AiOutlineLink } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";
import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comment";

const PostPage = ({ postImg, postTitle }) => {
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
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar
            src="/Images/zuck-avatar.webp"
            size={"md"}
            name="Mark Zuckerberg"
          />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/Images/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            Id
          </Text>
        </Flex>
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
              <CiBookmark size={20} style={{ marginRight: "8px" }} />
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
              <LiaUserSlashSolid size={20} style={{ marginRight: "8px" }} />
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
      <Text my={3}>Let&apos;s talk about Threads.</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/Images/post1.jpg"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          556 replies
        </Text>
        <Box
          w={1}
          h={1}
          backgroundColor={"gray.light"}
          borderRadius={"full"}
        ></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {2376 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2x1"}>👋</Text>
          <Text color={"gray.light"}>Get the app like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment="Looks really good 🤩"
        createdAt={"2d"}
        likes={200}
        username={"markzuckerberg"}
        userAvatar={"https://bit.ly/dan-abramov"}
      />
      <Comment
        comment="Thats great"
        createdAt={"1d"}
        likes={325}
        username={"Kent Dodds"}
        userAvatar={"https://bit.ly/kent-c-dodds"}
      />
      <Comment
        comment="It's awsome"
        createdAt={"5d"}
        likes={5674}
        username={"Christian Nwamba"}
        userAvatar={"https://bit.ly/sage-adebayo"}
      />
    </>
  );
};

export default PostPage;
