import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export type LoginRequestBody = {
  password: string;
};

export const SignInModal = () => {
  const [hasPasswordsError, setHasPasswordError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const credentials = Object.fromEntries(formData) as LoginRequestBody;

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        setHasPasswordError(true);
        return;
      }

      router.push("/");
    } catch (e) {
      toast.error(
        "Oops, something went wrong. Please check your internet connection and try again"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dam-blue-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-xs gap-4 px-4 py-8 text-sm bg-white shadow-lg sm:max-w-sm rounded-xl"
      >
        <div className="flex items-center gap-2">
          <Image
            src={"/dam.png"}
            width={32}
            height={32}
            alt={"An image of a dam"}
          />
          <span>Dam</span>
        </div>
        <input
          className="w-full px-4 py-2 border rounded-lg text-dam-gray-500 focus:outline-dam-blue-400 bg-dam-gray-50"
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        {hasPasswordsError && (
          <span className="flex justify-center text-sm text-dam-red-600">
            Wrong password
          </span>
        )}
        <button
          type="submit"
          className="w-full py-2 text-white bg-dam-blue-400 rounded-xl hover:bg-dam-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
