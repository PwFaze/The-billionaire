"use client";
import { useGame } from "@/contexts/GameContext";
import { ILocation } from "@/Model/game";
import { useState } from "react";

interface ReturnButtonProps {
  returnLocation: ILocation;
  setLocation: (returnLocation: ILocation) => void;
}

export default function ReturnButton({
  returnLocation,
  setLocation,
}: ReturnButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const game = useGame();

  const handleReturnClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    game.setDate((prev) => prev + 1);
    setLocation(returnLocation);
  };

  const handleCancel = () => {
    setShowConfirm(false); // Close the confirmation modal
  };

  return (
    <div className="relative">
      <button
        onClick={handleReturnClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Return
      </button>

      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4 text-center">แน่ใจมั้ย?</h2>
            <p className="mb-4 text-center">
              คุณยืนยันที่จะกลับไปหน้าเริ่มต้น ซึ่งหมายถึงการเริ่มวันใหม่
              ธุรกรรมต่าง ๆ ที่ทำไปจะไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
