import { useEffect, useState } from "react";

import {
  FiEdit,
  FiTrash2,
  FiDownload,
  FiPlus
} from "react-icons/fi";

import toast from "react-hot-toast";

import API from "../../api/axios";

import TableSkeleton from "../../components/common/TableSkeleton";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const Leads = () => {

  const { user } = useAuth();

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [showModal, setShowModal] =
    useState(false);

  const [editingLead, setEditingLead] =
    useState<Lead | null>(null);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      status: "pending",

      source: "Website",

    });


  // FETCH LEADS
  const fetchLeads = async () => {

    try {

      setLoading(true);

      const { data } =
        await API.get("/leads", {

          params: {

            search,

            status,

            source,

            page,

            limit: 5,

          }

        });

      setLeads(data.data);

      setTotalPages(
        data.pagination.totalPages
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch leads"
      );

    } finally {

      setLoading(false);
    }
  };


  // FETCH WHEN FILTER CHANGES
  useEffect(() => {

    const delay =
      setTimeout(() => {

        fetchLeads();

      }, 500);

    return () =>
      clearTimeout(delay);

  }, [search, status, source, page]);


  // RESET PAGE
  useEffect(() => {

    setPage(1);

  }, [search, status, source]);


  // DELETE LEAD
  const deleteLead = async (
    id: string
  ) => {

    try {

      await API.delete(
        `/leads/${id}`
      );

      toast.success(
        "Lead deleted successfully"
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete lead"
      );
    }
  };


  // CREATE / UPDATE LEAD
  const handleSubmit =
    async () => {

      try {

        // UPDATE
        if (editingLead) {

          await API.put(

            `/leads/${editingLead._id}`,

            formData
          );

          toast.success(
            "Lead updated successfully"
          );

        }

        // CREATE
        else {

          await API.post(
            "/leads",
            formData
          );

          toast.success(
            "Lead created successfully"
          );
        }

        fetchLeads();

        setShowModal(false);

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };


  return (

    <DashboardLayout>

      <div className="space-y-6 p-6">

        {/* TOP SECTION */}
        <div
          className="
            flex flex-col md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
        >

          <div>

            <h1
              className="
                text-3xl font-bold
                text-slate-800 dark:text-white
              "
            >
              Leads Management
            </h1>

            <p
              className="
                text-slate-500 mt-1
              "
            >
              Manage all CRM leads
            </p>

          </div>


          <div
            className="
              flex flex-col sm:flex-row
              gap-3
            "
          >

            {/* EXPORT CSV */}
            {
              user?.role === "admin" && (

                <a
                  href="http://localhost:5000/api/leads/export/csv"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex items-center justify-center gap-2
                    bg-green-600 hover:bg-green-700
                    text-white
                    px-5 py-3
                    rounded-2xl
                    shadow-lg
                    font-semibold
                    transition-all duration-300
                    hover:scale-[1.02]
                  "
                >

                  <FiDownload />

                  Export CSV

                </a>

              )
            }


            {/* ADD BUTTON */}
            <button
              onClick={() => {

                setEditingLead(null);

                setFormData({

                  name: "",

                  email: "",

                  status: "pending",

                  source: "Website",

                });

                setShowModal(true);

              }}
              className="
                flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700
                text-white
                px-5 py-3
                rounded-2xl
                shadow-lg
                font-semibold
                transition-all duration-300
                hover:scale-[1.02]
              "
            >

              <FiPlus />

              Add Lead

            </button>

          </div>

        </div>


        {/* FILTERS */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-3
            gap-4
            p-6
            bg-white dark:bg-slate-800
            rounded-2xl
            shadow-lg
          "
        >

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              px-4 py-3 rounded-xl
              border
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
              outline-none
            "
          />


          {/* STATUS FILTER */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              px-4 py-3 rounded-xl
              border
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
            "
          >

            <option value="">
              All Status
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="rejected">
              Rejected
            </option>

          </select>


          {/* SOURCE FILTER */}
          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className="
              px-4 py-3 rounded-xl
              border
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
            "
          >

            <option value="">
              All Sources
            </option>

            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>

          </select>

        </div>


        {/* TABLE */}
        <div
          className="
            bg-white dark:bg-slate-800
            rounded-2xl
            shadow-lg
            p-6
            overflow-x-auto
          "
        >

          {
            loading ? (

              <div className="p-6">

                <TableSkeleton />

              </div>

            ) : leads.length === 0 ? (

              <div className="text-center py-20">

                <h2
                  className="
                    text-2xl font-bold
                    dark:text-white
                  "
                >
                  No Leads Found
                </h2>

              </div>

            ) : (

              <table className="w-full">

                <thead
                  className="
                    bg-slate-100
                    dark:bg-slate-900
                  "
                >

                  <tr>

                    <th className="text-left p-5 dark:text-white">
                      Name
                    </th>

                    <th className="text-left p-5 dark:text-white">
                      Email
                    </th>

                    <th className="text-left p-5 dark:text-white">
                      Status
                    </th>

                    <th className="text-left p-5 dark:text-white">
                      Source
                    </th>

                    <th className="text-left p-5 dark:text-white">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    leads.map((lead) => (

                      <tr
                        key={lead._id}
                        className="
                          border-t
                          dark:border-slate-700
                          hover:bg-slate-50
                          dark:hover:bg-slate-700
                          transition
                        "
                      >

                        <td className="p-5 dark:text-white">
                          {lead.name}
                        </td>

                        <td className="p-5 dark:text-white">
                          {lead.email}
                        </td>

                        <td className="p-5">

                          <span
                            className="
                              px-3 py-1 rounded-full
                              text-sm font-semibold
                              bg-blue-100 text-blue-700
                              capitalize
                            "
                          >
                            {lead.status}
                          </span>

                        </td>

                        <td className="p-5 dark:text-white">
                          {lead.source}
                        </td>

                        <td className="p-5">

                          <div className="flex gap-3">

                            {/* EDIT */}
                            <button
                              onClick={() => {

                                setEditingLead(lead);

                                setFormData({

                                  name: lead.name,

                                  email: lead.email,

                                  status: lead.status,

                                  source: lead.source,

                                });

                                setShowModal(true);

                              }}
                              className="
                                p-3 rounded-xl
                                bg-yellow-100
                                text-yellow-600
                                hover:scale-105
                                transition
                              "
                            >

                              <FiEdit />

                            </button>


                            {/* DELETE */}
                            {
                              user?.role === "admin" && (

                                <button
                                  onClick={() =>
                                    deleteLead(lead._id)
                                  }
                                  className="
                                    p-3 rounded-xl
                                    bg-red-100
                                    text-red-600
                                    hover:scale-105
                                    transition
                                  "
                                >

                                  <FiTrash2 />

                                </button>

                              )
                            }

                          </div>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            )
          }

        </div>


        {/* PAGINATION */}
        <div
          className="
            flex items-center justify-center
            gap-6
          "
        >

          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="
              px-5 py-3 rounded-xl
              bg-slate-200 dark:bg-slate-700
              disabled:opacity-50
              dark:text-white
            "
          >
            Prev
          </button>

          <span
            className="
              font-semibold
              dark:text-white
            "
          >
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="
              px-5 py-3 rounded-xl
              bg-slate-200 dark:bg-slate-700
              disabled:opacity-50
              dark:text-white
            "
          >
            Next
          </button>

        </div>


        {/* MODAL */}
        {
          showModal && (

            <div
              className="
                fixed inset-0
                bg-black/50
                flex items-center
                justify-center
                z-50
              "
            >

              <div
                className="
                  bg-white
                  dark:bg-slate-800
                  rounded-3xl
                  p-8
                  w-full
                  max-w-lg
                  shadow-2xl
                "
              >

                <h2
                  className="
                    text-2xl font-bold mb-6
                    dark:text-white
                  "
                >

                  {
                    editingLead
                      ? "Update Lead"
                      : "Add Lead"
                  }

                </h2>


                {/* NAME */}
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      name: e.target.value

                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    mb-4
                    dark:bg-slate-900
                    dark:border-slate-700
                    dark:text-white
                  "
                />


                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      email: e.target.value

                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    mb-4
                    dark:bg-slate-900
                    dark:border-slate-700
                    dark:text-white
                  "
                />


                {/* STATUS */}
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      status: e.target.value

                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    mb-4
                    dark:bg-slate-900
                    dark:border-slate-700
                    dark:text-white
                  "
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="qualified">
                    Qualified
                  </option>

                  <option value="rejected">
                    Rejected
                  </option>

                </select>


                {/* SOURCE */}
                <select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      source: e.target.value

                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    mb-6
                    dark:bg-slate-900
                    dark:border-slate-700
                    dark:text-white
                  "
                >

                  <option value="Website">
                    Website
                  </option>

                  <option value="Instagram">
                    Instagram
                  </option>

                  <option value="Referral">
                    Referral
                  </option>

                </select>


                {/* BUTTONS */}
                <div
                  className="
                    flex justify-end gap-4
                  "
                >

                  <button
                    onClick={() =>
                      setShowModal(false)
                    }
                    className="
                      px-5 py-3
                      rounded-xl
                      bg-gray-200
                    "
                  >

                    Cancel

                  </button>

                  <button
                    onClick={handleSubmit}
                    className="
                      px-5 py-3
                      rounded-xl
                      bg-blue-600
                      text-white
                    "
                  >

                    {
                      editingLead
                        ? "Update"
                        : "Create"
                    }

                  </button>

                </div>

              </div>

            </div>

          )
        }

      </div>

    </DashboardLayout>
  );
};

export default Leads;