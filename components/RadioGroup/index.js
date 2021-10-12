import { useEffect, useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { Form, Icon, Input, Radio, TextArea } from "semantic-ui-react";
import moment from "moment";
import style from "./RadioGroup.module.css";

const RadioGroup = ({ setValues }) => {
  setDefaultLocale(es);

  const [shipping, setShipping] = useState(null);
  const [cutlery, setCutlery] = useState("No");
  const [numberCutlery, setNumberCutlery] = useState(0);
  const [notes, setNotes] = useState("");
  const [isDeliveryNow, setIsDeliveryNow] = useState("Lo antes posible");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h4 className={style.marginTop}>
          ¿Tienes alergias ó deseas eliminar algún ingrediente?
        </h4>
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
              label="Lo antes posible"
              name="radioGroup"
              value={"Lo antes posible"}
              checked={isDeliveryNow === "Lo antes posible"}
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
          <span>La compra mínima para entrega a domicilio es de 12€</span>
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
          <div className={style.mapContainer}>
            <a
              href="https://www.google.com/maps/place/Central+food+M%C3%A1laga/@36.7212638,-4.4411586,17z/data=!3m1!4b1!4m5!3m4!1s0xd72f73a27895f9b:0x783c668421062425!8m2!3d36.7212596!4d-4.4389589?hl=es"
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
