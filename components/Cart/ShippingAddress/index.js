import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import BasicModal from "../../modals/BasicModal";
import AddressForm from "../../UserAccount/AddressForm";
import Address from "./Address";

const ShippingAddress = ({ setAddress }) => {
  const { auth } = useAuth();
  const addresses = auth?.addresses;

  const [addressActive, setAddressActive] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [showModal, setShowModal] = useState();

  const size = addresses?.length;

  const openModal = () => {
    setFormModal(<AddressForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  if (!addresses) return null;

  return (
    <section className="shipping-address">
      <h4>
        Marca una dirección, al ponerse de color saldrá el boton para pagar.
      </h4>
      <div className="title address-title">
        Dirección de envío
        <div className="plus" onClick={() => openModal("Nueva dirección")}>
          Crear dirección<span>+</span>
        </div>
      </div>
      <div className="data">
        {size === 0 ? (
          <h3>No hay direcciones creadas</h3>
        ) : (
          <Grid>
            {addresses?.map((address) => (
              <Address
                key={address.id}
                address={address}
                setAddress={setAddress}
                addressActive={addressActive}
                setAddressActive={setAddressActive}
              />
            ))}
          </Grid>
        )}
      </div>
      <BasicModal
        title="Crear dirección"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {formModal}
      </BasicModal>
    </section>
  );
};

export default ShippingAddress;
