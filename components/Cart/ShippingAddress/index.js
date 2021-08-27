import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import Address from "./Address";

const ShippingAddress = ({ setAddress }) => {
  const { auth } = useAuth();
  const addresses = auth?.addresses;

  const [addressActive, setAddressActive] = useState(null);

  const size = addresses?.length;

  if (!addresses) return null;

  return (
    <section className="shipping-address">
      <div className="title">Dirección de envío</div>
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
    </section>
  );
};

export default ShippingAddress;
