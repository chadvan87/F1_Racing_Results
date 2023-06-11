import React, { useState, useEffect } from 'react';

const F1Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('driver_name');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch and set the JSON data
  useEffect(() => {
    fetch('/f1_results.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearchTermChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  useEffect(() => {
    filterData();
  }, [searchCriteria, searchTerm, data]);

  const filterData = () => {
    const searchValue = searchTerm.toLowerCase();

    const filteredItems = data.filter((item) => {
      switch (searchCriteria) {
        case 'all':
          return (
            item.driver_name.toLowerCase().includes(searchValue) ||
            item.nationality.toLowerCase().includes(searchValue) ||
            item.car.toLowerCase().includes(searchValue) ||
            item.pts.toLowerCase().includes(searchValue)
          );
        case 'driver_name':
          return item.driver_name.toLowerCase().includes(searchValue);
        case 'nationality':
          return item.nationality.toLowerCase().includes(searchValue);
        case 'car':
          return item.car.toLowerCase().includes(searchValue);
        case 'points':
          return item.pts.toLowerCase().includes(searchValue);
        default:
          return item.driver_name.toLowerCase().includes(searchValue);
      }
    });

    setFilteredData(filteredItems);
  };

  return (
    <div>
      <h1>F1 Ranking 2023</h1>
      <div>
        <h2>Enter your search term in the input box</h2>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search..." />
      </div>
      <div>
        <h2>Choose a Criteria to Search</h2>
        <select value={searchCriteria} onChange={handleSearchCriteriaChange}>
          <option value="all">All</option>
          <option value="driver_name">Driver Name</option>
          <option value="nationality">Nationality</option>
          <option value="car">Car</option>
          <option value="points">Points</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            {searchCriteria === 'all' && (
              <>
                <th>Driver Name</th>
                <th>Nationality</th>
                <th>Car</th>
                <th>Points</th>
              </>
            )}
            {searchCriteria === 'driver_name' && <th>Driver Name</th>}
            {searchCriteria === 'nationality' && <th>Nationality</th>}
            {searchCriteria === 'car' && <th>Car</th>}
            {searchCriteria === 'points' && <th>Points</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.position}</td>
              {searchCriteria === 'all' && (
                <>
                  <td>{item.driver_name}</td>
                  <td>{item.nationality}</td>
                  <td>{item.car}</td>
                  <td>{item.pts}</td>
                </>
              )}
              {searchCriteria === 'driver_name' && <td>{item.driver_name}</td>}
              {searchCriteria === 'nationality' && <td>{item.nationality}</td>}
              {searchCriteria === 'car' && <td>{item.car}</td>}
              {searchCriteria === 'points' && <td>{item.pts}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default F1Results;
