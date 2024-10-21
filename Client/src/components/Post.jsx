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
import { DeleteIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtom from "../atoms/postAtom";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [posts, setPosts] = useRecoilState(postAtom);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  if (!user) return null;

  const copyURL = async () => {
    try {
      const currentURL = window.location.href;
      await navigator.clipboard.writeText(currentURL);
      toast({
        status: "success",
        description: "Post link copied.",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleSave = () => {
    const link = document.createElement("a");
    link.href = post.img;
    link.download = post.text || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error)
    }
  };

  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name={user.name}
            src={user.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}

            {post.replies[0] && (
              <Avatar
                size="xs"
                name={post.replies[0].username}
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"-1px"}
                left={"13px"}
                padding={"1px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="Ryan Florence"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-2px"}
                padding={"1px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="Ryan Florence"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"0px"}
                padding={"1px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="/Images/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex
              gap={4}
              alignItems={"center"}
              onClick={(e) => e.preventDefault()}
            >
              <Text
                fontSize={"xs"}
                width={60}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
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
                  {currentUser?._id === user._id && (
                    <>
                      <MenuItem
                        bg={"gray.dark"}
                        justifyContent={"space-between"}
                        display="flex"
                        onClick={handleDelete}
                      >
                        <Text>Delete</Text>
                        <DeleteIcon size={20} style={{ marginRight: "8px" }} />
                      </MenuItem>
                      <Divider />
                    </>
                  )}
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
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
