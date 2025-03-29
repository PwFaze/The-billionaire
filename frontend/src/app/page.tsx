"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, login } from "@/utils/user";
import { useRouter } from "next/navigation";

const passwordSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
      .optional(), // Make it optional for login
  })
  .refine(
    (data) => {
      if (data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"], // Highlight the confirm password field if validation fails
    }
  );

type FormData = z.infer<typeof passwordSchema>;

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<"Register" | "Login">("Register");
  const [loading, setLoading] = useState(false); // Track loading state
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      let res;
      if (mode === "Register") {
        res = await createUser(data);
        if (res) {
          console.log("User created");
          const loginRes = await login(data); // Rename to avoid conflict
          if (loginRes) {
            console.log("User logged in");
            router.push("/game");
          } else {
            console.error("Error logging in");
          }
        } else {
          console.error("Error creating user");
        }
      } else {
        res = await login(data);
        if (res) {
          console.log("User logged in");
          router.push("/game");
        } else {
          console.error("Error logging in");
        }
      }
    } catch (error) {
      console.error("Error during login or registration", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* {session.user ? (
        <div>
          <div className="absolute inset-0 z-0">
            <Image
              src="/billionaire.png"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <button className="bg-blue-700">Start</button>
          <button
            className="bg-blue-700"
            onClick={() => {
              session.logout();
            }}
          >
            Log out
          </button>
        </div> */}

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <p className="text-white text-left">
            Username
            <span className="text-white ml-1">*</span>
          </p>
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <p className="text-white text-left mt-2">
            Password
            <span className="text-white ml-1">*</span>
          </p>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {mode === "Register" && (
            <>
              <p className="text-white text-left mt-2">
                Confirm Password
                <span className="text-white ml-1">*</span>
              </p>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </>
          )}

          <p className="text-white text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                mode === "Register" ? setMode("Login") : setMode("Register")
              }
              className="text-blue-500 underline"
            >
              {mode === "Register" ? "Sign In" : "Register"}
            </button>
          </p>
          <button
            type="submit"
            className="w-full h-12 bg-project-primary bg-blue-700 rounded-xl mt-12 font-semibold"
            disabled={loading} // Disable the button while loading
          >
            {loading
              ? "Loading..."
              : mode === "Register"
              ? "Register"
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
