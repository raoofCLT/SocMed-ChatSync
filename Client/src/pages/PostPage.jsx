import {
  Avatar,
  Flex,
  Image,
  Text,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // useToast,
  Box,
  Divider,
  Button,
  Spinner,
} from "@chakra-ui/react";
// import { BsThreeDots } from "react-icons/bs";
// import { CiBookmark } from "react-icons/ci";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { LiaUserSlashSolid } from "react-icons/lia";
// import { TbMessageReport } from "react-icons/tb";
// import { AiOutlineLink } from "react-icons/ai";
// import { VscMute } from "react-icons/vsc";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const PostPage = ({ postImg, postTitle }) => {
  const [user, loading] = useGetUserProfile();
  // const [liked, setLiked] = useState(false);
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate()
  // const toast = useToast();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid]);

  const handleDeletePost = async () => {
    try{
      if(!window.confirm("Are you sure you want to delete this post")) return

      const res = await fetch(`/api/posts/${post._id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if(data.error){
        showToast("Error", data.error, "error");
        return
      }
      showToast("Success", "Post deleted", "success");
      navigate(`${user.username}`)
    }catch (error){
      showToast("Error", error, "error");
    }
  }


  // const copyURL = () => {
  //   const currentURL = window.location.href;
  //   navigator.clipboard
  //     .writeText(currentURL)
  //     .then(() => {
  //       toast({
  //         status: "success",
  //         description: "Post link copied.",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const handleSave = () => {
  //   const link = document.createElement("a");
  //   link.href = postImg;
  //   link.download = postTitle || "download";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) return null;

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
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <DeleteIcon
              size={20}
              cursor={"pointer"}
              onClick={handleDeletePost}
            />
          )}
        </Flex>
        {/* <Flex gap={4} alignItems={"center"}>
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
        </Menu> */}
      </Flex>
      <Text my={3}>hello</Text>
      {post.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={"/Images/post1.jpg"} w={"full"} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={post} />
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
      {post.replies.map(reply => (
       <Comment
       key={reply._id}
       reply={reply}
       lastReply = {reply._id === post.replies[post.replies.length -1]._id}
      /> 
      ))}
    </>
  );
};

export default PostPage;
