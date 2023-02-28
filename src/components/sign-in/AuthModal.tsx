import React, { useState, ChangeEvent } from "react";

const PRIVATE_KEY = process.env.NEXT_PUBLIC_APP_SECRET || "";

type Props = {
  setShowModal: (v: boolean) => void;
};

export const AuthModal = (props: Props) => {
  const [password, setPassword] = useState("");
  const [hasPasswordsError, setHasPasswordError] = useState(false);

  const handleClick = () => {
    handlePassword();
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handlePassword();
    }
  };

  const handlePassword = () => {
    if (PRIVATE_KEY.length === 0 || PRIVATE_KEY != password) {
      setHasPasswordError(true);
      return;
    }

    props.setShowModal(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasPasswordError(false);
    setPassword(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 ">
      <div
        className="w-1/4 bg-white rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-2.5 flex justify-center transition ease-in-out delay-100 ">
          <h4 className="m-0 text-gray-500">Welcome</h4>
        </div>
        <div className="p-2.5 flex justify-center ">
          <input
            className="w-full px-4 py-2 text-gray-500 border rounded-lg focus:outline-blue-600 bg-gray-50 "
            placeholder="Password"
            type="password"
            required
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={password}
          />
        </div>
        {hasPasswordsError && (
          <span className="flex justify-center text-sm text-red-600">
            Wrong password
          </span>
        )}
        <div className="p-2.5 flex justify-center shadow-xl bg-white rounded-3xl">
          <button
            onClick={handleClick}
            className="text-gray-500 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150 ..."
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
