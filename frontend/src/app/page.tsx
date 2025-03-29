"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useGame } from "@/contexts/GameContext";
import { CreateOrLoginUserRequest } from "@/Model/user";
import { createUser, login } from "@/utils/user";
import { Mode } from "fs";
import { div } from "motion/react-client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Home() {
  const session = useAuth();
  const [mode, setMode] = useState<Mode>("Register");
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateOrLoginUserRequest>({});
  const onSubmit: SubmitHandler<CreateOrLoginUserRequest> = async (data) => {
    if (mode === "Register") {
      const res = await createUser(data);
      if (res) {
        console.log("User created");
      } else {
        console.error("Error creating user");
      }
    } else {
      const res = await login(data);
      if (res) {
        console.log("User created");
      } else {
        console.error("Error creating user");
      }
    }
  };
  console.log(session.user, session);
  return (
    <div className="min-h-screen">
      {session.user ? (
        <div className="">
          <button className="bg-blue-700">Start</button>
          <button
            className="bg-blue-700"
            onClick={() => {
              session.logout();
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-4"
          >
            <button
              onClick={() =>
                mode === "Register" ? setMode("Login") : setMode("Register")
              }
              className="text-blue-500 underline"
            >
              {mode === "Register" ? "Sign In" : "Register"}
            </button>
            <p className="text-black text-left">
              Username
              <span className="text-black ml-1">*</span>
            </p>
            <input
              type="text"
              {...register("username")}
              placeholder=""
              className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
            />

            <p className="text-black text-left mt-2">
              Password
              <span className="text-black ml-1">*</span>
            </p>
            <input
              type="password"
              {...register("password")}
              placeholder=""
              className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
            />
            <button
              type="submit"
              className="w-full h-12 bg-project-primary rounded-xl mt-12 font-semibold text-black"
            >
              {mode === "Register" ? "Register" : "Login"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
