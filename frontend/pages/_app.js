import { useEffect } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/Layout";
import "../styles/global.css";
import Web3 from "web3";
import { useStore } from "../utils/store";
import { connectMetamask } from "../utils";
import { useRouter } from "next/router";

export default function App(props) {
  const { Component, pageProps } = props;
  const setWeb3 = useStore((state) => state.setWeb3);
  const setWalletAddress = useStore((state) => state.setWalletAddress);
  const router = useRouter();
  const setUpdateProposalStatus = useStore((state) => state.setUpdateProposalStatus);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      if (url.includes("/proposal/")) {
        setUpdateProposalStatus(true);
      } else {
        setUpdateProposalStatus(false);
      }
    });
  }, [router.events, setUpdateProposalStatus]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);

        window.ethereum.on("accountsChanged", () => {
          connectMetamask({ setWalletAddress });
        });
        // return window.ethereum.removeListener("accountsChanged", () => {});
      } catch (err) {
        console.log(err);
      }
    }
  }, [setWeb3, setWalletAddress]);

  return (
    <>
      <Head>
        <title>Cupcake Swap</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" /> */}
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
