"use client";

import { User } from "@/Model/user";
import { getUser } from "@/utils/user";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: User | null;
  resetContext: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const path = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  const resetContext = useCallback(async () => {
    const userData = await getUser();
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    window.location.href = "/";
  }, []);

  useEffect(() => {
    const protectRoute = async () => {
      setIsReady(false);

      // if (path === "/" || path === "/login") {
      //   setIsReady(true);
      //   return;
      // }

      // const userObj: User | null = await getUser();
      // if (!userObj) {
      //   router.push("/");
      // }

      // setUser(userObj);

      setIsReady(true);
    };
    protectRoute();
  }, [router, path]);

  return (
    <AuthContext.Provider value={{ user, resetContext, logout }}>
      {isReady ? children : <div>test</div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
