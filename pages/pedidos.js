import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PedidosPage from "../components/PedidosPage";
import { useAuth } from "../hooks/useAuth";

const Pedidos = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    setUser(auth?.user);
  }, [auth]);

  if (user === undefined) {
    router.replace("/");
    toast.warning("Inicia sesión para ver tus pedidos");
    return null;
  }

  return <PedidosPage />;
};

export default Pedidos;
