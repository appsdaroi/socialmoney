import { getCsrfToken, getSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";
import { useRouter } from 'next/router';

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password)
      return toast.error("Preencha os campos corretamente!");

    signIn("credentials", { redirect: false, username, password }).then(
      ({ error, status, ok, url }) => {
        console.log(error, status, ok, url);

        if (!ok) return toast.error(error);
        router.push("/");
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-screen gap-2 bg-primary-500"
    >
      <div className="flex flex-col items-start w-full max-w-[75%]  text-white">
        <label className="mb-1 text-sm">Usuário</label>
        <input
          className="w-full p-2 bg-transparent border border-white rounded"
          name="username"
          type="text"
        />
      </div>

      <div className="flex flex-col items-start w-full max-w-[75%] text-white">
        <label className="mb-1 text-sm">Senha</label>
        <input
          className="w-full p-2 bg-transparent border border-white rounded"
          name="password"
          type="password"
        />
      </div>

      <button
        type="submit"
        className="bg-white w-full mt-3 max-w-[75%] rounded py-2"
      >
        Entrar
      </button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
