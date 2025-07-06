import React, { useState } from 'react';
// import your API service if available
// import { createParty, updateParty } from '../services/PartyService';

const initialState = {
  name: '',
  color: '',
  logoUrl: '',
  description: '',
  // candidates: [], // Optional: implement candidate selection if needed
};

const PartyForm = ({ party, onSubmit }) => {
  const [form, setForm] = useState(party || initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // If you have an API, call createParty or updateParty here
      // await (party ? updateParty(form) : createParty(form));
      if (onSubmit) onSubmit(form);
      alert('Party saved!');
    } catch (err) {
      setError('Failed to save party.');
    }
  };

  return (
    <div className="party-form-container">
      <h2>{party ? 'Edit Party' : 'Add Party'}</h2>
      <form onSubmit={handleSubmit} className="party-form">
        <label>
          Party Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            name="color"
            value={form.color}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Logo URL:
          <input
            type="text"
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        {/* Optionally, add candidate selection here */}
        {error && <div className="error">{error}</div>}
        <button type="submit">{party ? 'Update' : 'Add'} Party</button>
      </form>
    </div>
  );
};

export default PartyForm;

