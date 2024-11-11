import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransaction } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan == "premium") {
    return true;
  }
  const currentMonthTransactions = await getCurrentMonthTransaction();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
