import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../../redux/slices/userSlice";
import Table from "../reUsableComponents/Table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { showConfirmationDialog } from "../../util/showConfirmationDialog";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log("Users in component:", users);
  const columns = [
    { Header: "Name", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
  ];
  const handleEdit = (user) => {
    const editUserAction = () => {
      navigate(`/updateUser/${user._id}`);
    };
    showConfirmationDialog({
      type: "edit",
      confirmAction: editUserAction,
    });
  };

  const handleDelete = (user) => {
    const deleteUserAction = () => {
      dispatch(deleteUser(user._id))
        .unwrap()
        .then(() => {
          dispatch(fetchUsers());
        })
        .catch((error) => {
          Swal.fire("Error", `Error: ${error.message}`, "error");
        });
    };

    showConfirmationDialog({
      type: "delete",
      confirmAction: deleteUserAction,
    });
  };

  return (
    <div>
      <Table
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserList;
