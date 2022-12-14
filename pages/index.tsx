import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import questions from "../data/questions";
import buttonClasses from "../classes/button";

const columnsClasses: string = "grid-cols-5";
const rowsClasses: string = "grid-rows-4";

const blockClasses: string =
  "bg-gray-100 flex justify-center items-center rounded-sm";

const Home: NextPage = () => {
  const [currentCat, setCurrCat] = useState<null | keyof typeof questions>(
    null
  );

  const [visited, setVisited] = useState<
    Record<string, string | undefined | null>
  >({});

  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const numberOfKeys = localStorage.length;
    let beenVisited = {} as typeof visited;
    let currentScores = {} as typeof scores;

    for (let i = 0; i < numberOfKeys; i++) {
      const key = localStorage.key(i);

      if (key !== null && key.includes("visited:")) {
        beenVisited = {
          ...beenVisited,
          [key.replace("visited:", "")]: localStorage.getItem(key),
        };
      }

      if (key !== null && key.includes("score:")) {
        currentScores = {
          ...currentScores,
          [key.replace("score:", "")]: parseInt(
            localStorage.getItem(key) || "0",
            10
          ),
        };
      }
    }

    setVisited(beenVisited);
    setScores(currentScores);
  }, [setVisited]);

  return (
    <div className="p-2 h-screen w-screen flex justify-center items-center">
      <Head>
        <title>The Interview Game Show</title>
        <meta name="description" content="The Interview Game Show" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto w-full lg:max-w-3xl flex flex-row lg:block ">
        <div className="flex-grow">
          <header
            className={`grid ${columnsClasses} gap-1 lg:gap-2 grid-rows-1`}
          >
            {Object.keys(questions).map((c) => (
              <h2
                key={c}
                className={`${blockClasses} ${
                  currentCat === c ? "bg-opacity-[15%]" : "bg-opacity-5"
                } min-h-[90px]`}
              >
                <p className="text-center overflow-hidden text-ellipsis w-full font-medium text-sm md:text-base lg:text-xl">
                  {c}
                </p>
              </h2>
            ))}
          </header>

          <section
            className={`grid ${columnsClasses} ${rowsClasses} gap-1 lg:gap-2 mt-1 lg:mt-2 grid-flow-col`}
          >
            {Object.keys(questions).map((c) =>
              Object.keys(questions[c])
                .map((x) => parseInt(x, 10))
                .sort()
                .map((points) => (
                  <Link key={`${c}-${points}`} href={`/${c}/${points}`}>
                    <div
                      onMouseEnter={() => setCurrCat(c)}
                      onMouseLeave={() => setCurrCat(null)}
                      className={`${blockClasses} ${
                        visited[`/${c}/${points}`] === "true"
                          ? "text-gray-500 font-light"
                          : "text-gray-100 font-semibold hover:bg-opacity-40"
                      } bg-opacity-20 min-h-[60px] grid-cols-1 hover:cursor-pointer`}
                    >
                      {points}
                    </div>
                  </Link>
                ))
            )}
          </section>
        </div>

        <section
          className={`${
            Object.keys(scores).length === 0 ? "lg:hidden" : ""
          } lg:mt-4 border-gray-100 border-2 rounded-lg overflow-hidden w-1/4 ml-2 lg:ml-0 lg:w-auto h-auto`}
        >
          {Object.keys(scores)
            .sort((a, b) => {
              if (scores[a] < scores[b]) {
                return 1;
              }

              if (scores[a] > scores[b]) {
                return -1;
              }

              return 0;
            })
            .map((name, index) => (
              <div
                key={name}
                className={`${
                  index % 2 ? "bg-gray-700" : "bg-gray-800"
                } px-2 py-1`}
              >
                {name} - {scores[name]}
              </div>
            ))}
        </section>

        <button
          className={`fixed bottom-2 right-2 ${buttonClasses}`}
          onClick={() => {
            localStorage.clear();
            setVisited({});
            setScores({});
          }}
        >
          Reset game
        </button>
      </main>
    </div>
  );
};

export default Home;
