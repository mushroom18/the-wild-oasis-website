import Logo from "./component/Logo";
import Navigation from "./component/Navigation";

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>copyright</footer>
      </body>
    </html>
  );
}
