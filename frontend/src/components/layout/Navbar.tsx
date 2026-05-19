import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMoon,
  FiSun
} from "react-icons/fi";

import { useTheme }
from "../../context/ThemeContext";

import { useAuth }
from "../../context/AuthContext";


interface Props {
  setOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}


const Navbar = ({
  setOpen
}: Props) => {

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const {
    user,
    logout
  } = useAuth();


  return (

    <header
      className="
        sticky top-0 z-30
        bg-white dark:bg-slate-900
        border-b
        border-slate-200
        dark:border-slate-700
        px-6 py-4
        flex items-center
        justify-between
        transition-all duration-300
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          className="
            lg:hidden
            p-2 rounded-xl
            hover:bg-slate-100
            dark:hover:bg-slate-800
            transition
          "
          onClick={() => setOpen(true)}
        >

          <FiMenu size={24} />

        </button>


        <div
          className="
            hidden md:flex
            items-center
            bg-slate-100
            dark:bg-slate-800
            px-4 py-3
            rounded-2xl
            w-[350px]
          "
        >

          <FiSearch
            className="
              text-slate-500
              dark:text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search leads..."
            className="
              bg-transparent
              outline-none
              ml-3 w-full
              text-sm
              text-slate-700
              dark:text-white
              placeholder:text-slate-400
            "
          />

        </div>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="
            p-3 rounded-xl
            bg-slate-100
            dark:bg-slate-800
            hover:scale-105
            transition
          "
        >

          {
            darkMode
              ? <FiSun size={20} />
              : <FiMoon size={20} />
          }

        </button>


        {/* NOTIFICATIONS */}
        <button
          className="
            relative
            p-3 rounded-xl
            bg-slate-100
            dark:bg-slate-800
            hover:scale-105
            transition
          "
        >

          <FiBell size={20} />

          <span
            className="
              absolute top-2 right-2
              w-2 h-2
              bg-red-500
              rounded-full
            "
          />

        </button>


        {/* PROFILE */}
        <div className="relative group">

          <button
            className="
              flex items-center gap-3
              bg-slate-100
              dark:bg-slate-800
              px-4 py-2
              rounded-2xl
            "
          >

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="
                w-10 h-10
                rounded-full
                object-cover
              "
            />

            <div
              className="
                hidden sm:block
                text-left
              "
            >

              {/* USER NAME */}
              <h3
                className="
                  text-sm font-semibold
                  text-slate-800
                  dark:text-white
                "
              >

                {
                  typeof user?.name === "string"
                    ? user.name
                    : "Guest User"
                }

              </h3>


              {/* ROLE */}
              <p
                className="
                  text-xs
                  text-slate-500
                  capitalize
                "
              >

                {
                  typeof user?.role === "string"
                    ? user.role
                    : "No Role"
                }

              </p>

            </div>

          </button>


          {/* DROPDOWN */}
          <div
            className="
              absolute right-0
              mt-3 w-56
              bg-white
              dark:bg-slate-800
              shadow-2xl
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              opacity-0 invisible
              group-hover:opacity-100
              group-hover:visible
              transition-all
              overflow-hidden
            "
          >

            <button
              className="
                w-full text-left
                px-5 py-4
                hover:bg-slate-100
                dark:hover:bg-slate-700
              "
            >
              My Profile
            </button>


            <button
              className="
                w-full text-left
                px-5 py-4
                hover:bg-slate-100
                dark:hover:bg-slate-700
              "
            >
              Settings
            </button>


            {/* LOGOUT */}
            <button
              onClick={logout}
              className="
                w-full text-left
                px-5 py-4
                text-red-500
                hover:bg-red-50
                dark:hover:bg-slate-700
              "
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;