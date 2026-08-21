import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineFlow AI Pro Studio",
  description: "AI Multimodal Film Generation Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#060911] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
