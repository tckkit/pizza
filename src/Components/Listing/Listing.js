import React from "react";
import Sidebar from "./Sidebar";
import Results from "./Results";

export default function Listing() {
  return (
    <div>
      <div className="columns-2 w-row listingSidebarContainer">
        <Sidebar />
        <Results />
      </div>
    </div>
  );
}
