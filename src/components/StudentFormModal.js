import { useEffect, useMemo } from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStudentInput,
  updateStudentInputField,
} from "../redux/studentSlice";
import dayjs from "dayjs";

const StudentFormModal = ({ visible, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const studentInput = useSelector(selectStudentInput);
  const [form] = Form.useForm();

  const formMode = useMemo(
    () => (studentInput && studentInput.id ? "edit" : "add"),
    [studentInput]
  );

  useEffect(() => {
    if (visible) {
      if (studentInput) {
        form.setFieldsValue({
          ...studentInput,
          dob: studentInput.dob ? dayjs(studentInput.dob) : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, studentInput, form]);

  const handleFinish = (values) => {
    const payload = {
      ...studentInput,
      ...values,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
    };
    onSubmit(payload);
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
        >
          <Input
            onChange={(e) =>
              dispatch(
                updateStudentInputField({
                  field: "fullName",
                  value: e.target.value,
                })
              )
            }
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            onChange={(e) =>
              dispatch(
                updateStudentInputField({
                  field: "email",
                  value: e.target.value,
                })
              )
            }
          />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(date, dateString) =>
              dispatch(
                updateStudentInputField({
                  field: "dob",
                  value: dateString,
                })
              )
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Lớp"
          name="class"
          rules={[{ required: true, message: "Vui lòng nhập lớp!" }]}
        >
          <Input
            onChange={(e) =>
              dispatch(
                updateStudentInputField({
                  field: "class",
                  value: e.target.value,
                })
              )
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentFormModal;
