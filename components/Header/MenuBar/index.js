import { useState } from "react";
import Link from "next/link";
import { Container, Icon, Label, Menu } from "semantic-ui-react";
import BasicModal from "../../modals/BasicModal";
import Auth from "../../Auth";
import { useUi } from "../../../hooks/useUi";
import { useAuth } from "../../../hooks/useAuth";

const MenuBar = () => {
  const [titleModal, setTitleModal] = useState("Iniciar sesión");

  const { setShowModal } = useUi();

  const { auth, logoutAuth } = useAuth();

  const handleLogout = () => {
    logoutAuth();
  };

  return (
    <div className="menu-bar">
      <Container className="menu-bar__items">
        {auth?.user ? (
          <>
            <Link href="/orders">
              <a>
                <Menu.Item>
                  <Icon name="shopping basket" />
                  Mis pedidos
                </Menu.Item>
              </a>
            </Link>
            <Link href="/cuenta">
              <a>
                <Menu.Item>
                  <Icon name="user outline" />
                  {`${auth?.user?.name} ${auth?.user?.lastname}`}
                </Menu.Item>
              </a>
            </Link>
            <Link href="/carrito">
              <a>
                <Menu.Item className="icon_pointer">
                  <Icon name="cart" />
                  Carrito
                  {0 > 0 && (
                    <Label color="red" floating circular>
                      {0}
                    </Label>
                  )}
                </Menu.Item>
              </a>
            </Link>
            <Menu.Item className="icon_pointer" onClick={handleLogout}>
              <Icon name="power off" />
              Cerrar sesión
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item onClick={() => setShowModal(true)}>
              <Icon name="user outline" />
              Iniciar sesión
            </Menu.Item>
            <Link href="/carrito">
              <a>
                <Menu.Item className="icon_pointer">
                  <Icon name="cart" />
                  Carrito
                  {0 > 0 && (
                    <Label color="red" floating circular>
                      {0}
                    </Label>
                  )}
                </Menu.Item>
              </a>
            </Link>
          </>
        )}
      </Container>
      <BasicModal title={titleModal}>
        <Auth setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
};

export default MenuBar;
