"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, login } from "@/utils/user";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion

const passwordSchema = (isRegistering: boolean) =>
  z
    .object({
      username: z.string().min(1, "Username is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: isRegistering
        ? z.string().min(6, "Confirm password must be at least 6 characters")
        : z.string().optional(),
    })
    .refine(
      (data) => {
        if (isRegistering) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }
    );

type FormData = {
  username: string;
  password: string;
  confirmPassword?: string; // Optional because it's only required for registration
};
export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<"Register" | "Login">("Register");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Control form visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordSchema(mode === "Register")),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      let res;
      if (mode === "Register") {
        res = await createUser(data);
        if (res) {
          console.log("User created");
          const loginRes = await login(data);
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
    <div className="min-h-screen flex justify-center items-center text-end relative">
      {!showForm && (
        <motion.div
          className="relative w-full h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }} // Smooth fade-in effect
        >
          <Image
            src="/billionaire.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />

          <motion.div
            className="absolute inset-x-0 bottom-10 flex justify-center text-white text-3xl font-light cursor-pointer"
            whileHover={{ scale: 1.1 }} // Slight bounce effect on hover
            whileTap={{ scale: 0.9 }} // Small shrink effect when tapped
            onClick={() => setShowForm(true)}
          >
            Tap to Start
          </motion.div>
        </motion.div>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Start small & invisible
          animate={{ opacity: 1, scale: 1 }} // Fade in & scale up
          transition={{ duration: 0.5, ease: "easeOut" }} // Smooth effect
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <p className="text-white text-left">
              Username<span className="text-white ml-1">*</span>
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
              Password<span className="text-white ml-1">*</span>
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
                  Confirm Password<span className="text-white ml-1">*</span>
                </p>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </>
            )}

            <p className="text-white text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() =>
                  setMode(mode === "Register" ? "Login" : "Register")
                }
                className="text-blue-500 underline"
              >
                {mode === "Register" ? "Sign In" : "Register"}
              </button>
            </p>
            <button
              type="submit"
              className="w-full h-12 bg-project-primary bg-blue-700 rounded-xl mt-12 font-semibold"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : mode === "Register"
                ? "Register"
                : "Login"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
