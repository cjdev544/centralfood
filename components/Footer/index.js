import Link from "next/link";
const { Grid, Container, Icon } = require("semantic-ui-react");
import style from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Container>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <h4>Visita nuestras redes</h4>
            <div className={style.icon}>
              <a
                href="https://www.facebook.com/Centralfoodmalaga"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Icon name="facebook" />
              </a>
              <a
                href="https://www.instagram.com/centralfoodmalaga/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Icon name="instagram" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=+34649718831"
                target="_blank"
                rel="noreferrer"
                aria-label="Whatsapp"
              >
                <Icon name="whatsapp" />
              </a>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <h4>Legales</h4>
            <div className={style.legacy}>
              <Link href="/politica-privacidad">
                <a>
                  <p>Política de privacidad</p>
                </a>
              </Link>
              <Link href="/politica-devoluciones">
                <a>
                  <p>Política de devoluciones</p>
                </a>
              </Link>
            </div>
          </Grid.Column>
        </Grid>
        <p className={style.copy}>
          Elaborado por <span>CjDev544</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
