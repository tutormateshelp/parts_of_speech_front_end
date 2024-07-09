import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function POS_analyzer() {
  const [showInsightArea, setShowInsightArea] = useState(true);
  const [userText, setUserText] = useState();
  const [data, setData] = useState(``);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [editText, setEditText] = useState(true);

  async function handleSubmit() {
    const link = `https://tutor-mates-pos-api.vercel.app/proxy?url=${encodeURIComponent(
      generateTaggerUrl(userText)
    )}`;

    console.log(generateTaggerUrl(userText));

    setIsAnalyzing(true);
    try {
      const response = await fetch(link);

      if (response.ok) {
        const data = await response.json();

        setData(data);
        setShowInsightArea(true);
      } else {
        console.error(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
    setIsAnalyzing(false);
  }

  function generateTaggerUrl(text) {
    const formattedText = text.replace(/\s+/g, "+");

    const baseUrl = "https://parts-of-speech.info/tagger/tagger";

    const language = "en";

    const taggerUrl = `${baseUrl}?text=${formattedText}&language=${language}`;

    return taggerUrl;
  }

  function GenerateInsightTags() {
    const posMap = new Map([
      ["CC", "Coord Conjuncn"],
      ["CD", "Number"],
      ["DT", "Determiner"],
      ["EX", "Existential there"],
      ["FW", "Foreign Word"],
      ["IN", "Preposition"],
      ["JJ", "Adjective"],
      ["JJR", "Adjective comparative"],
      ["JJS", "Adjective superlative"],
      ["MD", "Modal"],
      ["NN", "Noun, sing. or mass"],
      ["NNP", "Proper noun, sing."],
      ["NNPS", "Proper noun, plural"],
      ["NNS", "Noun, plural"],
      ["POS", "Possessive ending"],
      ["PDT", "Predeterminer"],
      ["PRP$", "pronoun"],
      ["PP$", "Possessive pronoun"],
      ["PRP", "Personal pronoun"],
      ["RB", "Adverb"],
      ["RBR", "Adverb, comparative"],
      ["RBS", "Adverb, superlative"],
      ["RP", "Particle"],
      ["SYM", "Symbol"],
      ["UH", "Interjection"],
      ["VB", "verb, base form"],
      ["VBD", "verb, past tense"],
      ["VBG", "verb, gerund"],
      ["VBN", "verb, past part"],
      ["VBP", "Verb, present"],
      ["VBZ", "Verb, present"],
      ["WDT", "Wh-determiner"],
      ["WP", "Wh pronoun"],
      ["WP$", "Possessive-Wh"],
      ["WRB", "Wh-adverb"],
      // [',', 'Comma'],
      // ['.', 'Sent-final punct'],
      // [':', 'Mid-sent punct.'],
      // ['$', 'Dollar sign'],
      // ['#', 'Pound sign'],
      // ['"', 'quote'],
      // [``, 'quote'],
      // ["``", 'quote'],
      // ['(', 'Left paren'],
      // ['-LRB-', 'Left paren'],
      // [')', 'Right paren'],
      // ['-RRB-', 'Right paren'],
      // ['HYPH', '-'],
    ]);

    const classMap = new Map([
      ["CC", "conjunction"],
      ["CD", "number"],
      ["DT", "determiner"],
      ["EX", "ExistentialThere"],
      ["FW", "ForeignWord"],
      ["IN", "preposition"],
      ["JJ", "adjective"],
      ["JJR", "adjective"],
      ["JJS", "adjective"],
      ["MD", "Modal"],
      ["NN", "noun"],
      ["NNP", "noun"],
      ["NNPS", "noun"],
      ["NNS", "noun"],
      ["POS", "Possessive ending"],
      ["PDT", "Predeterminer"],
      ["PRP$", "pronoun"],
      ["PP$", "pronoun"],
      ["PRP", "pronoun"],
      ["RB", "adverb"],
      ["RBR", "adverb"],
      ["RBS", "adverb"],
      ["RP", "Particle"],
      ["SYM", "Symbol"],
      ["UH", "Interjection"],
      ["VB", "verb"],
      ["VBD", "verb"],
      ["VBG", "verb"],
      ["VBN", "verb"],
      ["VBP", "verb"],
      ["VBZ", "verb"],
      ["WDT", "determiner"],
      ["WP", "pronoun"],
      ["WP$", "Possessive-Wh"],
      ["WRB", "adverb"],
    ]);

    const words = data.taggedText.split(/\s+/);

    const jsxElements = words.map((word, index) => {
      const [text, tag] = word.split("/");

      if (!posMap.has(tag)) {
        console.log(
          `Tag '${tag}' with text '${text}' not found in the map. Skipping...`
        );
        return (
          <div
            key={index}
            className="h-max flex justify-center items-center flex-col -z-10 "
          >
            <span className="relative  group   rounded p-1 font-medium text-lg m-1 mb-0 max-h-10">
              {text}
            </span>
          </div>
        );
      }

      const posColour = classMap.get(tag).toLocaleLowerCase();

      const spanClassName = `-z-10 ${posColour} relative  rounded p-1 font-medium text-lg   mb-0 max-h-10 rounded m-1`;
      const tagDivClassName = `border-4 rounded absolute text-lg invisible text-noun bg-gray-300 ${posColour} bg group-hover:visible m-[0.04rem] mt-[0.6rem] p-1 font-semibold rounded   `;
      const tagTopArrowClassName = `border-r-0  border-b-0  border text-lg absolute rotate-45 bg-gray-300 ml-2 p-1 font-semibold -mt-[10.75px]  border-2 scale-150 z-10`;

      return (
        <div
          key={index}
          className="h-max flex justify-center items-center flex-col"
        >
          <span className="group relative ">
            <div className={spanClassName}>{text}</div>

            <div className={tagDivClassName}>
              <div className={tagTopArrowClassName} />
              <div className={`min-w-max z-20`}>{posMap.get(tag)}</div>
            </div>
          </span>
        </div>
      );
    });

    return (
      <div id="insightArea" className=" p-2 border-2 font-sans flex flex-wrap ">
        {jsxElements}
      </div>
    );
  }

  return (
    <div className="flex flex-row ">
      <div className=" h-screen flex-col flex p-5 mt-2  gap-10">
        <div className="gap-2 flex flex-col   ">
          <div className=" text-lg font-normal">
            Enter a complete sentence (no single words!) and click at "Submit
            text". The tagging works better when grammar and orthography are
            correct.
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="text-area" className="font-bold text-lg">
              Text:
            </label>
            {editText ? (
              <textarea
                id="text-area"
                className="p-2 border-2 font-sans  min-h-40 text-lg"
                value={userText}
                onChange={(e) => {
                  setUserText(e.target.value);
                }}
              ></textarea>
            ) : data && showInsightArea ? (
              <GenerateInsightTags />
            ) : (
              <textarea
                id="text-area"
                className="p-2 border-2 font-sans  min-h-40 text-lg"
                value="Loading ......"
                disabled
              ></textarea>
            )}
          </div>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            onClick={() => {
              userText && handleSubmit();
              setEditText(!editText);
              setShowInsightArea(!showInsightArea);
            }}
          >
            {editText ? (
              isAnalyzing ? (
                <span>
                  <i>
                    <FontAwesomeIcon
                      className="ml-3 animate-spin"
                      icon={faSpinner}
                    />
                  </i>
                </span>
              ) : (
                <span>
                  Analyze
                  <i className="edit-icon"> </i>
                </span>
              )
            ) : (
              <span>
                Edit Text
                <i className="edit-icon ml-3">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </i>
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2  p-5 items-center">
        <button className="bg-adjective text-black py-2 px-4 rounded m-2 w-48 disabled">
          Adjective
        </button>

        <button className="bg-adverb text-black py-2 px-4 rounded m-2 w-48">
          Adverb
        </button>

        <button className="bg-conjunction text-black py-2 px-4 rounded m-2 w-48 disabled">
          Conjunction
        </button>

        <button className="bg-determiner text-black py-2 px-4 rounded m-2 w-48 disabled">
          Determiner
        </button>

        <button className="bg-noun text-black py-2 px-4 rounded m-2 w-48 disabled">
          Noun
        </button>

        <button className="bg-preposition text-black py-2 px-4 rounded m-2 w-48 disabled">
          Preposition
        </button>

        <button className="bg-pronoun text-black py-2 px-4 rounded m-2 w-48 disabled">
          Pronoun
        </button>

        <button className="bg-verb text-black py-2 px-4 rounded m-2 w-48 disabled">
          Verb
        </button>
      </div>
    </div>
  );
}

export default POS_analyzer;
