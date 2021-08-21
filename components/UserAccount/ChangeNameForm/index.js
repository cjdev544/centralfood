import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { useUi } from "../../../hooks/useUi";

const ChangeNameForm = () => {
  const { auth, updateUser } = useAuth();
  const { name, lastname, id } = auth.user;

  const { isLoading, setIsLoading } = useUi();

  const formik = useFormik({
    initialValues: { name, lastname },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
    }),

    onSubmit: (formData) => {
      setIsLoading(true);
      updateUser(formData);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Cambiar nombre y apellido</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Nuevo nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Nuevo apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={isLoading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default ChangeNameForm;
