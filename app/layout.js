import { Source_Sans_3, Zilla_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  weight: "variable",
  subsets: ["latin"]
})

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  weight: "400",
  subsets: ["latin"]
})

export const metadata = {
  title: "HR4U Editor",
  description: "Internal tool to aid in editing HR4U profile pritnouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body
        className={`${sourceSans.variable} ${zillaSlab.variable} antialiased flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
