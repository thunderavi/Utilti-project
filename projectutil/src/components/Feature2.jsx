import  { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

const Feature2 = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    // Load saved data from Local Storage
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setFormData(savedData);
    } else {
      setFormData((prev) => ({ ...prev, id: `USR-${Date.now()}` })); // Generate User ID
    }

    // Warn user if they try to leave with unsaved changes
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  const handleChange = (e) => {
    setIsFormDirty(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("User data saved!");
    setIsFormDirty(false); // Reset unsaved changes warning
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", borderRadius: "10px" }}>
        <Typography variant="h5" gutterBottom>
          User Data Form
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          User ID: {formData.id}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} margin="normal" required />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Feature2;
