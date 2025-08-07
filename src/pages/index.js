import React from "react";
import StudentTable from "../components/StudentTable";

function HomePage() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Chào mừng đến với Trang Chủ</h1>
      <p>Quản lý danh sách sinh viên </p>
      <StudentTable />
    </div>
  );
}

export default HomePage;
