import Normalize from "react-normalize";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "../scss/globals.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
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
    </Provider>
  );
}

export default MyApp;
