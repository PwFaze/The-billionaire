import { ButtonHTMLAttributes } from "react";

interface OptionBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function OptionBox({ className, ...props }: OptionBoxProps) {
  return (
    <button
      className={`px-20 py-4 text-3xl cursor-pointer font-extralight bg-white text-black rounded-lg ring-6 ring-amber-300 transition ${className}`}
      {...props}
    />
  );
}
