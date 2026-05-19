import API from "../api/axios";

export const getLeadsAPI = async (
  page = 1,
  search = "",
  status = "",
  source = ""
) => {

  const { data } = await API.get(
    `/leads?page=${page}&search=${search}&status=${status}&source=${source}`
  );

  return data;
};


export const createLeadAPI = async (
  leadData: any
) => {

  const { data } = await API.post(
    "/leads",
    leadData
  );

  return data;
};


export const updateLeadAPI = async (
  id: string,
  leadData: any
) => {

  const { data } = await API.put(
    `/leads/${id}`,
    leadData
  );

  return data;
};


export const deleteLeadAPI = async (
  id: string
) => {

  const { data } = await API.delete(
    `/leads/${id}`
  );

  return data;
};