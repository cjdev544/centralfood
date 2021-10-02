import { Container } from "semantic-ui-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { useData } from "../../hooks/useData";
import { useDataUser } from "../../hooks/useDataUser";
import { useOrder } from "../../hooks/useOrder";

const BasicLayout = ({ children }) => {
  const { ordersAlert, getOrders } = useOrder();
  useData();
  useDataUser();
  useCart();
  getOrders();

  return (
    <Container fluid className="basic-layout">
      <Header ordersAlert={ordersAlert} />
      <Container className="content">{children}</Container>
      <Footer />
    </Container>
  );
};

export default BasicLayout;
