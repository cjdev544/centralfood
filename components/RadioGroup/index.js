import { useEffect, useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { Form, Input, Radio, TextArea } from "semantic-ui-react";
import moment from "moment";

const RadioGroup = ({ setValues }) => {
  setDefaultLocale(es);

  const [shipping, setShipping] = useState("");
  const [cutlery, setCutlery] = useState("No");
  const [numberCutlery, setNumberCutlery] = useState(0);
  const [notes, setNotes] = useState("");
  const [isDeliveryNow, setIsDeliveryNow] = useState(
    "Lo antes posible (30 a 40 min)"
  );
  const [startDate, setStartDate] = useState(new Date());

  const isCloseDay = (date) => {
    const day = date.getDay();
    return day !== 2;
  };

  useEffect(() => {
    setValues({
      shipping,
      cutlery,
      numberCutlery,
      notes,
      isDeliveryNow,
      dateDelivery: moment(startDate).format("DD/MM/YY"),
      timeDelivery: moment(startDate).format("LT"),
    });
  }, [shipping, cutlery, numberCutlery, notes, isDeliveryNow, startDate]);

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
          <h4>¿Momento para la entrega?</h4>
        </Form.Field>
        <div className="radio-group__buttons delivery">
          <Form.Field>
            <Radio
              label="Lo antes posible (30 a 40 min)"
              name="radioGroup"
              value="Lo antes posible (30 a 40 min)"
              checked={isDeliveryNow === "Lo antes posible (30 a 40 min)"}
              onChange={(e, { value }) => setIsDeliveryNow(value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Programar"
              name="radioGroup"
              value="Programar"
              checked={isDeliveryNow === "Programar"}
              onChange={(e, { value }) => setIsDeliveryNow(value)}
            />
          </Form.Field>
        </div>
        {isDeliveryNow === "Programar" && (
          <DatePicker
            dateFormat="dd/MM/yy h:mm aa"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Hora:"
            showTimeInput
            minDate={new Date()}
            filterDate={isCloseDay}
            mini
          />
        )}
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
