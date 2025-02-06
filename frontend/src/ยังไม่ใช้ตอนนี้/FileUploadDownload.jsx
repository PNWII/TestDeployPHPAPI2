import { useState, useEffect } from "react";
import axios from "axios";

const FileUploadDownload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Fetch files
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost/TestPHP-API2/backend/getFiles.php");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost/TestPHP-API2/backend/uploadFile.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.success || response.data.error);
      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Handle file download
  const handleDownload = (id) => {
    window.location.href = `http://localhost/TestPHP-API2/backend/downloadFile.php?id=${id}`;
  };

  return (
    <div>
      <h1>File Upload and Download</h1>

      {/* Upload Section */}
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Download Section */}
      <h2>Available Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.file_name}
            <button onClick={() => handleDownload(file.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadDownload;
