import axios from "axios";
const SERVER_URL = "http://localhost:3000";

export const getNoteById = async (noteId: string) => {
  const res = await axios.get(SERVER_URL + "/note/" + noteId);
  return res.data;
};

export const getAllNotes = async () => {
  const res = await axios.get(SERVER_URL + "/notes");
  return res.data;
};

export const createNote = async (title: string, body: string) => {
  const res = await axios.post(SERVER_URL + "/note", {
    title,
    body,
  });
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  return await axios.delete(SERVER_URL + "/note/" + noteId);
};

export const patchNote = async (
  title: string,
  body: string,
  noteId: string
) => {
  return axios.patch(SERVER_URL + "/note/" + noteId, {
    title,
    body,
  });
};
