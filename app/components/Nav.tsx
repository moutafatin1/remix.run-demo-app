import { NavLink } from "@remix-run/react";
import { fn } from "~/utils";

type NavProps = {
  userId: string | null;
};

export const Nav = ({ userId }: NavProps) => {
  return (
    <nav className="item-center  mt-8 flex  justify-center gap-4">
      {userId ? (
        <>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              fn(
                "rounded-full bg-violet-400 px-6 py-2 font-medium text-white transition-all hover:-translate-y-2 active:scale-90",
                isActive && "bg-violet-500"
              )
            }
            end
          >
            Expenses
          </NavLink>
          <NavLink
            to="/expenses/new"
            className={({ isActive }) =>
              fn(
                "rounded-full bg-violet-400 px-6 py-2 font-medium text-white transition-all hover:-translate-y-2 active:scale-90",
                isActive && "bg-violet-500"
              )
            }
          >
            New Expense
          </NavLink>
        </>
      ) : (
        <div className="flex items-center justify-start gap-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              fn(
                "rounded-full bg-violet-400 px-6 py-2 font-medium text-white transition-all hover:-translate-y-2 active:scale-90",
                isActive && "bg-violet-500"
              )
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              fn(
                "rounded-full bg-violet-400 px-6 py-2 font-medium text-white transition-all hover:-translate-y-2 active:scale-90",
                isActive && "bg-violet-500"
              )
            }
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};
