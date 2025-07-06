import DateSelector from "@/app/_component/DateSelector";
import ReservationForm from "@/app/_component/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
