import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { useData } from "../../hooks/useData";
import { useDataUser } from "../../hooks/useDataUser";

const BasicLayout = ({ children }) => {
  useData();
  useDataUser();
  useCart();

  return (
    <Container fluid className="basic-layout">
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
