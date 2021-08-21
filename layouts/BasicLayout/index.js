import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import { useDataUser } from "../../hooks/useDataUser";

const BasicLayout = ({ children }) => {
  useDataUser();

  return (
    <Container fluid className="basic-layout">
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
