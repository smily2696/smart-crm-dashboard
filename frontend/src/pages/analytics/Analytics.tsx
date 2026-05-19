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


const Analytics = () => {

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchAnalytics();

  }, []);


  const fetchAnalytics =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get("/leads");

        setLeads(res.data.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // TOTALS
  const totalLeads =
    leads.length;

  const qualified =
    leads.filter(
      (lead) =>
        lead.status === "qualified"
    ).length;

  const pending =
    leads.filter(
      (lead) =>
        lead.status === "pending"
    ).length;

  const rejected =
    leads.filter(
      (lead) =>
        lead.status === "rejected"
    ).length;

  const conversionRate =
    totalLeads > 0
      ? (
          (qualified /
            totalLeads) *
          100
        ).toFixed(1)
      : 0;


  // BAR CHART DATA
  const chartData = [

    {
      name: "Qualified",
      value: qualified
    },

    {
      name: "Pending",
      value: pending
    },

    {
      name: "Rejected",
      value: rejected
    }

  ];


  // PIE CHART DATA
  const pieData = [

    {
      name: "Qualified",
      value: qualified
    },

    {
      name: "Pending",
      value: pending
    },

    {
      name: "Rejected",
      value: rejected
    }

  ];


  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444"
  ];


  // SOURCE ANALYTICS
  const websiteLeads =
    leads.filter(
      (lead) =>
        lead.source === "Website"
    ).length;

  const instagramLeads =
    leads.filter(
      (lead) =>
        lead.source === "Instagram"
    ).length;

  const referralLeads =
    leads.filter(
      (lead) =>
        lead.source === "Referral"
    ).length;


  return (

    <DashboardLayout>

      <div className="space-y-8 p-6">

        {/* TOP CARDS */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          <AnalyticsCard
            title="Total Leads"
            value={totalLeads}
            icon={<FiUsers />}
            color="bg-blue-500"
          />

          <AnalyticsCard
            title="Qualified"
            value={qualified}
            icon={<FiCheckCircle />}
            color="bg-green-500"
          />

          <AnalyticsCard
            title="Pending"
            value={pending}
            icon={<FiClock />}
            color="bg-yellow-500"
          />

          <AnalyticsCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={<FiTrendingUp />}
            color="bg-purple-500"
          />

        </div>


        {/* CHART SECTION */}
        <div
          className="
            grid grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >

          {/* BAR CHART */}
          <div
            className="
              bg-white dark:bg-slate-800
              rounded-2xl
              shadow-lg
              p-6
            "
          >

            <h2
              className="
                text-2xl font-bold
                mb-6 dark:text-white
              "
            >
              Lead Status Analytics
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={chartData}>

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


          {/* PIE CHART */}
          <div
            className="
              bg-white dark:bg-slate-800
              rounded-2xl
              shadow-lg
              p-6
            "
          >

            <h2
              className="
                text-2xl font-bold
                mb-6 dark:text-white
              "
            >
              Lead Distribution
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
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

          </div>

        </div>


        {/* SOURCE ANALYTICS */}
        <div
          className="
            bg-white dark:bg-slate-800
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <h2
            className="
              text-2xl font-bold
              mb-6 dark:text-white
            "
          >
            Lead Sources
          </h2>

          <div
            className="
              grid grid-cols-1
              md:grid-cols-3
              gap-6
            "
          >

            <SourceCard
              title="Website"
              value={websiteLeads}
            />

            <SourceCard
              title="Instagram"
              value={instagramLeads}
            />

            <SourceCard
              title="Referral"
              value={referralLeads}
            />

          </div>

        </div>


        {/* RECENT LEADS */}
        <div
          className="
            bg-white dark:bg-slate-800
            rounded-2xl
            shadow-lg
            p-6
            overflow-x-auto
          "
        >

          <h2
            className="
              text-2xl font-bold
              mb-6 dark:text-white
            "
          >
            Recent Leads
          </h2>

          <table className="w-full">

            <thead>

              <tr
                className="
                  border-b
                  dark:border-slate-700
                "
              >

                <th className="text-left pb-4 dark:text-white">
                  Name
                </th>

                <th className="text-left pb-4 dark:text-white">
                  Email
                </th>

                <th className="text-left pb-4 dark:text-white">
                  Status
                </th>

                <th className="text-left pb-4 dark:text-white">
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

                ) : (

                  leads.slice(0, 5).map((lead) => (

                    <tr
                      key={lead._id}
                      className="
                        border-b
                        dark:border-slate-700
                      "
                    >

                      <td className="py-4 dark:text-white">
                        {lead.name}
                      </td>

                      <td className="py-4 dark:text-white">
                        {lead.email}
                      </td>

                      <td className="py-4">

                        <span
                          className="
                            px-3 py-1
                            rounded-full
                            text-sm
                            bg-green-100
                            text-green-700
                            capitalize
                          "
                        >
                          {lead.status}
                        </span>

                      </td>

                      <td className="py-4 dark:text-white">
                        {lead.source}
                      </td>

                    </tr>

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


const AnalyticsCard = ({
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


const SourceCard = ({
  title,
  value
}: {
  title: string;
  value: number;
}) => {

  return (

    <div
      className="
        p-6
        rounded-2xl
        bg-slate-100
        dark:bg-slate-700
      "
    >

      <h3
        className="
          text-lg font-semibold
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          text-4xl font-bold
          mt-3 dark:text-white
        "
      >
        {value}
      </p>

    </div>
  );
};


export default Analytics;