"use client";

import { useGame } from "@/contexts/GameContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Phone from "@/components/game/Phone";
import CurrentSummary from "@/components/game/CurrentSummary";
import OptionBox from "@/components/game/OptionBox";

export default function GamePage() {
  const LOCATION = [
    { id: "bank", label: "ธนาคาร" },
    { id: "stock_market", label: "ตลาดหลักทรัพย์" },
    { id: "gold_shop", label: "ร้านทอง" },
  ];
  const { player, date, global, news } = useGame();
  const [location, setLocation] = useState<string>("home");
  const [energy, setEnergy] = useState<number>(2);
  const [showNews, setShowNews] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden -z-10">
      {location === "home" && (
        <>
          <Image
            src={"/bg.png"}
            alt="Desk"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="group z-10 mt-20 flex flex-col items-center">
            <Phone setShowNews={setShowNews} news={news} />
            <Image
              src={"/wallet.png"}
              alt="Wallet"
              width={75}
              height={100}
              className="transition duration-300 ease-in-out group-hover:shadow-2xl cursor-pointer group-hover:scale-105"
              onClick={() => setLocation("deciding")}
            />
          </div>
        </>
      )}
      {location === "deciding" && (
        <div className="flex flex-col gap-8">
          <CurrentSummary
            date={date}
            balance={player.balance}
            assests={player.assets}
          />
          {LOCATION.map((l) => (
            <OptionBox key={l.id}>{l.label}</OptionBox>
          ))}
        </div>
      )}
    </div>
  );
}
