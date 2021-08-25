import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import Address from "./Address/Address";

const ShippingAddress = ({ setAddress }) => {
  const { directions } = useSelector((state) => state.auth);

  const [addressActive, setAddressActive] = useState(null);

  const size = directions?.length;

  if (!directions) return null;

  return (
    <section className="shipping-address">
      <div className="title">Dirección de envío</div>
      <div className="data">
        {size === 0 ? (
          <h3>No hay direcciones creadas</h3>
        ) : (
          <Grid>
            {directions?.map((address) => (
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
    </section>
  );
};

export default ShippingAddress;
