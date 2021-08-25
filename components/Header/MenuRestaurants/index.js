import Image from "next/image";
import Link from "next/link";
import { Container } from "semantic-ui-react";
import { useData } from "../../../hooks/useData";

const MenuRestaurants = () => {
  const { data } = useData();
  const restaurants = data?.restaurants;

  return (
    <div className="menu-restaurants">
      <Container>
        <div className="menu-restaurants__container">
          {restaurants?.map((rest) => (
            <Link href={`/${rest.page}`} key={rest.id}>
              <a>
                <div className="rest">
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
                    <div className="rest__button">
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
