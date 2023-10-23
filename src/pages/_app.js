import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store/index";
import theme from "../../styles/theme";
import "../../styles/globals.css";
import "modern-normalize/modern-normalize.css";
// import ErrorProvider from "../Providers/ErrorProvider";
import RouterProvider from "../provider/RouterProvider";
import { QueryClient, QueryClientProvider } from 'react-query';
function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();
  return (
  
    <QueryClientProvider client={queryClient}>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
           {/* <RouterProvider> */}
              {/* <ErrorProvider>  */}
                <Component {...pageProps} />
             {/* </ErrorProvider> */}
            {/* </RouterProvider>  */}
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>


  );
}

export default MyApp;
