import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Title } from "./App.styles";
import ItemsPerPage from "./ItemsPerPage";
import DataTable from "./DataTable";
import Spinner from "./Spinner";
import fetchData from "./fetchDataHelper";
import ErrorHandler from "./ErrorHandler";

// FetchDataComponent as a single component
export const FetchDataComponent = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevLimit = useRef(limit);
  // Function to fetch comments (API call)
  const fetchComments = async (pg, lt) => {
    setLoading(true);
    try {
      const result = await fetchData(pg, lt); // Fetch data using current page and limit
      setData((prevData) => {
        return pg === 1 ? result : [...prevData, ...result]; // Reset data on page 1, else append new data
      });
    } catch (err) {
      setError(err.message); // Handle error if any
    } finally {
      setLoading(false);
    }
  };

  // Reset page when limit changes
  useEffect(() => {
    if (loading) return;
    if (prevLimit.current !== limit && !loading) {
      setPage(1);
      fetchComments(1, limit);
    } else if (!loading) {
      fetchComments(page, limit); // Fetch data when either page or limit changes
    }
    prevLimit.current = limit;
  }, [page, limit]);

  // Scroll handler to increment the page when scrolled to the bottom
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If we're at the bottom and not currently loading
    if (scrollPosition + viewportHeight >= documentHeight - 1 && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
    }
  }, [loading]);

  // Adding scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up scroll listener on component unmount
    };
  }, [handleScroll]);

  // Show error if any
  if (error) {
    return <ErrorHandler message={error} onRetry={() => setPage(1)} />;
  }

  return (
    <Container>
      <Title>Fetched Comments:</Title>
      {/* ItemsPerPage component */}
      <ItemsPerPage limit={limit} setLimit={setLimit} loading={loading} />
      {/* DataTable component */}
      <DataTable data={data} />
      {/* Show spinner for pages greater than 1 */}
      {loading && page > 1 && <Spinner />}
    </Container>
  );
};

export default FetchDataComponent;
