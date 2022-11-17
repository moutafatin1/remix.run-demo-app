import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getUserById } from "./models/user.server";

const sessionSecret = process.env.SESSION_SECRET
invariant(sessionSecret,"SESSION_SECRET must be set")

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
    maxAge : 60*60*24*7
  },
});
const USER_SESSION_KEY = "userId";

export function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(request: Request): Promise<string | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);

  if (user) return user;

  throw await logout(request);
}

export async function requireUserId(request: Request): Promise<string> {
  const userId = await getUserId(request);

  if (!userId) {
    throw redirect("/login");
  }

  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);

  if (user) return user;

  throw await logout(request);
}


export async function createUserSession({request,userId,redirectTo}:{request:Request,userId:string,redirectTo:string}) {

  const session = await getSession(request)
  
  session.set(USER_SESSION_KEY,userId)
  return redirect(redirectTo,{
    headers : {
      "Set-Cookie" : await sessionStorage.commitSession(session)
    }
  })

}



export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
