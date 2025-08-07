// import { StudentContext, useStudents } from "../students";

//fetch ...
// const [students, studentInput] = state;

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
  },
];

// let idCounter = students.length + 1;

// export function addStudent(student) {
//   const newStudent = {
//     ...student,
//     id: idCounter.toString(),
//   };
//   idCounter++;
//   students.push(newStudent);
//   return newStudent;
// }

// export function updateStudent(id, updatedStudent) {
//   const index = students.findIndex((s) => s.id === id);
//   if (index !== -1) {
//     students[index] = { ...students[index], ...updatedStudent };
//     return true;
//   }
//   return false;
// }

// export function deleteStudent(id) {
//   const index = students.findIndex((s) => s.id === id);
//   if (index !== -1) {
//     students.splice(index, 1);
//     return true;
//   }
//   return false;
// }

function getStudents() {
  const student = [
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      email: "vana@example.com",
      dob: "2002-01-01",
      class: "CNTT1",
    },
    {
      id: "2",
      fullName: "Trần Thị B",
      email: "thib@example.com",
      dob: "2002-02-15",
      class: "CNTT2",
    },
    {
      id: "3",
      fullName: "Lê Văn C",
      email: "vanc@example.com",
      dob: "2001-12-10",
      class: "CNTT1",
    },
  ];
  return student;
}

export { columns, getStudents };
