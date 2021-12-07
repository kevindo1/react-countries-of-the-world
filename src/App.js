import './App.css';
import React, { useState, useEffect } from 'react';
import { getCountries } from './services/countries.js';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  function filterCountries() {
    return countries.filter((country) => {
      return (
        country.name.includes(query) && (country.continent === continent || continent === 'All')
      );
    });
  }
  return (
    <div className="App">
      <h1>Country Roads</h1>
      <input
        placeholder="Search Countries"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <select value={continent} onChange={(e) => setContinent(e.target.value)}>
        <option value="All">All</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      {filterCountries().map((country) => (
        <p key={country.id}>
          <img src={`https://flagcdn.com/16x12/${country.iso2.toLowerCase()}.png`} />
          {country.name} : {country.continent}{' '}
        </p>
      ))}
    </div>
  );
}

export default App;
