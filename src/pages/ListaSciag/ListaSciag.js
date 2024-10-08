import "./ListaSciag.scss";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";

const ListaSciag = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="LS-container">
      <Header />
    

      <h2 className="titleLS">Lista Ściąg</h2>
      <div className="subjectFiles">
      {data ? (
        Object.entries(data.files).map(([subject, files]) => (
          <div key={subject} >
            <h3>{subject}</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    {file.split('/').pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default ListaSciag;
