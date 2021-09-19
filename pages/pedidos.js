import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PedidosPage from "../components/PedidosPage";
import { useAuth } from "../hooks/useAuth";
import Seo from "../components/Seo";

const Pedidos = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    setUser(auth?.user);
  }, [auth]);

  if (user === undefined) {
    router.replace("/");
    return null;
  }

  return (
    <>
      <Seo title="Mis pedidos" />
      <PedidosPage />
    </>
  );
};

export default Pedidos;
