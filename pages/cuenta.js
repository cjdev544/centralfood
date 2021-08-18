import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import UserAccount from "../components/UserAccount/UserAccount";
import { useAuth } from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";

const Account = () => {
  const router = useRouter();
  const { auth } = useAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  if (user === undefined) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout>
      {/* <UserAccount /> */}
      <h1>Aqui cuenta de usuario</h1>
    </BasicLayout>
  );
};

export default Account;
