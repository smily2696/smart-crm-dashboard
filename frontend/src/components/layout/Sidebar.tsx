import {
  NavLink
} from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiBarChart2
} from "react-icons/fi";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Sidebar = ({
  open,
  setOpen
}: Props) => {

  return (

    <>

      {/* MOBILE OVERLAY */}
      {
        open && (

          <div
            className="
              fixed inset-0 bg-black/40
              z-40 lg:hidden
            "
            onClick={() => setOpen(false)}
          />

        )
      }

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white dark:bg-slate-800
          border-r dark:border-slate-700
          transition-all duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >

        <div className="p-6">

          <h1
            className="
              text-3xl font-bold
              text-blue-600
            "
          >
            Smart CRM
          </h1>

        </div>

        <nav className="px-4 space-y-2">

          <NavItem
            to="/dashboard"
            icon={<FiHome />}
            text="Dashboard"
          />

          <NavItem
            to="/leads"
            icon={<FiUsers />}
            text="Leads"
          />

          <NavItem
            to="/analytics"
            icon={<FiBarChart2 />}
            text="Analytics"
          />

        </nav>

      </aside>

    </>
  );
};

const NavItem = ({
  to,
  icon,
  text
}: any) => {

  return (

    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3
        px-5 py-4 rounded-2xl
        font-semibold transition-all

        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
        }
      `}
    >

      <span className="text-xl">
        {icon}
      </span>

      {text}

    </NavLink>
  );
};

export default Sidebar;