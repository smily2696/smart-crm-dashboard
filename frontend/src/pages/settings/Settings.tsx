import DashboardLayout
from "../../components/layout/DashboardLayout";


const Settings = () => {

  return (

    <DashboardLayout>

      <div className="p-6">

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-2xl
            shadow-lg
            p-8
          "
        >

          <h1
            className="
              text-3xl font-bold
              dark:text-white
            "
          >
            Settings Page
          </h1>

          <p className="text-slate-500 mt-2">
            Manage application settings
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Settings;