import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [table, setTable] = useState("posts");

  const data = {
    table,
    setTable,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
