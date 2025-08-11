import React from "react";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../redux/studentSlice";

const { Search } = Input;

const StudentSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.students.search);

  const handleSearchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 16,
      }}
    >
      <div style={{ maxWidth: 220, width: "100%" }}>
        <Search
          placeholder="Nhập từ khóa tìm kiếm"
          onChange={handleSearchChange}
          value={search}
          allowClear
        />
      </div>
    </div>
  );
};

export default StudentSearch;
