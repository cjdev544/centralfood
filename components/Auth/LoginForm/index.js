import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Radio } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import { useUi } from "../../../hooks/useUi";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
// import { forgotPassword, loginUser } from "../../../api/user";

const LoginForm = ({ setShowLogin, setShowModal }) => {
  const { loginUser, resetEmailApi } = useAuth();
  const { isLoading, setIsLoading } = useUi();
  const [wantSubscribe, setWantSubscribe] = useState(false);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),

    onSubmit: async (formData) => {
      setIsLoading(true);
      loginUser(
        formData.identifier,
        formData.password,
        setShowModal,
        wantSubscribe
      );
    },
  });

  const resetPassword = async () => {
    formik.setErrors({});
    const validatorEmail = Yup.string().email().required();

    if (!validatorEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      const res = await resetEmailApi(formik.values.identifier);
      console.log(res);
    }
  };

  const handleRadio = (e, { checked }) => {
    setWantSubscribe(checked);
  };

  return (
    <Form className="form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico"
        autoFocus
        onChange={formik.handleChange}
        error={formik.errors.identifier}
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
        <Button type="button" basic onClick={() => setShowLogin(false)}>
          Registrar usuario
        </Button>
        <div>
          <Button type="submit" className="submit" loading={isLoading}>
            Iniciar sesión
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
