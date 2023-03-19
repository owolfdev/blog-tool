import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [table, setTable] = useState(null);

  useEffect(() => {
    const storedSetting = localStorage.getItem("table");
    if (storedSetting !== null) {
      setTable(storedSetting);
    } else {
      localStorage.setItem("table", "posts_for_bt_demo");
      setTable("posts_for_bt_demo");
    }
  }, []);

  const data = {
    table,
    setTable,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
