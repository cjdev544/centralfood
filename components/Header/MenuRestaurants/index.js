import Image from "next/image";
import Link from "next/link";
import { Container } from "semantic-ui-react";
import { useData } from "../../../hooks/useData";
import style from './MenuRestaurants.module.css'

const MenuRestaurants = () => {
  const { data } = useData();
  const restaurants = data?.restaurants;

  return (
    <div className={style.menuRest}>
      <Container>
        <div className={style.container}>
          {restaurants?.map((rest) => (
            <Link href={`/${rest.page}`} key={rest.id}>
              <a>
                <div className={style.rest}>
                  {rest?.image ? (
                    <>
                      <Image
                        src={rest.image}
                        alt={rest.name}
                        width={200}
                        height={200}
                      />
                      <h2>{rest.name}</h2>
                      <p>{rest.type}</p>
                    </>
                  ) : (
                    <div className={style.button}>
                      <h2>{rest.name}</h2>
                      <p>{rest.type}</p>
                    </div>
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MenuRestaurants;
