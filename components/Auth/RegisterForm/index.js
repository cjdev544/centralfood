import { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Radio } from "semantic-ui-react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useUi } from "../../../hooks/useUi";
import { useAuth } from "../../../hooks/useAuth";

const RegisterForm = ({ setShowLogin, setShowModal }) => {
  const [wantSubscribe, setWantSubscribe] = useState(false);

  const { isLoading, setIsLoading } = useUi();

  const { registerUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: uuidv4(),
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string()
        .min(6)
        .required("La contraseña debe tener almenos 6 caracteres"),
    }),

    onSubmit: async (formData) => {
      setIsLoading(true);
      registerUser(formData, setShowModal, wantSubscribe);
    },
  });

  const handleRadio = (e, { checked }) => {
    setWantSubscribe(checked);
  };

  return (
    <Form className="form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        autoFocus
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellido"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electrónico"
        autoComplete="current-email"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Radio
        toggle
        label="Qiero recibir ofertas y promociones"
        onChange={handleRadio}
        name="subscribe"
      />
      <div className="actions">
        <Button type="button" basic onClick={() => setShowLogin(true)}>
          Iniciar sesión
        </Button>
        <Button type="submit" className="submit" loading={isLoading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
