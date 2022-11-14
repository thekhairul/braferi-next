import Header from "@/components/Header";
import '@/styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';


function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Header></Header>
      <div className="bg-gray-100">
        <Component {...pageProps} />
      </div>
      <div id="modals"></div>
    </QueryClientProvider>
  )
}

export default MyApp
