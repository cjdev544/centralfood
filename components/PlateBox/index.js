import Link from "next/link";
import Image from "next/image";
import { Icon } from "semantic-ui-react";
import NoImage from "../../public/no-image.png";
import PlateBoxMobil from "./PlateBoxMobil";
import { useMediaQueryJs } from "../../hooks/useMediaQueryJs";
import style from './PlateBox.module.css'

const PlateBox = ({ plate }) => {
  const { isAMobil } = useMediaQueryJs();

  const cutDescription = plate?.descripcion?.substring(0, 51);

  if (isAMobil) return <PlateBoxMobil plate={plate} />;

  return (
    <article className={style.box}>
      <Link href={`/plato/${plate?.path}`}>
        <a>
          <Image
            src={plate?.imagen ? plate.imagen?.url : NoImage}
            alt={plate.title}
            width={240}
            height={160}
          />
          <div className={style.text}>
            <div className={style.info}>
              <h2>{plate?.nombre?.toUpperCase()}</h2>
              {plate?.descripcion?.length > 51 ? (
                <p>{cutDescription}...</p>
              ) : (
                <p>{cutDescription}</p>
              )}
            </div>
            <div className="plate-footer">
              {plate?.alergico && (
                <div className={style.alergic}>
                  <Icon name="exclamation circle" />
                  Producto con alérgenos
                </div>
              )}
              <div className={style.price}>
                <p>{plate?.precio} €</p>
                <Icon name="plus circle" />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default PlateBox;
