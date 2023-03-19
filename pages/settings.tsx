import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "@/context/DataContext";
import Layout from "@/components/Layout";
import { useSupabase } from "@/utils/supabase/useSupabase";
import { createClient } from "@supabase/supabase-js";
import {
  useUser,
  useSupabaseClient,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";

function Settings() {
  const { table, setTable } = useContext(DataContext);
  const [currentTable, setCurrentTable] = useState("");
  const { tableExists } = useSupabase();
  const session = useSession();

  useEffect(() => {
    console.log("date", table);
  }, [table]);

  const handleChangeTable = async (e: any) => {
    e.preventDefault();
    const table = await tableExists(currentTable);
    if (table) {
      setTable(currentTable);
      localStorage.setItem("table", currentTable);
    } else {
      alert(`table "${currentTable}" does not exist`);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("table");
    setTable("posts_for_bt_demo");
  };

  return (
    <Layout title="Settings">
      <div className="mb-5">
        <p>
          <span className="font-bold">Current Table: </span>
          {table}
        </p>
      </div>
      {/* <form action="#" onSubmit={handleChangeTable}></form> */}
      <div className="flex flex-col items-start justify-start space-y-3 ">
        <label htmlFor="table-name">Input your table name.</label>
        <input
          name="table-name"
          type="text"
          className="p-2 border-4 border-blue-500 rounded"
          onChange={(e) => setCurrentTable(e.target.value)}
        />
        <button
          onClick={handleChangeTable}
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300"
          disabled={!session}
        >
          Change Table
        </button>
        <button onClick={handleReset} className="" disabled={!session}>
          reset
        </button>
      </div>
    </Layout>
  );
}

export default Settings;
