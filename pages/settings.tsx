import React, { useEffect, useContext } from "react";
import { DataContext } from "@/context/DataContext";

function Settings() {
  const { table, setTable } = useContext(DataContext);

  useEffect(() => {
    console.log("date", table);
  }, []);

  return <div>Settings</div>;
}

export default Settings;
