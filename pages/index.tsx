import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="p-2">
      <Head>
        <title>The Interview Game Show</title>
        <meta name="description" content="The Interview Game Show" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="">Welcome to the interview game show!</h1>
      </main>
    </div>
  );
};

export default Home;
