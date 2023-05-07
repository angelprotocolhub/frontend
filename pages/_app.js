import "@/styles/globals.css";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Layout } from "@/components/Layout";

const SUBGRAPH_URI =
  "https://api.thegraph.com/subgraphs/name/franfran20/angel-protocol-tx-subgraph";

const apolloClient = new ApolloClient({
  uri: SUBGRAPH_URI,
  cache: new InMemoryCache(),
});

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER }),
    publicProvider(),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </WagmiConfig>
  );
}
