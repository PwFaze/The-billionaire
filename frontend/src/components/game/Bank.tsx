import { useState } from "react";
import OptionBox from "./OptionBox";
import { useGame } from "@/contexts/GameContext";
import CurrentSummary from "./CurrentSummary";
import ReturnButton from "./ReturnButton";
import { ILocation, LOCATION } from "@/Model/game";

interface BankProps {
  showInsufficient: boolean;
  setShowInsufficient: (status: boolean) => void;
  setLocation: (location: ILocation) => void;
  handleBankDeposit: (amount: number) => void;
  handleBonds: (amount: number, bondName: string) => void;
  handleDebtInstruments: (amount: number, debtName: string) => void;
}

export default function Bank({
  showInsufficient,
  setShowInsufficient,
  setLocation,
  handleBankDeposit,
  handleBonds,
  handleDebtInstruments,
}: BankProps) {
  const game = useGame();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showBonds, setShowBonds] = useState(false);
  const [showDebt, setShowDebt] = useState(false);

  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  // State to track individual bond and debt instrument amounts
  const [bondAmounts, setBondAmounts] = useState<{ [key: string]: number }>({});
  const [debtAmounts, setDebtAmounts] = useState<{ [key: string]: number }>({});

  const handleDeposit = () => {
    if (depositAmount > game.player.balance) {
      setShowInsufficient(true);
      return;
    }
    if (depositAmount > 0) {
      handleBankDeposit(depositAmount);
      setShowDeposit(false);
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount > game.player.assets.bank) {
      setShowInsufficient(true);
      return;
    }
    if (withdrawAmount > 0) {
      handleBankDeposit(-withdrawAmount); // Negative for withdrawal
      setShowWithdraw(false);
    }
  };

  const handleBondAmountChange = (bondName: string, amount: number) => {
    setBondAmounts((prev) => ({
      ...prev,
      [bondName]: amount,
    }));
  };

  const handleDebtAmountChange = (debtName: string, amount: number) => {
    setDebtAmounts((prev) => ({
      ...prev,
      [debtName]: amount,
    }));
  };
  console.log(game.player);
  return (
    <div className="flex flex-col items-center text-black relative gap-8">
      <CurrentSummary
        balance={game.player.balance}
        assets={game.player.assets}
      />
      <OptionBox
        onClick={() => {
          setShowDeposit(true); // Show deposit modal
        }}
      >
        ฝากเงิน
      </OptionBox>
      <OptionBox
        onClick={() => {
          setShowWithdraw(true); // Show withdraw modal
        }}
      >
        ถอนเงิน
      </OptionBox>
      <OptionBox
        onClick={() => {
          setShowBonds(true); // Show bonds modal
        }}
      >
        การลงทุนในพันธบัตร และหุ้นกู้
      </OptionBox>
      <OptionBox
        onClick={() => {
          setShowDebt(true);
        }}
      >
        การลงทุนในตราสารหนี้
      </OptionBox>
      {/* <Image src={"/bank.png"} alt="bank" width={200} height={100} /> */}

      {showDeposit && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg w-96">
            <h2 className="text-2xl mb-4">ฝากเงิน</h2>
            <input
              type="number"
              min={0}
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="p-2 mb-4 w-full border rounded"
              placeholder="Amount to deposit"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDeposit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Deposit
              </button>
              <button
                onClick={() => {
                  setShowInsufficient(false);
                  setShowDeposit(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
            {showInsufficient && (
              <span className="text-red-500 text-center">
                เงินสดของคุณน้อยกว่าเงินที่คุณต้องการฝาก
              </span>
            )}
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">ถอนเงิน</h2>
            <input
              type="number"
              min={0}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              className="p-2 mb-4 w-full border rounded"
              placeholder="Amount to withdraw"
            />
            <div className="flex justify-between">
              <button
                onClick={handleWithdraw}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Withdraw
              </button>
              <button
                onClick={() => {
                  setShowInsufficient(false);
                  setShowWithdraw(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
            {showInsufficient && (
              <span className="text-red-500 text-center">
                ยอดเงินในธนาคารน้อยกว่าที่ต้องการถอน โปรดลองใหม่ภายหลัง
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bonds Modal */}
      {showBonds && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">การลงทุนในพันธบัตร และหุ้นกู้</h2>
            <div className="space-y-4 mb-4">
              <h3 className="font-semibold">Available Bonds:</h3>
              {game.global.bonds?.map((bond) => (
                <div key={bond.name} className="border-b py-2">
                  <p className="font-medium">{bond.name}</p>
                  <p>Type: {bond.type}</p>
                  <p>Price: {bond.price}</p>
                  <input
                    type="number"
                    min={0}
                    value={bondAmounts[bond.name] || 0}
                    onChange={(e) =>
                      handleBondAmountChange(bond.name, Number(e.target.value))
                    }
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Amount to invest"
                  />
                  <button
                    onClick={() =>
                      handleBonds(bondAmounts[bond.name] || 0, bond.name)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Invest in {bond.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              {showInsufficient && (
                <span className="text-red-500">เงินสดของคุณไม่พอ!!</span>
              )}
              <button
                onClick={() => {
                  setShowInsufficient(false);
                  setShowBonds(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debt Modal */}
      {showDebt && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">การลงทุนในตราสารหนี้</h2>
            <div className="space-y-4 mb-4">
              <h3 className="font-semibold">Available Debt Instruments:</h3>
              {game.global.debtInstruments?.map((debt) => (
                <div key={debt.name} className="border-b py-2">
                  <p className="font-medium">{debt.name}</p>
                  <p>Type: {debt.type}</p>
                  <p>Price: {debt.price}</p>
                  <input
                    type="number"
                    min={0}
                    value={debtAmounts[debt.name] || 0}
                    onChange={(e) =>
                      handleDebtAmountChange(debt.name, Number(e.target.value))
                    }
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Amount to invest"
                  />
                  <button
                    onClick={() =>
                      handleDebtInstruments(
                        debtAmounts[debt.name] || 0,
                        debt.name
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Invest in {debt.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              {showInsufficient && (
                <span className="text-red-500">เงินสดของคุณไม่พอ!!</span>
              )}
              <button
                onClick={() => {
                  setShowInsufficient(false);
                  setShowDebt(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ReturnButton returnLocation={LOCATION[5]} setLocation={setLocation} />
    </div>
  );
}
