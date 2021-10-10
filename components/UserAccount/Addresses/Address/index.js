import { Button } from "semantic-ui-react";
import { useAuth } from "../../../../hooks/useAuth";
import { useUi } from "../../../../hooks/useUi";
import style from "./Address.module.css";

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
    <div className={`${style.address} address`}>
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.details}</p>
      <p>{address.zone?.address}</p>
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
