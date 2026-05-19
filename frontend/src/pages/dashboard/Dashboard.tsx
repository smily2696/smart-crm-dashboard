import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import API
from "../../api/axios";

import {
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiTrendingUp
} from "react-icons/fi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";


interface Lead {

  _id: string;

  name: string;

  email: string;

  status: string;

  source: string;
}


interface Stats {

  totalLeads: number;

  qualified: number;

  pending: number;

  conversionRate: number;
}


const Dashboard = () => {

  const [stats, setStats] =
    useState<Stats>({

      totalLeads: 0,

      qualified: 0,

      pending: 0,

      conversionRate: 0

    });

  const [recentLeads, setRecentLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH DASHBOARD DATA
  useEffect(() => {

    fetchDashboardData();

  }, []);


  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);


        // FETCH STATS
        const statsRes =
          await API.get(
            "/dashboard/stats"
          );

        setStats(
          statsRes.data.stats
        );


        // FETCH RECENT LEADS
        const leadsRes =
          await API.get(
            "/leads?page=1&limit=5&sort=latest"
          );

        setRecentLeads(
          leadsRes.data.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // BAR CHART DATA
  const analyticsData = [

    {
      name: "Total",
      value: stats.totalLeads
    },

    {
      name: "Qualified",
      value: stats.qualified
    },

    {
      name: "Pending",
      value: stats.pending
    }

  ];


  // PIE CHART DATA
  const pieData = [

    {
      name: "Qualified",
      value: stats.qualified
    },

    {
      name: "Pending",
      value: stats.pending
    }

  ];


  const COLORS = [
    "#22c55e",
    "#facc15"
  ];


  return (

    <DashboardLayout>

      <div className="space-y-8 p-6">

        {/* KPI CARDS */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          <DashboardCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={<FiUsers />}
            color="bg-blue-500"
          />

          <DashboardCard
            title="Qualified"
            value={stats.qualified}
            icon={<FiCheckCircle />}
            color="bg-green-500"
          />

          <DashboardCard
            title="Pending"
            value={stats.pending}
            icon={<FiClock />}
            color="bg-yellow-500"
          />

          <DashboardCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={<FiTrendingUp />}
            color="bg-purple-500"
          />

        </div>


        {/* ANALYTICS SECTION */}
        <div
          className="
            grid grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >

          {/* BAR CHART */}
          <div
            className="
              xl:col-span-2
              bg-white dark:bg-slate-800
              p-6
              rounded-2xl
              shadow-lg
            "
          >

            <h2
              className="
                text-2xl font-bold
                mb-6 dark:text-white
              "
            >
              Analytics Overview
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={analyticsData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* PIE CHART + ACTIVITIES */}
          <div
            className="
              bg-white dark:bg-slate-800
              p-6
              rounded-2xl
              shadow-lg
            "
          >

            <h2
              className="
                text-2xl font-bold
                mb-6 dark:text-white
              "
            >
              Lead Status
            </h2>

            <div className="h-64">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >

                    {
                      pieData.map(
                        (_, index) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[index]
                            }
                          />

                        )
                      )
                    }

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>


            {/* RECENT ACTIVITY */}
            <div className="mt-6 space-y-4">

              <Activity
                text={`${stats.totalLeads} total leads`}
              />

              <Activity
                text={`${stats.qualified} qualified leads`}
              />

              <Activity
                text={`${stats.pending} pending leads`}
              />

              <Activity
                text={`${stats.conversionRate}% conversion rate`}
              />

            </div>

          </div>

        </div>


        {/* RECENT LEADS TABLE */}
        <div
          className="
            bg-white dark:bg-slate-800
            rounded-2xl
            shadow-lg
            p-6
            overflow-x-auto
          "
        >

          <div
            className="
              flex items-center
              justify-between
              mb-6
            "
          >

            <h2
              className="
                text-2xl font-bold
                dark:text-white
              "
            >
              Recent Leads
            </h2>


            <a
              href="http://localhost:5000/api/leads/export/csv"
              target="_blank"
              className="
                bg-blue-600 hover:bg-blue-700
                text-white
                px-5 py-3
                rounded-2xl
                shadow-lg
              "
            >
              Export CSV
            </a>

          </div>


          <table className="w-full">

            <thead>

              <tr
                className="
                  text-left
                  border-b
                  dark:border-slate-700
                "
              >

                <th className="pb-4 dark:text-white">
                  Name
                </th>

                <th className="pb-4 dark:text-white">
                  Email
                </th>

                <th className="pb-4 dark:text-white">
                  Status
                </th>

                <th className="pb-4 dark:text-white">
                  Source
                </th>

              </tr>

            </thead>


            <tbody>

              {
                loading ? (

                  <tr>

                    <td
                      colSpan={4}
                      className="
                        py-10
                        text-center
                        dark:text-white
                      "
                    >
                      Loading...
                    </td>

                  </tr>

                ) : recentLeads.length === 0 ? (

                  <tr>

                    <td
                      colSpan={4}
                      className="
                        py-10
                        text-center
                        dark:text-white
                      "
                    >
                      No leads found
                    </td>

                  </tr>

                ) : (

                  recentLeads.map((lead) => (

                    <TableRow
                      key={lead._id}
                      name={lead.name}
                      email={lead.email}
                      status={lead.status}
                      source={lead.source}
                    />

                  ))

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};


const DashboardCard = ({
  title,
  value,
  icon,
  color
}: any) => {

  return (

    <div
      className="
        bg-white dark:bg-slate-800
        rounded-2xl
        shadow-lg
        p-6
        flex items-center justify-between
      "
    >

      <div>

        <p className="text-gray-500">
          {title}
        </p>

        <h2
          className="
            text-4xl font-bold
            mt-2 dark:text-white
          "
        >
          {value}
        </h2>

      </div>


      <div
        className={`
          ${color}
          text-white
          p-4 rounded-2xl
          text-3xl
        `}
      >
        {icon}
      </div>

    </div>
  );
};


const Activity = ({
  text
}: {
  text: string;
}) => {

  return (

    <div
      className="
        p-4 rounded-2xl
        bg-slate-100 dark:bg-slate-700
        dark:text-white
      "
    >
      {text}
    </div>
  );
};


const TableRow = ({
  name,
  email,
  status,
  source
}: any) => {

  return (

    <tr
      className="
        border-b dark:border-slate-700
        hover:bg-slate-50
        dark:hover:bg-slate-700
        transition
      "
    >

      <td className="py-4 dark:text-white">
        {name}
      </td>

      <td className="py-4 dark:text-white">
        {email}
      </td>

      <td className="py-4">

        <span
          className="
            bg-green-100
            text-green-700
            px-3 py-1
            rounded-full
            text-sm capitalize
          "
        >
          {status}
        </span>

      </td>

      <td className="py-4 dark:text-white">
        {source}
      </td>

    </tr>
  );
};

export default Dashboard;