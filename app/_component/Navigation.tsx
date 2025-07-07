import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Image
                className="h-8 rounded-full"
                src={session.user.image}
                alt={String(session.user.name)}
                referrerPolicy="no-referrer"
                width={32}
                height={32}
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
