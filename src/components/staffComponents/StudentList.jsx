import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../reUsableComponents/Table";
import {
  deleteStudent,
  fetchStudents,
} from "../../../redux/slices/studentSlice";
import { showConfirmationDialog } from "../../util/showConfirmationDialog";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  // console.log(students);

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "age" },
    { Header: "Standard", accessor: "standard" },
  ];
  const handleEdit = (student) => {
    const editUserAction = () =>{
      navigate(`/updateStudent/${student._id}`);
    }
    showConfirmationDialog({
      type:'edit',
      confirmAction: editUserAction,
    })
  };

  const handleDelete = (student) => {
    const deleteUserAction = () => {
      dispatch(deleteStudent(student._id))
        .unwrap()
        .then(() => {
          dispatch(fetchStudents());
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    };
    showConfirmationDialog({
      type: "delete",
      confirmAction: deleteUserAction,
    });
  };

  return (
    <>
      <Table
        data={students}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
};

export default StudentList;
