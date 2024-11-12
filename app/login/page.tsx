import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LoginPageComponent from "./_components/login-page";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <>
      <LoginPageComponent />
    </>
  );
};

export default LoginPage;
