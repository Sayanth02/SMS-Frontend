import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFee, fetchFees } from "../../../redux/slices/feesSlice";
import FeeHistoryTable from "./FeeHistoryTable";
import { useNavigate } from "react-router-dom";
import { showConfirmationDialog } from "../../util/showConfirmationDialog";

const FeeHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fees = useSelector((state) => state.fees.fees);
  const loading = useSelector((state) => state.fees.loading);
  const error = useSelector((state) => state.fees.error);

  useEffect(() => {
    dispatch(fetchFees());
  }, [dispatch]);
  console.log(fees);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!fees || fees.length === 0) {
    return <p>No fee history available.</p>;
  }
  const userRole = localStorage.getItem("role");

  const handleEdit = (fees) => {
    const editFeeAction = () => {
      navigate(`/editFees/${fees._id}`);
    };
    showConfirmationDialog({
      type: "edit",
      confirmAction: editFeeAction,
    });
  };
  const handleDelete = (fees) => {
    const deleteFeesAction = () => {
      dispatch(deleteFee(fees._id))
        .unwrap()
        .then(() => {
          alert("Fee history Deleted successfully!");
          dispatch(fetchFees());
        })
        .catch((err) => {
          alert(`Error: ${err}`);
        });
    };
    showConfirmationDialog({
      type: "delete",
      confirmAction: deleteFeesAction,
    });
  };
  return (
    <div className="p-5">
      <FeeHistoryTable
        userRole={userRole}
        data={fees}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default FeeHistory;
