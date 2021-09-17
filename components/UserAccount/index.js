import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ArrowBack from "../ArrowBack";
import Addresses from "./Addresses";
import AddressForm from "./AddressForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm"
import style from './UserAcount.module.css'

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
      <section className={style.userAccount}>
        <div className={style.title}>
          Direcciones
          <div className={style.plus} onClick={() => openModal("Nueva dirección")}>
            Crear dirección<span>+</span>
          </div>
        </div>
        <div className={style.data}>
          <Addresses
            showModal={showModal}
            setShowModal={setShowModal}
            title={titleModal}
            formModal={formModal}
            openModal={openModal}
          />
        </div>
      </section>
      <section className={style.userAccount}>
        <div className={style.title}>Configuración</div>
        <div className={style.data}>
          <ChangeNameForm />
          <ChangeEmailForm />
          <ChangePasswordForm />
        </div>
      </section>
      <ArrowBack />
    </>
  );
};

export default UserAccount;
