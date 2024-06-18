import { Inter } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "세계시민 퀴즈",
  description: "응애",
};

export default function RootLayout({ children }) {
  const value = {
    ripple: true,
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider value={value}>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
