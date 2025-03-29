import { CreateOrLoginUserRequest, User } from "@/Model/user";
import { AxiosResponse } from "axios";
import { apiClient } from "./axios";

export const createUser = async (
  req: CreateOrLoginUserRequest
): Promise<User | null> => {
  try {
    const { username, password } = req;
    const res: AxiosResponse<User> = await apiClient.post(`/user/`, {
      username: username,
      password: password,
      email: "feze2013@hotmail.com",
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userID = localStorage.getItem("userId");
    if (!userID) {
      console.error("No user ID found");
      return null;
    }
    const res: AxiosResponse<User> = await apiClient.get(`/user/${userID}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const login = async (
  req: CreateOrLoginUserRequest
): Promise<User | null> => {
  try {
    const res: AxiosResponse = await apiClient.post("/user/login", {
      username: req.username,
      password: req.password,
    });

    localStorage.setItem("userId", res.data.id);

    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};