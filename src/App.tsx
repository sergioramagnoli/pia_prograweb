import NoteGrid from "./notePage/NoteGrid";
import NoteEditor from "./notePage/NoteEditor";
import NotesProvider from "./notePage/NotesProvider";

function App() {
  return (
    <NotesProvider>
      <div id="container">
        <NoteGrid />
        <NoteEditor />
      </div>
    </NotesProvider>
  );
}

export default App;
