import Head from "next/head";
import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ParkingImage from "../public/static/parking.png";
import Image from "next/image";

const Home = () => {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const user = allUsers?.find((u) => u.email === email);
    if (user) {
      if (user.password === password) {
        const currentUser = JSON.stringify(user);
        localStorage.setItem("currentUser", currentUser);
        router.push("/vision");
      } else {
        alert("Invalid password");
      }
    } else {
      alert("User not found");
    }
  };
  const handleSignup = () => {
    let allUsers = JSON.parse(localStorage.getItem("users"));
    if (!allUsers) {
      allUsers = [];
    }
    const user = allUsers.find((u) => u.email === email);
    if (user) {
      alert("User already exists");
    } else {
      const newUser = {
        email,
        password,
      };
      allUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(allUsers));
      const currentUser = JSON.stringify(newUser);
      localStorage.setItem("currentUser", currentUser);
      router.push("/vision");
    }
  };
  return (
    <>
      <Head>
        <title> Parkerr: Empower your parking </title>
      </Head>
      <DashboardLayout>
        <div className="h-full w-full flex items-center justify-center p-16">
          <div className="h-full w-full flex items-center justify-center">
            <div className="max-w-md relative flex flex-col h-96 w-96 p-4 rounded-md text-black bg-white">
              <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
                Welcome {authType === "login" && "back"} to{" "}
                <span className="text-[#7747ff]">Parker</span>
              </div>
              <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
                Log in to your account
              </div>
              <div className="flex flex-col gap-3">
                <div className="block relative">
                  <label
                    for="email"
                    className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="block relative">
                  <label
                    for="password"
                    className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                {authType === "login" && (
                  <div>
                    <button className="text-sm text-[#7747ff]">
                      Forgot your password?
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
                  onClick={authType === "login" ? handleLogin : handleSignup}
                >
                  Submit
                </button>
              </div>
              <div className="text-sm text-center mt-[1.6rem]">
                {authType === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  className="text-sm text-[#7747ff]"
                  onClick={() => {
                    if (authType === "login") {
                      setAuthType("signup");
                    } else {
                      setAuthType("login");
                    }
                  }}
                >
                  {authType === "login" ? "Sign up" : "Login"}
                </button>
              </div>
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <Image
              src={ParkingImage.src}
              alt="Parking"
              width={450}
              height={450}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Home;
