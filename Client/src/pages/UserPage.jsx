import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={1200} replies={234} postImg="/Images/post1.jpg" postTitle="Let's talk about threads." />
      <UserPost likes={1256} replies={456} postImg="/Images/post2.png" postTitle="Nice tutorial." />
      <UserPost likes={12583} replies={3454} postImg="/Images/post3.jpg" postTitle="I love this guy." />
      <UserPost likes={119553} replies={6582} postTitle="This is my first thread." />
    </>
  );
};

export default UserPage;
