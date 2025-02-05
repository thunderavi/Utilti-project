import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Paper, Typography, Button, Box, Divider, FormControlLabel, Switch } from "@mui/material";

const Feature3 = () => {
  const [content, setContent] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    const savedContent = localStorage.getItem("richTextContent");
    if (savedContent) {
      setContent(savedContent);
    }

    const handleBeforeUnload = (event) => {
      if (isEdited) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Do you want to leave without saving?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isEdited]);

  const handleChange = (value) => {
    setContent(value);
    setIsEdited(true);
  };

  const handleSave = () => {
    localStorage.setItem("richTextContent", content);
    setIsEdited(false);
    alert("Content saved!");
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

  const switchStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  return (
    <Paper elevation={3} className="feature3-container" style={paperStyle}>
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

      <Typography variant="h6" className="editor-title">
        ✍ Rich Text Editor
      </Typography>
      <Divider className="divider" />
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="quill-editor"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#fff", // Dark background for dark mode, light for light mode
          color: isDarkMode ? "#fff" : "#000", // White text for dark mode, black text for light mode
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          className="save-button"
          onClick={handleSave}
          style={{
            backgroundColor: isDarkMode ? "#555" : "#3f51b5",
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          💾 Save
        </Button>
      </Box>
    </Paper>
  );
};

// Quill Toolbar Configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const formats = ["header", "bold", "italic", "underline", "list", "bullet", "link"];

export default Feature3;
