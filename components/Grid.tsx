import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRouter } from "next/router";

interface RowData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const Grid = ({ posts }: any) => {
  //   const [rowData, setRowData] = useState<RowData[]>([]);
  const [postsData, setPostsData] = useState<any>([]);
  const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
  const [gridColumnApi, setGridColumnApi] = useState<agGrid.ColumnApi | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    console.log("posts", posts);
    const postsWithDate = posts.map((post: any) => {
      const date = new Date(post.published_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}/${month}/${day}`;
      return {
        ...post,
        published_date: formattedDate,
      };
    });
    setPostsData(postsWithDate);
  }, [posts]);

  useEffect(() => {
    const updateGridHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = document.querySelector("header")?.clientHeight ?? 0;
      const gridContainer = document.querySelector(
        ".grid-container"
      ) as HTMLElement;

      if (gridContainer) {
        const gridContainerTop = gridContainer.getBoundingClientRect().top;
        const newHeight = windowHeight - headerHeight - gridContainerTop - 60;
        gridContainer.style.height = `${newHeight}px`;
      }
    };

    updateGridHeight();
    window.addEventListener("resize", updateGridHeight);
    return () => {
      window.removeEventListener("resize", updateGridHeight);
    };
  }, []);

  const columnDefs: agGrid.ColDef[] = [
    { field: "title", filter: "agTextColumnFilter" },
    { field: "slug", filter: "agTextColumnFilter" },
    { field: "id", filter: "agTextColumnFilter" },
    { field: "published_date", filter: "agTextColumnFilter" },
    { field: "author", filter: "agTextColumnFilter" },
    { field: "author_email", filter: "agTextColumnFilter" },
    { field: "description", filter: "agTextColumnFilter" },
    { field: "content", filter: "agTextColumnFilter" },
  ];

  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
  };

  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onPaginationChanged = () => {
    console.log("onPaginationChanged");
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  const onRowClicked = (params: any) => {
    const { slug } = params.data;
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="">
      <div className="ag-theme-alpine grid-container">
        <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563]">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <AgGridReact
          className="ag-grid"
          columnDefs={columnDefs}
          rowData={postsData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={50}
          onPaginationChanged={onPaginationChanged}
          onRowClicked={onRowClicked}
        ></AgGridReact>
        <style jsx global>{`
          .grid-container {
            width: 100%;
          }
          .ag-grid .ag-cell {
            padding: 0.5rem;
            font-size: 1.2rem;
            color: #4b5563;
            border-color: #e5e7eb;
            line-height: 1.5;
            cursor: pointer;
          }
          .ag-grid .ag-header-cell {
            font-weight: 600;
            font-size: 1.2rem;
            color: #374151;
            background-color: #f9fafb;
            border-color: #e5e7eb;
          }
        `}</style>
        {/* <div className="bg-pink-400 h-[200px]">Hi</div> */}
      </div>
    </div>
  );
};

export default Grid;
