
import React from "react";
import SearchToChatBar from "./SearchToChatBar";
import { useIsMobile } from "@/hooks/use-mobile";

const WorksheetHero = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6 py-12 text-center md:py-16">
      <h1 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
        Hi there, what are you teaching today?
      </h1>
      <SearchToChatBar className="mx-auto w-full max-w-md md:max-w-xl" />
      
      {!isMobile && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-gray-500">Popular searches:</span>
          {["Math Worksheets", "Writing Prompts", "Science Activities", "Reading Comprehension"].map((tag) => (
            <button
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorksheetHero;
