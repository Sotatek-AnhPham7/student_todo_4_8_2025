import { useEffect, useState } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import StudentFormModal from "./StudentFormModal";
import {
  columns,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import { useStudents, actions } from "../students";

const StudentTable = () => {
  const [state, dispatch] = useStudents();
  const [formMode, setFormMode] = useState(false);
  const { students, studentInput } = state;
  useEffect(() => {
    dispatch(actions.setStudents([]));
    const fetchStudents = async () => {
      const fetchedStudents = await getStudents();
      dispatch(actions.setStudents(fetchedStudents));
    };
    fetchStudents();
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
      const updatedStudent = async () => {
        try {
          await updateStudent(studentInput);
          dispatch(actions.setStudent());
          dispatch(actions.setStudentInput(null));
          message.success("Cập nhật sinh viên thành công!");
        } catch (error) {
          message.error("Cập nhật sinh viên thất bại!");
          dispatch(actions.setStudentInput(null));
        }
      };
      updatedStudent();
    } else {
      const addedStudent = async () => {
        try {
          const newStudent = await addStudent(studentInput);
          dispatch(actions.setStudentInput(newStudent));
          dispatch(actions.addStudent());
          dispatch(actions.setStudentInput(null));
          message.success("Thêm sinh viên thành công!");
        } catch (error) {
          message.error("Thêm sinh viên thất bại!");
          dispatch(actions.setStudentInput(null));
        }
      };
      addedStudent();
    }
  };

  const handleModalClose = () => {
    setFormMode(false);
  };

  const handleDelete = (student) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc muốn xoá sinh viên ${student.fullName}?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: () => {
        const deletedStudent = async () => {
          try {
            await deleteStudent(student.id);
            dispatch(actions.deleteStudent(student.id));
            message.success("Đã xoá thành công!");
          } catch (error) {
            message.error("Xoá sinh viên thất bại!");
          }
        };
        deletedStudent();
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
