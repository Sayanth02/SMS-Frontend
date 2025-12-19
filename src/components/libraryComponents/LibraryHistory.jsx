import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LibraryHistoryTable from "./LibraryHistoryTable";
import {
  deleteLibrary,
  fetchLibrary,
  updateLibrary,
} from "../../../redux/slices/librarySlice";
import { useNavigate } from "react-router-dom";
import { showConfirmationDialog } from "../../util/showConfirmationDialog";

const LibraryHistory = () => {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library.libraries);
  const loading = useSelector((state) => state.fees.loading);
  const error = useSelector((state) => state.fees.error);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!library || library.length === 0) {
    return <p>No fee history available.</p>;
  }

  const handleEdit = (library) => {
    const editLibraryAction = () => {
      navigate(`/updateLibrary/${library._id}`);
    };
    showConfirmationDialog({
      type: "edit",
      confirmAction: editLibraryAction,
    });
  };

  const handleDelete = (library) => {
    const deleteFeesAction = () => {
      dispatch(deleteLibrary(library._id))
        .unwrap()
        .then(() => {
          dispatch(fetchLibrary());
        })
        .catch((error) => {
          console.error("Failed to update status:", error);
        });
    };
    showConfirmationDialog({
      type: "delete",
      confirmAction: deleteFeesAction,
    });
  };

  const handleStatusChange = (id, status) => {
    console.log(`${id},${status}`);
    dispatch(
      updateLibrary({
        id,
        libraryData: { status },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchLibrary());
      })
      .catch((error) => {
        console.error("Failed to update status:", error);
      });
  };

  return (
    <>
      <LibraryHistoryTable
        data={library}
        onEdit={handleEdit}
        onDelete={handleDelete}
        userRole={userRole}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};

export default LibraryHistory;
