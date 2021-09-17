import Normalize from "react-normalize";
import { Provider } from "react-redux";
import CookieConsent from "react-cookie-consent";
import { ToastContainer } from "react-toastify";
import "../css/globals.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { store } from "../redux/store";
import BasicLayout from "../layouts/BasicLayout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Normalize />
      <BasicLayout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </BasicLayout>
      <CookieConsent
        location="bottom"
        buttonText="Lo entiendo!!"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        Este sitio web utiliza cookies para mejorar la experiencia del usuario.
      </CookieConsent>
    </Provider>
  );
}

export default MyApp;
