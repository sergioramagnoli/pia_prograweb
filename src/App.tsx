import NoteGrid from "./notePage/NoteGrid";
import NoteEditor from "./notePage/NoteEditor";
import Header from "./Header";
import NoteContext from "./notePage/NoteContext";
import { useState } from "react";

function App() {
  const actualNote = useState("");
  return (
    <div>
      <div className="container">
        <NoteContext.Provider value={actualNote}>
          <NoteGrid />
          <div className="w-[70%] mt-auto">
            <Header />
            <NoteEditor />
          </div>
        </NoteContext.Provider>
      </div>
    </div>
  );
}

export default App;
