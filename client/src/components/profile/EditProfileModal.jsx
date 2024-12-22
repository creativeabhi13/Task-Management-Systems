import React from "react";
import { Modal, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { dataUpdate } from "../../services/apiEndPoint";
import { toast } from "react-toastify";

const EditProfileModal = ({
  open,
  handleClose,
  userData,
  setUserData,
  token,
}) => {
  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      img: userData?.img || "",
    },
    enableReinitialize: true, // This will update form when data state changes
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name should be at least 3 characters"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      img: Yup.string().required("Image is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await dataUpdate(
          `/user/${userData._id}`,
          values,
          token
        );
        if (response.status === 200) {
          setUserData(response.data.user);
          toast.success(response.data.message);
          handleClose(); // Close the modal after success
        }
      } catch (error) {
        console.log("Error updating user:", error);
        toast.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          outline: "none",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="dense"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="dense"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            margin="dense"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            fullWidth
            label="Image"
            variant="outlined"
            margin="dense"
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
            error={formik.touched.img && Boolean(formik.errors.img)}
            helperText={formik.touched.img && formik.errors.img}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "15px" }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;