import React from "react";

const SortByPrice = ({ sorting, setSorting }) => {
  // Handle the change event when the sorting option is selected
  const handleSortChange = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div className="sorting d-flex justify-content-end mb-3 pb-5 ms-3">
      <label htmlFor="sort-select">Sort by</label>
      <select id="sort-select" onChange={handleSortChange} value={sorting}>
        <option className="option" value="low-price">
          Lowest Price
        </option>
        <option className="option" value="high-price">
          Highest Price
        </option>
      </select>
    </div>
  );
};

export default SortByPrice;