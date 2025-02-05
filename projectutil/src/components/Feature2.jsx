import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid, Switch, FormControlLabel } from "@mui/material";

const Feature2 = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setFormData(savedData);
    } else {
      setFormData((prev) => ({ ...prev, id: `USR-${Date.now()}` })); // Generate User ID
    }

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
    setIsFormDirty(false);
  };

  const toggleDarkMode = (event) => {
    setIsDarkMode(event.target.checked);
  };

  const paperStyle = {
    backgroundColor: isDarkMode ? "#000" : "#fff", // Black for dark mode, white for light mode
    color: isDarkMode ? "#fff" : "#000", // White text for dark mode, black text for light mode
    padding: "20px",
    borderRadius: "10px",
    height: "calc(100% + 10px)", // Increased height by 10px
    position: "relative", // Needed for absolute positioning of the button
  };

  const buttonStyle = {
    marginTop: "10px",
  };

  const switchStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  return (
    <Paper elevation={3} className="form-container" style={paperStyle}>
      {/* Dark mode toggle switch */}
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            name="darkModeSwitch"
            color="primary"
          />
        }
        label="Dark Mode"
        style={{ color: isDarkMode ? '#fff' : '#000', ...switchStyle }}
      />

      <Typography variant="h6" gutterBottom>
        User Data Form
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        User ID: {formData.id}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              required
              InputProps={{
                style: { color: isDarkMode ? '#fff' : '#000', backgroundColor: isDarkMode ? '#333' : '#fff' },
              }}
              InputLabelProps={{
                style: { color: isDarkMode ? '#fff' : '#000' },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              size="small"
              required
              InputProps={{
                style: { color: isDarkMode ? '#fff' : '#000', backgroundColor: isDarkMode ? '#333' : '#fff' },
              }}
              InputLabelProps={{
                style: { color: isDarkMode ? '#fff' : '#000' },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              size="small"
              required
              InputProps={{
                style: { color: isDarkMode ? '#fff' : '#000', backgroundColor: isDarkMode ? '#333' : '#fff' },
              }}
              InputLabelProps={{
                style: { color: isDarkMode ? '#fff' : '#000' },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              size="small"
              required
              InputProps={{
                style: { color: isDarkMode ? '#fff' : '#000', backgroundColor: isDarkMode ? '#333' : '#fff' },
              }}
              InputLabelProps={{
                style: { color: isDarkMode ? '#fff' : '#000' },
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={buttonStyle}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default Feature2;
