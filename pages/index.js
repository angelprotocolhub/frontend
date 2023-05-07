import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TwoWay } from "@/components/TwoWay";
import { SmartAdditions } from "@/components/SmartAdditions";
import { UserFriendly } from "@/components/UserFriendly";
import { Footer } from "@/components/Footer";

const connector = new MetaMaskConnector();

export default function Home() {
  return (
    <>
      <Head>
        <title>Angel Protocol</title>
        <meta name="description" content="Angel Protocol Landing page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Hero>
          <Navbar />
        </Hero>

        <TwoWay />

        <SmartAdditions />

        <UserFriendly />

        <Footer />
      </main>
    </>
  );
}
