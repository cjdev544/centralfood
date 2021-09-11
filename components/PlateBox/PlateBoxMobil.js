import Link from "next/link";
import Image from "next/image";
import { Grid } from "semantic-ui-react";
import NoImage from "../../public/no-image.png";

const PlateBoxMobil = ({ plate }) => {
  const cutDescription = plate?.descripcion?.substring(0, 51);

  return (
    <article className="plate-box-mobile">
      <Link href={`/plato/${plate?.path}`}>
        <a>
          <Grid className="plate-box-mobile__grid">
            <Grid.Column width={4} className="mobile-grid__image">
              <Image
                src={plate?.imagen ? plate.imagen?.url : NoImage}
                alt={plate.title}
                width={76}
                height={70}
              />
            </Grid.Column>
            <Grid.Column width={9}>
              <div className="plate-box-mobile__text-info">
                <h2>{plate?.nombre?.toUpperCase()}</h2>
                {plate?.descripcion?.length > 51 ? (
                  <p>{cutDescription}...</p>
                ) : (
                  <p>{cutDescription}</p>
                )}
              </div>
            </Grid.Column>
            <Grid.Column width={3} className="mobile-grid__price">
              <p>{plate?.precio} €</p>
            </Grid.Column>
          </Grid>
        </a>
      </Link>
    </article>
  );
};

export default PlateBoxMobil;
