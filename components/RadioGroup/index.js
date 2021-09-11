import { useEffect, useState } from "react";
import { Form, Input, Radio, TextArea } from "semantic-ui-react";

const RadioGroup = ({ setValues }) => {
  const [shipping, setShipping] = useState("");
  const [cutlery, setCutlery] = useState("No");
  const [numberCutlery, setNumberCutlery] = useState(0);
  const [notes, setNotes] = useState("")

  useEffect(() => {
    setValues({
      shipping,
      cutlery,
      numberCutlery,
      notes
    });
  }, [shipping, cutlery, numberCutlery, notes]);

  return (
    <>
      <Form className="radio-group">
        <Form.Field>
          <h4>¿Deseas cubiertos?</h4>
        </Form.Field>
        <div className="radio-group__buttons">
          <Form.Field>
            <Radio
              label="No"
              name="radioGroup"
              value="No"
              checked={cutlery === "No"}
              onChange={(e, { value }) => setCutlery(value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Si"
              name="radioGroup"
              value="Si"
              checked={cutlery === "Si"}
              onChange={(e, { value }) => setCutlery(value)}
            />
          </Form.Field>
          {cutlery === "Si" && (
            <Input
              type="number"
              size="mini"
              min="1"
              placeholder="¿cuantas personas?"
              onChange={(e) => setNumberCutlery(e.target.value)}
            />
          )}
        </div>
        <h4>¿Tienes alergias ó deseas eliminar algún ingrediente?</h4>
        <TextArea 
          placeholder="Si tienes alguna alergia ó quieres algun producto sin un ingrediente, cuentanos aquí." 
          onChange={(e) => setNotes(e.target.value)}           
        />
      </Form>

      <Form className="radio-group">
        <Form.Field>
          <h4>¿Cómo quieres realizar tu pedido?</h4>
          <span>La compra mínima para entrega a domicilio es de 12</span>
        </Form.Field>
        <div className="radio-group__buttons">
          <Form.Field>
            <Radio
              label="Recogida el en local"
              name="radioGroup"
              value="Recogida el en local"
              checked={shipping === "Recogida el en local"}
              onChange={(e, { value }) => setShipping(value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Entrega a domicilio"
              name="radioGroup"
              value="Entrega a domicilio"
              checked={shipping === "Entrega a domicilio"}
              onChange={(e, { value }) => setShipping(value)}
            />
          </Form.Field>
        </div>
      </Form>
    </>
  );
};

export default RadioGroup;
