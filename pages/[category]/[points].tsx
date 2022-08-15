import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sample } from "lodash";
import { useRouter } from "next/router";

import questions from "../../data/questions";
import otherPlayers from "../../data/players";
import buttonClasses from "../../classes/button";

interface Params extends ParsedUrlQuery {
  category: string;
  points: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = Object.keys(questions)
    .sort()
    .map((c) =>
      Object.keys(questions[c])
        .map((p) => parseInt(p, 10))
        .map((points) => ({
          params: { category: c, points: `${points}` },
        }))
    )
    .flat(1);

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

interface Props {
  category: string;
  points: number;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  if (context.params === undefined) {
    return { notFound: true };
  }

  const { category, points } = context.params;

  return {
    props: {
      category,
      points: parseInt(points, 10),
    },
  };
};

const Question: NextPage<Props> = (props) => {
  useEffect(() => {
    localStorage.setItem(`visited:/${props.category}/${props.points}`, "true");
  });

  return (
    <div className="p-2 h-screen w-screen flex justify-center items-center">
      <main className="flex flex-col items-center w-10/12 lg:max-w-[700px]">
        <h1 className=" text-3xl lg:text-6xl font-semibold px-4 text-center">
          {props.category}
        </h1>

        <div className="h-[1px] w-full bg-gray-500 my-2 lg:my-4" />

        <p className="text-lg lg:text-2xl text-center px-4">
          {questions[props.category][props.points]}
        </p>

        <div className="w-full flex mt-4">
          <Link href={"/"}>
            <div className={buttonClasses}>← Go back</div>
          </Link>
        </div>

        <div className="h-[1px] w-full bg-transparent my-1 lg:my-4" />

        <PlayerBox {...props} />
      </main>
    </div>
  );
};

const PlayerBox = (props: Props): JSX.Element => {
  const router = useRouter();

  const [[selectedPlayer, round], setSelectedPlayer] = useState<
    [typeof otherPlayers[number] | null, number]
  >([null, -1]);

  useEffect(() => {
    if (round === -1) {
      return;
    }

    if (round === otherPlayers.length * 2) {
      return;
    }

    const timer = setTimeout(() => {
      setSelectedPlayer([
        sample(otherPlayers) || otherPlayers[(round + 1) % otherPlayers.length],
        round + 1,
      ]);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [round]);

  useEffect(() => {
    const handler = () => {
      if (selectedPlayer === null) {
        return;
      }

      const currScore = localStorage.getItem(`score:${selectedPlayer}`);

      localStorage.setItem(
        `score:${selectedPlayer}`,
        (currScore === null
          ? props.points
          : parseInt(currScore, 10) + props.points
        ).toFixed(0)
      );

      return;
    };

    router.events.on("routeChangeStart", handler);

    return () => {
      router.events.off("routeChangeStart", handler);
    };
  }, [props.points, router, selectedPlayer]);

  return (
    <div className="grid grid-cols-5 lg:grid-cols-3 gap-1 lg:gap-2 w-full lg:w-3/4">
      {otherPlayers.map((name) => (
        <div
          key={name}
          className={`${
            selectedPlayer === name
              ? "bg-gray-300 text-gray-900 font-semibold"
              : "bg-gray-700 text-gray-100 font-normal"
          } flex items-center justify-center aspect-[4/2.5] rounded-md overflow-hidden`}
        >
          {name}
        </div>
      ))}

      <div className="lg:hidden"></div>

      <button
        onClick={() => {
          setSelectedPlayer([selectedPlayer, 0]);
        }}
        className={`bg-emerald-900 flex items-center justify-center aspect-[4/2.5] font-semibold decoration-emerald-100 decoration-solid decoration-2 underline-offset-4 hover:bg-emerald-600 rounded-md`}
      >
        <span className="hidden lg:inline">🌪&nbsp;</span>Spin
      </button>
    </div>
  );
};

export default Question;
