import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [1, 3, 4, 2018, 80001, 137];

  const connectors = {
    injected: {},
  };


  return <ThirdwebWeb3Provider 
          connectors={connectors} supportedChainIds={supportedChainIds}>
    <Component {...pageProps} />
  </ThirdwebWeb3Provider>
}

export default MyApp
