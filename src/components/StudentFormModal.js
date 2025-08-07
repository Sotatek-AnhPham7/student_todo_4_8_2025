import React, { act, useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useStudents, actions } from "../students";

const StudentFormModal = ({ visible, onClose, onSubmit }) => {
  const [state, dispatch] = useStudents();
  const { studentInput } = state;
  const [form] = Form.useForm();
  const formMode = React.useMemo(() => {
    return studentInput && studentInput.id ? "edit" : "add";
  }, [studentInput]);

  useEffect(() => {
    if (visible) {
      if (studentInput) {
        form.setFieldsValue(studentInput);
      } else {
        form.resetFields();
      }
    }
  }, [visible, studentInput]);

  const handleFinish = (values) => {
    if (formMode === "edit") {
      onSubmit({ ...studentInput, ...values });
    } else {
      onSubmit(values);
    }
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={formMode === "edit" ? "Cập nhật học sinh" : "Thêm học sinh"}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={formMode === "edit" ? "Cập nhật" : "Thêm"}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          onChange={(e) => {
            dispatch(actions.setStudentInputName(e.target.value));
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          onChange={(e) => {
            dispatch(actions.setStudentInputEmail(e.target.value));
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          onChange={(e) => {
            dispatch(actions.setStudentInputDob(e.target.value));
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lớp"
          name="class"
          rules={[{ required: true, message: "Vui lòng nhập lớp!" }]}
          onChange={(e) => {
            dispatch(actions.setStudentInputClass(e.target.value));
          }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentFormModal;
