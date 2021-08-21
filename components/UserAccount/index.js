import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Addresses from "./Addresses";
import AddressForm from "./AddressForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";

const UserAccount = () => {
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { auth } = useAuth();

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(<AddressForm setShowModal={setShowModal} address={address} />);
    setShowModal(true);
  };

  if (!auth?.user) return null;

  return (
    <>
      <section className="user-account">
        <div className="title addresses-title">
          Direcciones
          <div className="plus" onClick={() => openModal("Nueva dirección")}>
            Crear dirección<span>+</span>
          </div>
        </div>
        <div className="data">
          <Addresses
            showModal={showModal}
            setShowModal={setShowModal}
            title={titleModal}
            formModal={formModal}
            openModal={openModal}
          />
        </div>
      </section>
      <section className="user-account">
        <div className="title">Configuración</div>
        <div className="data">
          <ChangeNameForm />
          <ChangeEmailForm />
          <ChangePasswordForm />
        </div>
      </section>
    </>
  );
};

export default UserAccount;
