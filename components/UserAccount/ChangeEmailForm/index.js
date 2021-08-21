import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import { useAuth } from "../../../hooks/useAuth";
import { useUi } from "../../../hooks/useUi";

const ChangeEmailForm = () => {
  const { setIsLoading, isLoading } = useUi();
  const { auth, updateUser } = useAuth();
  const { email } = auth.user;

  const formik = useFormik({
    initialValues: {
      email: "",
      repeatEmail: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("repeatEmail")], true),
      repeatEmail: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("email")], true),
    }),

    onSubmit: (formData) => {
      setIsLoading(true);
      updateUser({ email: formData.email });
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambiar Email <span>(Email actual: {email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Nuevo email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma el nuevo email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={isLoading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default ChangeEmailForm;
