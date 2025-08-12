import Nav from "../../componenets/nav";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Nav />

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
