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
  Spinner,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLink } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";
import Actions from "../components/Actions";
import { useEffect } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtom from "../atoms/postAtom";

const PostPage = () => {
  const [user, loading] = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const toast = useToast();

  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
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
      navigate(`${user.username}`);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

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
    link.href = currentPost.img;
    link.download = currentPost.title || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name={user.name} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/Images/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
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
              cursor="pointer"
            >
              <Text>Save</Text>
              <CiBookmark size={20} style={{ marginRight: "8px" }} />
            </MenuItem>
            <Divider />
            {currentUser?._id === user._id && (
              <>
                <Divider />
                <MenuItem
                  bg={"gray.dark"}
                  justifyContent={"space-between"}
                  display="flex"
                  cursor="pointer"
                  onClick={handleDeletePost}
                >
                  <Text>Delete</Text>
                  <DeleteIcon size={20} cursor={"pointer"} />
                </MenuItem>
              </>
            )}
            <Divider />
            <MenuItem
              bg={"gray.dark"}
              justifyContent={"space-between"}
              display="flex"
              cursor="pointer"
            >
              <Text>Mute</Text>
              <VscMute size={20} style={{ marginRight: "8px" }} />
            </MenuItem>
            <Divider />
            <MenuItem
              bg={"gray.dark"}
              justifyContent={"space-between"}
              display="flex"
              cursor="pointer"
              onClick={copyURL}
            >
              <Text>Copy link</Text>
              <AiOutlineLink size={20} style={{ marginRight: "8px" }} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text my={3}>hello</Text>
      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
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
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
};

export default PostPage;
