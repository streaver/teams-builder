import { LoginRequestBody } from "@/components/sign-in/SignInModal";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1000;

const AUTH_SECRET = process.env.AUTH_SECRET;

export const AUTHENTICATION_COOKIE_NAME = "SID";
const AUTHENTICATION_COOKIE_OPTIONS = {
  sameSite: true,
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  path: "/",
  maxAge: FOUR_HOURS_IN_MS,
};

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  // Makes sure it's a POST request.
  if (req.method !== "POST") {
    return res.status(404).json({ message: "not found" });
  }

  // Grabs the credentials from the request body.
  const credentials = JSON.parse(req.body) as LoginRequestBody;

  // Check if the password matches the auth secret
  if (credentials.password !== AUTH_SECRET) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  // Sets the authentication cookie
  res.setHeader(
    "Set-Cookie",
    serialize(AUTHENTICATION_COOKIE_NAME, "true", AUTHENTICATION_COOKIE_OPTIONS)
  );

  res.status(204).send(null);
};

export default signIn;
