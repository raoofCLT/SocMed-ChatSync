import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        console.log(error);
        showToast("Error", error, "error");
      }
    };
    getUser();
  }, [username, showToast]);
  if (!user) return null;

  return (
    <>
      <UserHeader  user={user} />
      <UserPost
        likes={1200}
        replies={234}
        postImg="/Images/post1.jpg"
        postTitle="Let's talk about threads."
      />
      <UserPost
        likes={1256}
        replies={456}
        postImg="/Images/post2.png"
        postTitle="Nice tutorial."
      />
      <UserPost
        likes={12583}
        replies={3454}
        postImg="/Images/post3.jpg"
        postTitle="I love this guy."
      />
      <UserPost
        likes={119553}
        replies={6582}
        postTitle="This is my first thread."
      />
    </>
  );
};

export default UserPage;
