import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import questions from "../data/questions";

const columnsClasses: string = "grid-cols-5";
const rowsClasses: string = "grid-rows-4";

const blockClasses: string =
  "bg-gray-100 bg-opacity-20 flex justify-center items-center rounded-sm";

const Home: NextPage = () => {
  return (
    <div className="p-2">
      <Head>
        <title>The Interview Game Show</title>
        <meta name="description" content="The Interview Game Show" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto w-full md:max-w-3xl">
        <header className={`grid ${columnsClasses} gap-4 grid-rows-1`}>
          {Object.keys(questions).map((c) => (
            <h2
              key={c}
              className={`${blockClasses} min-h-[60px] font-medium text-xl`}
            >
              {c}
            </h2>
          ))}
        </header>

        <section
          className={`grid ${columnsClasses} ${rowsClasses} gap-4 mt-4 grid-flow-col`}
        >
          {Object.keys(questions).map((c) =>
            Object.keys(questions[c])
              .map((x) => parseInt(x, 10))
              .sort()
              .map((points) => (
                <Link key={`${c}-${points}`} href={`/${c}/${points}`}>
                  <div
                    className={`${blockClasses} min-h-[40px] grid-cols-1 hover:bg-opacity-40 hover:cursor-pointer`}
                  >
                    {points}
                  </div>
                </Link>
              ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
