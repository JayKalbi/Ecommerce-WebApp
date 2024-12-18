import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch(); // Access search state from context
  const [loading, setLoading] = useState(false); // To track if the search is in progress
  const navigate = useNavigate();

  // Handle form submission (search)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.keyword.trim()) return; // Prevent search if input is empty

    setLoading(true); // Set loading to true when search starts

    try {
      // Make the API request to search products by keyword
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );

      // Update the context with the search results
      setValues({ ...values, results: data });

      // Navigate to the search page with the results
      navigate("/search");
    } catch (error) {
      console.error("Search failed:", error);
      // You can show a toast or alert to the user if you want
    } finally {
      setLoading(false); // Reset loading after the request is completed
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
