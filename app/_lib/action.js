"use server";

import { revalidatePath } from "next/cache";
import { updateGuest } from "./data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

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
