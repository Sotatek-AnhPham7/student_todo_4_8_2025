import { useEffect } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import StudentFormModal from "./StudentFormModal";
import columns from "../services/studentColumns";
import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
  setStudentInput,
  clearStudentInput,
} from "../redux/studentSlice";

const StudentTable = () => {
  const dispatch = useDispatch();
  const { students = [], studentInput } = useSelector(
    (state) => state.students
  );

  // Load danh sách + clear form khi mount
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(clearStudentInput());
  }, [dispatch]);

  // Mở modal thêm mới
  const openAddModal = () => {
    dispatch(setStudentInput({}));
  };

  // Mở modal edit
  const handleEditModal = (student) => {
    dispatch(setStudentInput(student));
  };

  // Submit form (thêm hoặc sửa)
  const handleModalSubmit = async () => {
    try {
      if (studentInput.id) {
        await dispatch(updateStudentAsync(studentInput)).unwrap();
        message.success("Cập nhật sinh viên thành công!");
      } else {
        await dispatch(addStudentAsync(studentInput)).unwrap();
        message.success("Thêm sinh viên thành công!");
      }
    } catch {
      message.error(
        studentInput.id
          ? "Cập nhật sinh viên thất bại!"
          : "Thêm sinh viên thất bại!"
      );
    } finally {
      dispatch(clearStudentInput());
    }
  };

  const handleModalClose = () => {
    dispatch(clearStudentInput());
  };

  // Xoá sinh viên
  const handleDelete = (student) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc muốn xoá sinh viên ${student.fullName}?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await dispatch(deleteStudentAsync(student.id)).unwrap();
          message.success("Đã xoá thành công!");
        } catch {
          message.error("Xoá sinh viên thất bại!");
        }
      },
    });
  };

  const actionColumn = {
    title: "Thao tác",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button
          type="link"
          icon={<EditFilled />}
          onClick={() => handleEditModal(record)}
        />
        <Button
          type="link"
          danger
          icon={<DeleteFilled />}
          onClick={() => handleDelete(record)}
        />
      </Space>
    ),
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={openAddModal}
      >
        Thêm sinh viên
      </Button>

      <Table
        rowKey="id"
        dataSource={students}
        columns={[...columns, actionColumn]}
      />

      <StudentFormModal
        visible={!!studentInput}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default StudentTable;
