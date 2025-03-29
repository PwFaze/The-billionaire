"use client";

import { useGame } from "@/contexts/GameContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const { player, date, global, news } = useGame();
  const [location, setLocation] = useState<string>("");
  const [energy, setEnergy] = useState<number>(2);
  const [showNews, setShowNews] = useState<boolean>(false);

  const router = useRouter();

  return(
  
      <div className="w-full h-screen overflow-hidden -z-10">
        <Image
          src={"/bg_desk.png"}
          alt="Desk"
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {showNews && (
          <div className="absolute top-1/8 left-1/10 bg-white p-4 rounded-xl w-4/5 h-fit border-2 border-gray-300 shadow-lg z-10">
            <h2 className="text-xl text-black font-bold mb-2">News</h2>
            <p className="text-gray-700 mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Tenetur, delectus sed excepturi nulla laudantium non dicta omnis error reprehenderit neque 
              eligendi mollitia similique impedit quam, consequatur, sit quis perspiciatis minus.
            </p>
            <button
              onClick={() => setShowNews(false)}
              className="ml-54 bg-purple-800 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        <div className="absolute top-1/2 left-1/3 group">
          
            <Image
              src={"/computer.png"}
              alt="Game"
              width={175}
              height={100}
              className="transition duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-105"
            />
            <button 
              className="absolute top-1/3 left-1/3 text-black text-xl font-bold text-center cursor-pointer"
              onClick={() => setShowNews(true)}
            >
              Click
            </button>
          
        </div>

        <div className="absolute top-3/5 left-3/4 group">
          <Image
            src={"/wallet.png"}
            alt="Wallet"
            width={75}
            height={100}
            className="transition duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-105"
            // onClick={() => router.push("/")}
          />
        </div>

      </div>
    
  );
}
