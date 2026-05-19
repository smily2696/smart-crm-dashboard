import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const [open, setOpen] =
    useState(false);

  return (

    <div
      className="
        flex min-h-screen
        bg-slate-100
        dark:bg-slate-900
      "
    >

      {/* SIDEBAR */}
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      {/* RIGHT SIDE */}
      <div
        className="
          flex-1 flex flex-col
          lg:ml-72
          min-h-screen
        "
      >

        {/* NAVBAR */}
        <Navbar setOpen={setOpen} />

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            overflow-y-auto
          "
        >

          {children}

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;