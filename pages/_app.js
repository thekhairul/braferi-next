import Header from "@/components/Header";
import store from "@/store/index";
import '@/styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header></Header>
        <div className="bg-gray-100">
          <Component {...pageProps} />
        </div>
      </Provider>
      <div id="modals"></div>
      <div id="sidebars"></div>
    </QueryClientProvider>
  )
}

export default MyApp
