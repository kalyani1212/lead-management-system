import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [leads, setLeads] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "Call",
  });

  const getLeads = async () => {
    const response = await axios.get("http://localhost:5000/leads");
    setLeads(response.data);
  };

  useEffect(() => {
    getLeads();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addLead = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/leads", formData);

    setFormData({
      name: "",
      phone: "",
      source: "Call",
    });

    getLeads();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/leads/${id}`, {
      status,
    });

    getLeads();
  };

  const deleteLead = async (id) => {
    await axios.delete(`http://localhost:5000/leads/${id}`);

    getLeads();
  };

  return (
    <div className="container">

      <h1>Lead Management System</h1>

      <form onSubmit={addLead} className="form">

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option>Call</option>
          <option>WhatsApp</option>
          <option>Field</option>
        </select>

        <button type="submit">Add Lead</button>

      </form>

      <div className="lead-list">

        {leads.map((lead) => (

          <div key={lead.id} className="card">

            <h3>{lead.name}</h3>

            <p>{lead.phone}</p>

            <p>Source: {lead.source}</p>

            <select
              value={lead.status}
              onChange={(e) =>
                updateStatus(lead.id, e.target.value)
              }
            >
              <option>Interested</option>
              <option>Not Interested</option>
              <option>Converted</option>
            </select>

           <button onClick={() => deleteLead(lead.id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;