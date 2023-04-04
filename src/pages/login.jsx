import { useRouter } from "next/router";
import { useState } from "react";
import { useLogin } from "../hooks/auth/useLogin";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const router = useRouter();
  const onSubmit = () => {
    if (!name || !password) {
      alert("Please enter information");
    } else {
      login(name, password)
        .then((res) => router.push("/profile"))
        .catch((e) => alert(e));
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col gap-2 h-fit">
        <p className="text-2xl font-bold">Login Form</p>
        <label>Username</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-8 px-2 border border-black border-solid rounded w-80"
          placeholder="username"
        />
        <label className="mt-4">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-8 px-2 border border-black border-solid rounded w-80"
          placeholder="password"
          type="password"
        />
        <button
          onClick={onSubmit}
          className="h-10 mt-8 text-white bg-black rounded w-80"
        >
          Login
        </button>
      </div>
    </div>
  );
}
