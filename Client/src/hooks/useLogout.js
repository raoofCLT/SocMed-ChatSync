import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";


const useLogout = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()

    const logout = async () => {
        try {
          const res = await fetch("/api/users/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Response Status:", res.status);
          console.log("Response Headers:", res.headers);
    
          const data = await res.json();
          console.log(`Your data is :`, data);
    
          if (data.error) {
            showToast("Error", data.error, "error");
            return;
          }
    
          localStorage.removeItem("user-threads");
          console.log("done");
          setUser(null);
        } catch (error) {
          showToast("Error", error, "error");
          console.log("Error in handleLogout:", error.message);
        }
      };
      return logout
}

export default useLogout
