import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category || []); // Ensure categories is always an array
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error);
      setCategories([]); // Set categories to empty array if error occurs
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading }; // Return both categories and loading state
}
