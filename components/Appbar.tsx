"use client";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export const Appbar = () => {
  const route = useRouter();
  const session = useSession();
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="font-bold text-2xl">Payments App</div>
      <div className="flex">
        <div className="mr-4">
          <button
            onClick={() => {
              signIn();
            }}
          >
            SignIn
          </button>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Signout
          </button>
        </div>
        <div className="rounded-full bg-gray-200 h-12 w-12 flex justify-center items-center">
          U
        </div>
      </div>
      {JSON.stringify(session)}
    </div>
  );
};
