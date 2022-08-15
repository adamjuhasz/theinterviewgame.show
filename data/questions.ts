const questions: Record<string, Record<number, string>> = {
  "Around the world": {
    100: "If you could choose to live one place in the world where would it be and why?",
    200: "Have you ever taken a vacation by yourself?",
    300: "What is the most interesting place you have been, and why?",
    400: "Have you ever gotten lost while traveling? Tell us the story.",
  },
  Hypothetical: {
    100: "If you could live in another historical period, would you? If so, which one?",
    200: "If you could only eat one dish for every meal for the rest of your life, what would it be?",
    300: "If you were the only human left on Earth, what would you do?",
    400: "If you could pick up a new skill in an instant, what would it be?",
  },
  "Younger you": {
    100: "When you were a kid, what did you want to be when you grew up?",
    200: "What is your favorite OG Disney movie?",
    300: "What was your first ever job?",
    400: "Where were you born?",
  },
  Favorites: {
    100: "What's one totally irrational fear that you have?",
    200: "What achievement are you most proud of?",
    300: "What shows are you currently watching?",
    400: "What is your favorite holiday?",
  },
  "Pot luck": {
    100: "What topic could you give a 1 hour presentation on with no preparation?",
    200: "What is your favorite activity that requires spending zero or little money?",
    300: "What's the last thing you did for the first time?",
    400: "Who would you like to play you in a movie about your life?",
  },
} as const;

export default questions;
