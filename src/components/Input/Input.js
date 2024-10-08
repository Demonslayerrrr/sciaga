import { useState } from "react";
import axios from "axios";  // Install axios if not already installed
import "./Input.scss"

const Input = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Get the first file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !title || !subject) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a FormData object to send the file and other data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("subject", subject);

    try {
      // Send the form data to Flask API
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="input-container">
      <form className="input" onSubmit={handleSubmit}>
        <h2>Dodaj ściągę</h2>

        <div className="title">
          <label htmlFor="titleInput">Tytuł ściągi</label>
          <input
            type="text"
            id="titleInput"
            placeholder="Wpisz tytuł ściągi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="subject">
          <label htmlFor="subjectSelect">Wybierz przedmiot</label>
          <select
            id="subjectSelect"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">-- Wybierz przedmiot --</option>
            <option value="Biologia">Biologia</option>
            <option value="Geografia">Geografia</option>
            <option value="Chemia">Chemia</option>
            <option value="Historia">Historia</option>
          </select>
        </div>

        <div>
          <input type="file" accept="text/plain" onChange={handleFileChange} />
        </div>

        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default Input;
