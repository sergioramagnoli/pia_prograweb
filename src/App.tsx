import NoteGrid from "./notePage/NoteGrid";
import NoteEditor from "./notePage/NoteEditor";
import Header from "./Header";
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Note } from "./assets/types";
import { getAllNotes } from "./apiCalls";

/*
 I am creating NoteContext here because I need to define it
 ang give a default value using the React useState types,
 which are only available to use within React components.
*/

let NoteContext: Context<{
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  updatedAt: string;
  setUpdatedAt: Dispatch<SetStateAction<string>>;
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}>;

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [notes, setNotes] = useState([] as Note[]);

  useEffect(() => {
    console.log("Just saying I'm changing");
    getAllNotes().then((notes: Note[]) => {
      setNotes(notes);
    });
  }, []);

  // context, so notes can be modified in every component
  NoteContext = createContext({
    title,
    setTitle,
    body,
    setBody,
    id,
    setId,
    updatedAt,
    setUpdatedAt,
    notes,
    setNotes,
  });

  return (
    <NoteContext.Provider
      value={{
        title,
        setTitle,
        body,
        setBody,
        id,
        setId,
        updatedAt,
        setUpdatedAt,
        notes,
        setNotes,
      }}
    >
      <div>
        <div className="container">
          <NoteGrid />
          <div className="w-[70%] mt-auto">
            <Header />
            <NoteEditor />
          </div>
        </div>
      </div>
    </NoteContext.Provider>
  );
}

export { NoteContext };
export default App;
