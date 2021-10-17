import { Container } from "semantic-ui-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { useData } from "../../hooks/useData";
import { useDataUser } from "../../hooks/useDataUser";
import { useOrder } from "../../hooks/useOrder";

const BasicLayout = ({ children }) => {
  const { ordersAlert, getOrders } = useOrder();
  const { data } = useData();
  useDataUser();
  useCart();
  getOrders();

  const isOpen = data?.isOpen;

  return (
    <Container fluid className="basic-layout">
      <div className="dark" />
      <Header ordersAlert={ordersAlert} />
      {!isOpen && isOpen !== null && (
        <div className="is-close">
          <p>
            En estos momentos nos encontramos cerrados para realizar nuevos
            pedidos
          </p>
        </div>
      )}
      <Container className="content">{children}</Container>
      <Footer />
    </Container>
  );
};

export default BasicLayout;
