"use client";

export default function RootLayoutNav({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-bg text-white">{children}</main>
    </>
  );
}
