import { useEffect, useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { Form, Icon, Input, Radio, TextArea } from "semantic-ui-react";
import moment from "moment";
import style from './RadioGroup.module.css'

const RadioGroup = ({ setValues }) => {
  setDefaultLocale(es);

  const [shipping, setShipping] = useState(null);
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
          <h4 className={style.marginTop}>¿Deseas cubiertos?</h4>
        </Form.Field>
        <div className={style.buttons}>
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
        <h4 className={style.marginTop}>¿Tienes alergias ó deseas eliminar algún ingrediente?</h4>
        <TextArea
          placeholder="Si tienes alguna alergia ó quieres algun producto sin un ingrediente, cuentanos aquí."
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form>

      <Form className="radio-group">
        <Form.Field>
          <h4 className={style.marginTop}>¿Momento para la entrega?</h4>
        </Form.Field>
        <div className={style.delivery}>
          <Form.Field>
            <Radio
              label="Lo antes posible (30 a 40 min)"
              name="radioGroup"
              value={"Lo antes posible (30 a 40 min)"}
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
          <h4 className={style.marginTop}>¿Cómo quieres realizar tu pedido?</h4>
          <span>La compra mínima para entrega a domicilio es de 12</span>
        </Form.Field>
        <div className={style.buttons}>
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
        {shipping !== "Entrega a domicilio" && (
          <div>
            <a
              href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fmaps%2Fdir%2F%3Fapi%3D1%26destination%3D36.72479%252C-4.45312%26fbclid%3DIwAR0-yOSIpxrmPLCVG4UAzuJyAMxKeUfjxA_dmJOyq5J6TZSq11tSK-F-m0w&h=AT0lkhBDnl63IjBLXwTl2RsbeMQcBQcF-w4caszQWz1A5STUoCTx4Mz2sttub8QN1WxfVNwPzJTsBj1xugM13g1wg7AwPDffObbDmTscS-0U804ltdfeczLxhdAkn9qp_6o"
              target="_blank"
              rel="noreferrer"
              aria-label="Mapa"
              className={style.map}
            >
              Ver mapa
              <Icon name="map marker alternate" />
            </a>
            <br />
            Av Carlos Haya, <br /> con calle Francisco Rueda Perez 1,
            <br /> local 7 29007 Málaga, España
          </div>
        )}
      </Form>
    </>
  );
};

export default RadioGroup;
