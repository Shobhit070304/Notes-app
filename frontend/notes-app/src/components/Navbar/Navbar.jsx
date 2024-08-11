import React, { useState, useEffect } from "react";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch, getAllNotes }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  function handleSetSearch(e) {
    const updatedQuery = e.target.value;
    setSearchQuery(updatedQuery);
  }

  function onLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSearchNote(searchQuery);
    }
  }

  function handleSearch(e) {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  }

  function handleClearSearch() {
    setSearchQuery("");
    onSearchNote(""); // Optionally call to reset the search results
  }

  useEffect(()=>{
    if (searchQuery === "") {
      getAllNotes();
    } else {
      onSearchNote(searchQuery);
    }
  },[searchQuery])




  return (
    <div className=" bg-[#87ceeb] flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-black text-xl font-medium py-2">Notes</h2>
      {userInfo && (
        <SearchBar
          value={searchQuery}
          onChange={handleSetSearch}
          handleSearch={handleSearch}
          OnClearSearch={handleClearSearch}
          handleKeyDown={handleKeyDown}
        />
      )}
      <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
