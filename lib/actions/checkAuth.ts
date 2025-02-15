import { useSession } from "next-auth/react";
export const checkAuth = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return true;
  }
};
