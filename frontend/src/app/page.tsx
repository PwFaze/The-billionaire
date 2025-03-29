"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const user = useAuth();
  return (
    <div className="min-h-screen">
      <button className="bg-blue-700">Start</button>
    </div>
  );
}
