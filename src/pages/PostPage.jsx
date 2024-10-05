import {Avatar, Flex, Image, Text} from "@chakra-ui/react"

const PostPage = () => {
  return <>
  <Flex>
    <Flex w={"full"} alignItems={"center"} gap={3}>
      <Avatar src="/Images/zuck-avatar.webp" size={"md"} name="Mark Zuckerberg" />
      <Flex>
        <Text fontSize={"sm"} fontWeight={"bold"} >markzuckerberg</Text>
        <Image src="/Images/verified.png" w={4} h={4} ml={4} />
      </Flex>
    </Flex>
  </Flex>
  </>;
};

export default PostPage;
