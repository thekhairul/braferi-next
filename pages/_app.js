import Header from "@/components/Header";
import '@/styles/globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';


function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
      <div id="modals"></div>
    </QueryClientProvider>
  )
}

export default MyApp
