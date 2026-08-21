import "./globals.css";

export const metadata = {
  title: "CineFlow AI Studio",
  description: "AI Multimodal Video Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#060911] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

