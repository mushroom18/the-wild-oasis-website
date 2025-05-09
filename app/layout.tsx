import Logo from "./_component/Logo";
import Navigation from "./_component/Navigation";
import "@/app/_styles/globals.css";
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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
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
