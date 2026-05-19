import { useState, useEffect } from "react";

import API from "../../api/axios";

interface Props {

  open: boolean;

  setOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  fetchLeads: () => void;

  editLead?: any;
}

const LeadModal = ({
  open,
  setOpen,
  fetchLeads,
  editLead
}: Props) => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [status, setStatus] =
    useState("New");

  const [source, setSource] =
    useState("Website");

  useEffect(() => {

    if (editLead) {

      setName(editLead.name);

      setEmail(editLead.email);

      setStatus(editLead.status);

      setSource(editLead.source);
    }

  }, [editLead]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const payload = {
        name,
        email,
        status,
        source
      };

      if (editLead) {

        await API.put(
          `/leads/${editLead._id}`,
          payload
        );

      } else {

        await API.post(
          "/leads",
          payload
        );
      }

      fetchLeads();

      setOpen(false);

    } catch (error) {

      console.log(error);
    }
  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">

          {editLead
            ? "Edit Lead"
            : "Add Lead"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          >

            <option>New</option>

            <option>Qualified</option>

            <option>Pending</option>

            <option>Closed</option>

          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          >

            <option>Website</option>

            <option>Instagram</option>

            <option>Facebook</option>

            <option>LinkedIn</option>

          </select>

          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              className=" bg-white dark:bg-slate-800
    p-6
    rounded-2xl
    shadow-lg
    space-y-6
    transition-all duration-300"
            >

              {editLead
                ? "Update Lead"
                : "Add Lead"}

            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className=" bg-white dark:bg-slate-800
    p-6
    rounded-2xl
    shadow-lg
    space-y-6
    transition-all duration-300"
            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default LeadModal;