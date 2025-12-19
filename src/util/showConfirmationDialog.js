import Swal from "sweetalert2";

// A utility function to show the confirmation dialog
export const showConfirmationDialog = ({
  type = "delete", // Default type is delete
  confirmAction,
  buttonText = "Yes, do it!", 
}) => {
  let title = "Are you sure?";
  let text = "This action cannot be undone!";

  // Customize message for specific actions
  if (type === "edit") {
    title = "Confirm Edit";
    text = "Are you sure you want to edit this item?";
  } else if (type === "delete") {
    title = "Confirm Deletion";
    text = "You won't be able to revert this deletion!";
  } else if (type === "logout") {
    title = "Confirm Logout";
    text = "Are you sure you want to log out?";
  }

  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: buttonText, 
  }).then((result) => {
    if (result.isConfirmed) {
      confirmAction(); 

      
      if (type === "delete") {
        Swal.fire("Success!", "Action completed successfully.", "success");
      } else if (type === "logout") {
        Swal.fire(
          "Logged out",
          "You have been logged out successfully.",
          "success"
        );
      }
    }
  });
};
