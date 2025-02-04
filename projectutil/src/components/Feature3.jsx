import  { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Paper, Typography, Button } from "@mui/material";

const Feature3 = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Load saved data from Local Storage
    const savedContent = localStorage.getItem("richTextContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    localStorage.setItem("richTextContent", content);
    alert("Content saved!");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", borderRadius: "10px" }}>
        <Typography variant="h5" gutterBottom>
          Rich Text Editor
        </Typography>
        <ReactQuill value={content} onChange={handleChange} modules={modules} formats={formats} />
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: "20px" }}>
          Save
        </Button>
      </Paper>
    </Container>
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
