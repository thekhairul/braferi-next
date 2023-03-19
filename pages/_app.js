import Header from "@/components/Header";
import store from "@/store/index";
import '@/styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="bg-gray-100 py-4">
          <Header />
          <Component {...pageProps} />
        </div>
      </Provider>
      <div id="modals"></div>
      <div id="sidebars"></div>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default MyApp
