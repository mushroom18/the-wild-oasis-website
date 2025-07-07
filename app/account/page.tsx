import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user?.name}!
    </h2>
  );
}
