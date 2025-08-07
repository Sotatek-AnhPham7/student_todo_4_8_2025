import React from "react";
import StudentTable from "../components/StudentTable";
import Search from "antd/es/transfer/search";
import StudentSearch from "../components/StudentSearch";

function HomePage() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Chào mừng đến với Trang Chủ</h1>
      <p>Quản lý danh sách sinh viên </p>
      <StudentSearch />
      <StudentTable />
    </div>
  );
}

export default HomePage;
