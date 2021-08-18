import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";

const BasicLayout = ({ children }) => {
  useAuth();

  return (
    <Container fluid className="basic-layout">
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
