import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import { useUi } from "../../../hooks/useUi";
import { useAuth } from "../../../hooks/useAuth";
import PlacesAutocompleteGoogle from "../../PlacesAutocompleteGoogle";

const AddressForm = ({ setShowModal, address }) => {
  const [addressNotAcepted, setAddressNotAcepted] = useState(null);
  const [zone, setZone] = useState(null);

  const { isLoading, setIsLoading } = useUi();
  const { auth, createAddress, updateAddress } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: address?.title || "",
      name: address?.name || "",
      // zone: address?.zona?.address[0] || "",
      dni: address?.dni || "",
      details: address?.details || "",
      phone: address?.phone || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      //zona: Yup.string().required(true),
      dni: Yup.string().required(true),
      details: Yup.string().required(true),
      phone: Yup.string().required(true),
    }),

    onSubmit: (formData) => {
      formData.zone = zone;

      if (!address) {
        setIsLoading(true);
        const dataTemp = {
          ...formData,
          user: auth.uid,
        };
        createAddress(dataTemp, setShowModal);
      } else {
        const dataTemp = {
          ...address,
          ...formData,
        };
        setIsLoading(true);
        updateAddress(dataTemp, setShowModal);
      }
    },
  });

  return (
    <Form className="addres-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          type="text"
          label="Título de la dirección"
          placeholder="Ejmp: Mi Casa"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="name"
          type="text"
          label="Nombre para factura"
          placeholder="Nombre para factura"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="dni"
          type="text"
          label="DNI/RIF"
          placeholder="DNI/RIF"
          onChange={formik.handleChange}
          value={formik.values.dni}
          error={formik.errors.dni}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Número telefónico"
          placeholder="Número telefónico"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <PlacesAutocompleteGoogle
        address={address}
        setZone={setZone}
        setAddressNotAcepted={setAddressNotAcepted}
      />
      <Form.Input
        name="details"
        type="text"
        label="Casa/Edificio/Número"
        placeholder="Detalles especificos de dirección"
        onChange={formik.handleChange}
        value={formik.values.details}
        error={formik.errors.details}
      />
      <div className="actions">
        <Button
          type="submit"
          className="submit"
          disabled={addressNotAcepted === null ? true : addressNotAcepted}
          loading={isLoading}
        >
          Guardar
        </Button>
      </div>
    </Form>
  );
};

export default AddressForm;
