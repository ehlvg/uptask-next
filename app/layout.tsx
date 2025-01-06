import type { Metadata } from "next";
import { Jersey_25, Fira_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const jersey25 = Jersey_25({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
});
const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uptask",
  description: "Next version of the local-first task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jersey25.variable} ${firaMono.variable} antialiased`}
        style={{ height: "100vh" }}
      >
        <Theme
          accentColor={"orange"}
          radius={"full"}
          panelBackground="translucent"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
