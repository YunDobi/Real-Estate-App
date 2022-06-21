import Router from 'next/router';
import Head from 'next/head';
import { NProgress } from 'nprogress'; // loading bar
import { ChakraProvider } from '@chakra-ui/react' //make same iamges size

import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
 return(
  <>
  <Head>
    
  </Head>
  <ChakraProvider>
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  </ChakraProvider>
  </>
 )
}

export default MyApp
