import {
  Avatar,
  Divider,
  Flex,
  Image,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const MessageContainer = () => {
  const showToast = useShowToast()
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [messages, setMessages] = useState([])
  const currentUser = useRecoilValue(userAtom)


  useEffect(()=> {
    const getMessages = async () => {
      setLoadingMessages(true)
      setMessages([])
      try{
        const res = await fetch(`/api/messages/${selectedConversation.userId}`)
      const data = await res.json()
      if(data.error){
        showToast("Error", data.error, "error")
        return
      }
      setMessages(data)
      }catch (error){
        showToast("Error",error.message,"error")
      }finally{
        setLoadingMessages(false)
      }
    }
    getMessages()
  },[showToast, selectedConversation])
  
  return (
    <Flex
      flex="70"
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      p={2}
      flexDirection={"column"}
    >
      {/* Message header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          {selectedConversation.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />

      <Flex
        flexDirection={"column"}
        gap={4}
        my={4}
        p={2}
        h={"400px"}
        overflowY={"auto"}
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-start"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDirection={"column"} gap={2}>
                <SkeletonCircle h={"8px"} w={"250px"} />
                <SkeletonCircle h={"8px"} w={"250px"} />
                <SkeletonCircle h={"8px"} w={"250px"} />
                {i % 2 !== 0 && <SkeletonCircle size={7} />}
              </Flex>
            </Flex>
          ))}

          {!loadingMessages && (
            messages.map(message => (
              <Message key={message.id} message={message} ownMessage={currentUser._id === message.sender}/>
            ))
          )}
      </Flex>
      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
