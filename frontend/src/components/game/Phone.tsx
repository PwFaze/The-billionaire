import { INews } from "@/Model/game";
import React, { useState } from "react";

interface PhoneProps {
  news: INews[];
  setShowNews: (show: boolean) => void;
}

const Phone = ({ news, setShowNews }: PhoneProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePhone = () => {
    setIsExpanded((prev) => !prev);
    setShowNews(!isExpanded); // Correctly toggle showNews
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
          className="w-4/5 h-3/5 text-center text-black flex justify-center items-center bg-gray-200 mx-auto mt-6 rounded-lg overflow-hidden"
          onClick={(e) => isExpanded && e.stopPropagation()} // Stops propagation only when expanded
        >
          {isExpanded ? (
            <div className="w-full h-full overflow-y-scroll">
              {news.map((n, index) => (
                <div className="collapse text-start collapse-arrow" key={index}>
                  <input type="checkbox" className="peer" />
                  <h1 className="collapse-title text-black">{n.date}</h1>
                  <div className="collapse-content overflow-y-auto">
                    <p>{n.description}</p>
                  </div>
                </div>
              ))}
              <div className="collapse collapse-arrow text-start p-2 text-black">
                <input type="checkbox" className="peer" />
                <h1 className="collapse-title text-black font-extrabold">
                  Date
                </h1>
                <div className="collapse-content overflow-y-auto">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Tenetur, delectus sed excepturi nulla laudantium non dicta
                    omnis error reprehenderit neque eligendi mollitia similique
                    impedit quam, consequatur, sit quis perspiciatis minus.
                  </p>
                </div>
              </div>
              <div className="collapse collapse-arrow text-start p-2 text-black">
                <input type="checkbox" className="peer" />
                <h1 className="collapse-title text-black font-extrabold">
                  Date
                </h1>
                <div className="collapse-content overflow-y-auto">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Tenetur, delectus sed excepturi nulla laudantium non dicta
                    omnis error reprehenderit neque eligendi mollitia similique
                    impedit quam, consequatur, sit quis perspiciatis minus.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>Click!!</p>
          )}
        </div>
        <div className="w-3/5 h-1/4 bg-gray-700 mx-auto mt-4 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Phone;
