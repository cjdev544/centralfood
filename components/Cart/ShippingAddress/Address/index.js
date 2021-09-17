import { Grid } from "semantic-ui-react";
import style from '../ShippingAddress.module.css'

const Address = ({ address, setAddress, addressActive, setAddressActive }) => {
  const changeAddress = () => {
    setAddress(address);
    setAddressActive(address.id);
  };

  return (
    <Grid.Column mobile={16} tablet={8} computer={4}>
      <div
        className={addressActive === address.id ? `${style.address} ${style.active}` : `${style.address}`}
        onClick={changeAddress}
      >
        <p>{address.title}</p>
        <p>{address.name}</p>
        <p>{address.address}</p>
        <p>
          {address.state}, {address.city}, {address.postalCode}
        </p>
        <p>{address.phone}</p>
      </div>
    </Grid.Column>
  );
};

export default Address;
