import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import { useUi } from "../../../hooks/useUi";
import { useAuth } from "../../../hooks/useAuth";
import PlacesAutocompleteGoogle from "../../PlacesAutocompleteGoogle";

const AddressForm = ({ setShowModal, address }) => {
  const [addressNotAcepted, setAddressNotAcepted] = useState(null);
  const [zone, setZone] = useState(address ? address?.zone : null);

  const { isLoading, setIsLoading } = useUi();
  const { auth, createAddress, updateAddress } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: address?.title || "",
      name: address?.name || "",
      zone: address?.zone?.address || "",
      dni: address?.dni || "",
      postalCode: address?.postalCode || "",
      details: address?.details || "",
      phone: address?.phone || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      // zone: Yup.string().required(true),
      dni: Yup.string().required(true),
      postalCode: Yup.string().required(true),
      details: Yup.string().required(true),
      phone: Yup.string().required(true),
    }),

    onSubmit: (formData) => {
      console.log("CLICK");
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
      <Form.Input
        name="title"
        type="text"
        label="Título de la dirección"
        placeholder="Ejmp: Mi Casa"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre para factura"
          placeholder="Nombre para factura"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="dni"
          type="text"
          label="DNI/RIF"
          placeholder="DNI/TIE"
          onChange={formik.handleChange}
          value={formik.values.dni}
          error={formik.errors.dni}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Codigo postal"
          placeholder="Codigo postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
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
      {addressNotAcepted && (
        <p className="addressNotValid">
          En estos momentos solo realizamos envios a 10km de nuestro local.
        </p>
      )}
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
