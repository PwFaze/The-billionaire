"use client";
import { CreateOrLoginUserRequest } from "@/Model/user";
import { createUser, login } from "@/utils/user";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Mode = "Register" | "Login";

export default function LoginPage() {
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

  return (
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
  );
}
