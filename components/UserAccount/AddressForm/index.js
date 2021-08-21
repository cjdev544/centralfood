import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import { useUi } from "../../../hooks/useUi";
import { useAuth } from "../../../hooks/useAuth";

const AddressForm = ({ setShowModal, address }) => {
  const { isLoading, setIsLoading } = useUi();
  const { auth, createAddress, updateAddress } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: address?.title || "",
      name: address?.name || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      phone: address?.phone || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      address: Yup.string().required(true),
      city: Yup.string().required(true),
      state: Yup.string().required(true),
      postalCode: Yup.string().required(true),
      phone: Yup.string().required(true),
    }),

    onSubmit: (formData) => {
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
        placeholder="Título de la dirección. Ejmp: Mi Casa"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellido"
          placeholder="Nombre y apellido"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Código postal"
          placeholder="Código postal"
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
      <div className="actions">
        <Button type="submit" className="submit" loading={isLoading}>
          Guardar
        </Button>
      </div>
    </Form>
  );
};

export default AddressForm;
