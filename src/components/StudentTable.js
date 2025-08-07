import { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import StudentFormModal from "./StudentFormModal";
import { columns, getStudents } from "../services/studentService";
import { useStudents, actions } from "../students";

const StudentTable = () => {
  const [state, dispatch] = useStudents();
  const [formMode, setFormMode] = useState(false);
  const { students, studentInput } = state;
  useEffect(() => {
    dispatch(actions.setStudents(getStudents()));
    dispatch(actions.setStudentInput(null));
  }, []);

  const openAddModal = () => {
    dispatch(actions.setStudentInput({}));
    setFormMode(true);
  };

  const handleEditModal = (student) => {
    dispatch(actions.setStudentInput(student));
    setFormMode(true);
  };

  const handleModalSubmit = () => {
    if (studentInput.id) {
      dispatch(actions.setStudent());
      setFormMode(false);
      console.log("Cập nhật sinh viên:", students);
      message.success("Cập nhật sinh viên thành công!");
    } else {
      dispatch(actions.addStudent());
      setFormMode(false);
      message.success("Thêm sinh viên thành công!");
    }
  };

  const handleModalClose = () => {
    setFormMode(false);
    dispatch(actions.setStudentInput(null));
  };

  const handleDelete = (student) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc muốn xoá sinh viên ${student.fullName}?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: () => {
        dispatch(actions.deleteStudent(student.id));
        message.success("Đã xoá thành công!");
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
        dataSource={students.map((s) => ({ ...s, key: s.id }))}
        columns={[...columns, actionColumn]}
      />

      <StudentFormModal
        visible={formMode}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default StudentTable;
