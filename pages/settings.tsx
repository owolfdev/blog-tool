import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "@/context/DataContext";
import Layout from "@/components/Layout";

function Settings() {
  const { table, setTable } = useContext(DataContext);
  const [currentTable, setCurrentTable] = useState("");

  useEffect(() => {
    console.log("date", table);
    setCurrentTable(table);
  }, [table]);

  const handleChangeTable = () => {
    setTable(currentTable);
  };

  return (
    <Layout title="Settings">
      <div className="mb-5">
        <p>
          <span className="font-bold">Current Table: </span>
          {currentTable}
        </p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-3 ">
        <label htmlFor="table-name">Input your table name.</label>
        <input
          name="table-name"
          type="text"
          className="p-2 border-4 border-blue-500 rounded"
          onChange={(e) => setTable(e.target.value)}
        />
        <button
          onClick={handleChangeTable}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300"
        >
          Change Table
        </button>
      </div>
    </Layout>
  );
}

export default Settings;
