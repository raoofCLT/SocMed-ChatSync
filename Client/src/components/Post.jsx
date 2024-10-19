import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useToast,
//   Divider,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
// import { BsThreeDots } from "react-icons/bs";
// import { MdSaveAlt } from "react-icons/md";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { LiaUserSlashSolid } from "react-icons/lia";
// import { TbMessageReport } from "react-icons/tb";
// import { AiOutlineLink } from "react-icons/ai";
// import { VscMute } from "react-icons/vsc";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from "date-fns"

const Post = ({ post, postedBy }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
//   const toast = useToast();
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  if (!user) return null;

//   const copyURL = () => {
//     const currentURL = window.location.href;
//     navigator.clipboard
//       .writeText(currentURL)
//       .then(() => {
//         toast({
//           status: "success",
//           description: "Post link copied.",
//           duration: 3000,
//           isClosable: true,
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleSave = () => {
//     const link = document.createElement("a");
//     link.href = post.img;
//     link.download = post.text || "download";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={2} mb={4} py={5}>
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
                src={post.replies[0].userprofilePic}
                position={"absolute"}
                top={"-1px"}
                left={"13px"}
                padding={"1px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name={post.replies[1].userprofilePic}
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
                src={post.replies[2].userprofilePic}
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
              <Text fontSize={"xs"} width={60} textAlign={"right"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {/* <Menu>
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
              </Menu> */}
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
          <Flex>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.replies.length} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
