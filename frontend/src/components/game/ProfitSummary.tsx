"use client";
import { usePathname } from "next/navigation";

interface ProfitSummaryProps {
  principal: number;
  balance: number;
}

export default function ProfitSummary({
  principal,
  balance,
}: ProfitSummaryProps) {
  const profit = balance - principal;
  const pathname = usePathname();
  const profitPercentage = principal !== 0 ? (profit / principal) * 100 : 0;

  const getSummary = (profit: number): string => {
    switch (true) {
      case profit === 0:
        return "ท่านเป็นนักลงทุนที่มีการบริหารจัดการความเสี่ยงได้ดี แม้ว่าจะไม่ได้กำไรมาก แต่ท่านก็สามารถรักษาเงินลงทุนให้ไม่ขาดทุน ซึ่งแสดงถึงการมีวิจารณญาณและการตัดสินใจที่ระมัดระวังในการเลือกลงทุน";

      case profit > 0 && profit <= 10:
        return "ท่านทำกำไรเล็กน้อยในกรณีนี้ ซึ่งแสดงถึงความระมัดระวังและการทำงานอย่างต่อเนื่อง การลงทุนที่แม้จะไม่ได้กำไรอย่างมหาศาล แต่ก็เป็นกำไรที่มั่นคง ซึ่งแสดงถึงการมีวินัยในการลงทุนและความสามารถในการตัดสินใจที่ดี";

      case profit > 10:
        return "ท่านสามารถทำกำไรได้มากในสถานการณ์นี้ ซึ่งแสดงให้เห็นถึงความเข้าใจแนวโน้มการลงทุนและการตัดสินใจที่ถูกต้องในเวลาที่เหมาะสม ท่านสามารถใช้ประโยชน์จากโอกาสที่เกิดขึ้นในตลาดได้อย่างเต็มที่ ความสามารถในการรับความเสี่ยงและการคิดวิเคราะห์ที่ดีทำให้ท่านเก็บเกี่ยวผลตอบแทนที่สูงได้";

      case profit < 0 && profit >= -10:
        return "ท่านอาจจะต้องเผชิญกับการขาดทุนเล็กน้อย แต่ท่านก็สามารถเรียนรู้จากประสบการณ์และปรับปรุงการลงทุนในครั้งต่อไป โดยไม่ให้เกิดผลกระทบที่รุนแรงต่อพอร์ตการลงทุน ซึ่งแสดงถึงการเรียนรู้จากความผิดพลาดและไม่ยอมแพ้";

      case profit < -10:
        return "ท่านอาจต้องเผชิญกับการขาดทุนที่มีผลกระทบอย่างชัดเจนต่อการลงทุนในระยะสั้น แต่ก็เป็นโอกาสที่ท่านสามารถเรียนรู้จากข้อผิดพลาดและปรับกลยุทธ์การลงทุนให้ดีขึ้นในอนาคต การยอมรับความเสี่ยงและทำความเข้าใจในตลาดเป็นสิ่งสำคัญ";

      default:
        return "ไม่สามารถประเมินสถานะการลงทุนได้";
    }
  };

  return (
    <div className="bg-white rounded-4xl text-center flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-4">
      <h1 className="text-4xl font-extrabold">สรุปกำไร</h1>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินต้น</h2>
        <h2>{principal.toLocaleString()}</h2>
      </div>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินคงเหลือ</h2>
        <h2>{balance.toLocaleString()}</h2>
      </div>
      <div className="py-8 text-5xl font-extrabold flex justify-between w-full">
        <h1 className={profit >= 0 ? "text-green-800" : "text-red-800"}>
          กำไร
        </h1>
        <h1 className={profit >= 0 ? "text-green-800" : "text-red-800"}>
          {profit.toLocaleString()} ({profitPercentage.toFixed(2)}%)
        </h1>
      </div>

      {pathname === "/end" && <p className="">{getSummary(profit)}</p>}
    </div>
  );
}
