"use server";

import { revalidatePath } from "next/cache";
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function updateGuestProfile(formData) {
  //console.log("formdata", formData);
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("you must be logged in to update profile");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid national ID");
  }

  const updatedData = { nationalID, countryFlag, nationality };
  //console.log("updateData", updateData);
  await updateGuest(session.user.guestId, updatedData);
  revalidatePath("/accounts/profile");
}

export async function deleteReservation(bookingId) {
  const session = await getServerSession(authOptions);
  if (!session)
    throw new Error("you must be logged in to delete a reservation");

  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("you do not have permission to delete this reservation");

  await deleteBooking(bookingId);
  revalidatePath("/accounts/reservations");
}

export async function updateReservation(formData) {
  //console.log("formdata", formData);
  const bookingId = Number(formData.get("bookingId"));

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("you must be logged in to update reservations");
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("you do not have permission to update this reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const updatedData = { numGuests, observations };
  await updateBooking(bookingId, updatedData);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
