import { Grid } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import BasicModal from "../../modals/BasicModal";
import Address from "./Address";
import style from './Addresses.module.css'

const Addresses = ({
  title,
  showModal,
  setShowModal,
  formModal,
  openModal,
}) => {
  const { auth } = useAuth();
  const addresses = auth.addresses;
  const size = addresses?.length;

  return (
    <section className="addresses">
      <div className="data">
        <div className={style.listAddresses}>
          {size === 0 || !size ? (
            <h3 className={style.text}>No hay direcciones creadas</h3>
          ) : (
            <Grid>
              {addresses?.map((address) => (
                <Grid.Column
                  key={address.id}
                  mobile={16}
                  tablet={8}
                  computer={4}
                >
                  <Address address={address} openModal={openModal} />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <BasicModal
        title={title}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {formModal}
      </BasicModal>
    </section>
  );
};

export default Addresses;
