/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        adjective: "#808000", // Adjective
        adverb: "#87CEEB", // Adverb
        conjunction: "#7030A0", // Conjunction
        determiner: "#9ACD32", // Determiner
        noun: "#008000", // Noun
        number: "#66CC99", // Number
        preposition: "#FFC000", // Preposition
        pronoun: "#7FFF00", // Pronoun
        verb: "#0070C0", // Verb

        coordconjuncn: "#7030A0", // Conjunction
        existentialthere: "#008000", // Noun
        foreignword: "#008000", // Noun
        adjectivecomparative: "#808000", // Adjective
        adjectivesuperlative: "#808000", // Adjective
        modal: "#0070C0", // Verb
        nounsingormass: "#008000", // Noun
        propernounsing: "#008000", // Noun
        propernounplural: "#008000", // Noun
        nounplural: "#008000", // Noun
        possessiveending: "#008000", // Noun
        predeterminer: "#9ACD32", // Determiner
        possessivepronoun: "#7FFF00", // Pronoun
        personalpronoun: "#7FFF00", // Pronoun
        adverbcomparative: "#87CEEB", // Adverb
        adverbsuperlative: "#87CEEB", // Adverb
        particle: "#008000", // Noun
        symbol: "#008000", // Noun
        interjection: "#008000", // Noun
        verbbaseform: "#0070C0", // Verb
        verbpasttense: "#0070C0", // Verb
        verbgerund: "#0070C0", // Verb
        verbpastpart: "#0070C0", // Verb
        verbpresent: "#0070C0", // Verb
        whdeterminer: "#9ACD32", // Determiner
        whpronoun: "#7FFF00", // Pronoun
        possessivewh: "#7FFF00", // Pronoun
        whadverb: "#87CEEB", // Adverb
      },
    },
  },
  plugins: [],
};
