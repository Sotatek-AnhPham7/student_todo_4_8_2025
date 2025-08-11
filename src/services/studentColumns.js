const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
    render: (dob) => new Date(dob).toLocaleDateString(), // format dd/mm/yyyy
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
  },
];

export default columns;
