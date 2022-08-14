import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import questions from "../../data/questions";

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
  points: string;
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
      points,
    },
  };
};

const Question: NextPage<Props> = (props) => {
  return (
    <>
      {props.category} - {props.points}
    </>
  );
};

export default Question;
