import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createCodelab } from '../../../Routes/codeLabRoutes';
import { useNavigate } from 'react-router-dom';

export default function MyCodeLabs() {
  const navigate = useNavigate();
  const { user , setCodelab } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleCreateClick = () => {
    setShowPopup(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await createCodelab({ email: user.email, title: title });
      
      if (response.status) {
        
        console.log('CodeLab Created:', response);

        setCodelab((prevValue) => (
          {
            ...prevValue, 
            id: response.id,
          }
        ));

        navigate("/developer/documentation/edit");
        // show new codelab.. 
      } else {
        setError(response.message);
        // set timeout.. 5 seconds... 
      }

      setShowPopup(false);
    } catch (error) {
      console.error('Error creating CodeLab:', error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleCreateClick}>
        Create CodeLab
      </button>

      {showPopup && (
        <div className="popup">
          <h3>Create CodeLab</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter CodeLab title"
          />

          <button onClick={handleSubmit}>Create</button>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}


      {error && <div className="text-red-500">{error}</div>}

      {/* show codelabs...  */}

    </div>
  );
}
