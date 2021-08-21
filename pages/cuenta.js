import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserAccount from "../components/UserAccount";
// import UserAccount from "../components/UserAccount/UserAccount";
import { useAuth } from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";

const Account = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  if (user === undefined) {
    router.replace("/");
    toast.warning("Inicia sesión para entrar en tu cuenta");
    return null;
  }

  return (
    <BasicLayout>{!user ? <p>Cargando...</p> : <UserAccount />}</BasicLayout>
  );
};

export default Account;
