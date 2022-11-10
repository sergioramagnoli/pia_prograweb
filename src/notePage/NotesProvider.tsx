import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import { Note } from "../assets/types";
import { getAllNotes } from "../apiCalls";

let NoteContext: Context<{
  id: string;
  setId: Dispatch<SetStateAction<string>>;
}>;

// @ts-ignore
function NotesProvider({ children }) {
  const [id, setId] = useState("");

  NoteContext = createContext({ id, setId });

  return (
    <NoteContext.Provider value={{ id, setId }}>
      {children}
    </NoteContext.Provider>
  );
}

export { NoteContext };
export default NotesProvider;
