import React, { useState } from "react";
import { Input } from "antd";
import { useStudents, actions } from "../students";

const { Search } = Input;

const StudentSearch = () => {
  const [state, dispatch] = useStudents();
  const { search } = state;

  const handleSearchChange = (e) => {
    dispatch(actions.setSearchValue(e.target.value));
    dispatch(actions.setSearchStudents()); // Nếu cần tìm kiếm ngay khi nhập
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "16px",
      }}
    >
      <div style={{ maxWidth: "220px", width: "100%" }}>
        <Search
          placeholder="Nhập từ khóa tìm kiếm"
          onChange={handleSearchChange}
          value={search}
          // onSearch={(value) => {
          //   console.log("Search submitted:", value);
          //   dispatch(actions.setSearchStudents());
          // }} // Tìm kiếm sau khi nhấn tìm kiếm
        />
      </div>
    </div>
  );
};

export default StudentSearch;
