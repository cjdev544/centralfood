import { Button } from "semantic-ui-react";
import { useAuth } from "../../../../hooks/useAuth";
import { useUi } from "../../../../hooks/useUi";

const Address = ({ address, openModal }) => {
  const { deleteAddress } = useAuth();
  const { isLoading, setIsLoading } = useUi();

  const handleDelete = () => {
    setIsLoading(true);
    deleteAddress(address.id);
  };

  const handleUpdate = () => {
    openModal(`Editar: ${address.title}`, address);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button primary onClick={handleUpdate}>
          Editar
        </Button>
        <Button onClick={handleDelete} loading={isLoading}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default Address;
