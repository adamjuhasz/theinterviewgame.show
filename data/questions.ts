const questions: Record<string, Record<number, string>> = {
  "Around the world": {
    100: "If you could choose to live one place in the world where would it be and why?",
    200: "Have you ever taken a vacation by yourself?",
    300: "What is the most interesting place you have been, and why?",
    400: "Have you ever gotten lost while traveling? Tell us the story.",
  },
  Hypothetical: { 100: "", 200: "", 300: "", 400: "" },
  "Younger you": { 100: "", 200: "", 300: "", 400: "" },
  Favorites: { 100: "", 200: "", 300: "", 400: "" },
  "Pot luck": { 100: "", 200: "", 300: "", 400: "" },
} as const;

export default questions;
