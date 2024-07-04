import React from "react";

function SearchHistory({ history, onHistoryClick }) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="search-history mt-4">
      <h2>Recent Searches</h2>
      <ul className="list-group mb-2">
        {history.map((city, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => onHistoryClick(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
