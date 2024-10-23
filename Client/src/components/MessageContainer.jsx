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

const MessageContainer = () => {
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
        <Avatar src="" size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          Haleem <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />

      <Flex
        flexDirection={"column"}
        gap={4}
        my={4}
        h={"400px"}
        overflowY={"scroll"}
      >
        {false &&
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

          <Message />
      </Flex>
    </Flex>
  );
};

export default MessageContainer;
