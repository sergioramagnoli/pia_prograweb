import { createContext } from "react";

const NoteContext = createContext<[string, (actualNote: string) => void]>([
  "",
  () => {},
]);

export default NoteContext;
