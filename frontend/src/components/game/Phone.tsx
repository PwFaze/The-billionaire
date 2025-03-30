import { useGame } from "@/contexts/GameContext";
import { INews } from "@/Model/game";
import React, { useState } from "react";

interface PhoneProps {
  news: INews[];
}

const Phone = ({ news}: PhoneProps) => {
  const game = useGame();
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePhone = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        onClick={togglePhone}
        className={`w-48 h-96 bg-gray-800 rounded-3xl cursor-pointer transition-all duration-300 ease-in-out ${
          isExpanded ? "w-[38vh] h-[76vh] rounded-xl" : ""
        }`}
      >
        <div
          className="w-4/5 h-4/5 text-center text-black flex justify-center items-center bg-gray-200 mx-auto mt-6 rounded-lg overflow-hidden"
          onClick={(e) => isExpanded && e.stopPropagation()} // Stops propagation only when expanded
        >
          {isExpanded ? (
            <div className="w-full h-full overflow-y-scroll">
              {news.filter((n) => n.date < game.date).length > 0 ? (
                news
                  .filter((n) => n.date < game.date)
                  .map((n, index) => (
                    <div
                      className="collapse text-start collapse-arrow p-2 text-black"
                      key={index}
                    >
                      <input type="checkbox" className="peer" />
                      <h1 className="collapse-title text-black font-extrabold">
                        Day {n.date}
                      </h1>
                      <div className="collapse-content overflow-y-auto">
                        <p>{n.description}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500 p-4">
                  No news available.
                </p>
              )}
            </div>
          ) : (
            <p>Click!!</p>
          )}
        </div>
        <div className="w-3/5 h-1/12 bg-gray-700 mx-auto mt-4 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Phone;
