import "./CountryList.css";

import { useState, useEffect } from "react";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setLoading(false);
        });
    }, 1000);
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCountries = filteredCountries.sort((a, b) => {
    if (sort === "asc") {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  });

  return (
    <div className="country-list">
      <div className="margin">
        <label>
          <input
            type="radio"
            name="sort"
            value="asc"
            checked={sort === "asc"}
            onChange={(e) => setSort(e.target.value)}
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="desc"
            checked={sort === "desc"}
            onChange={(e) => setSort(e.target.value)}
          />
          Descending
        </label>
      </div>
      <input
        type="text"
        placeholder="Search for a country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Loading Countries...</p>}
      {!loading && sortedCountries.length === 0 && <p>No results found.</p>}
      {!loading && sortedCountries.length > 0 && (
        <ul>
          {sortedCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountryList;
