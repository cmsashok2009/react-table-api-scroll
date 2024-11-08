// ItemsPerPage.js
import React from "react";

const ItemsPerPage = React.memo(({ limit, setLimit, loading }) => {
  return (
    <div>
      <label>
        Items per page:
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          disabled={loading}
          data-testid="limit-input"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>
    </div>
  );
});

export default ItemsPerPage;

// Scroll handling with debounce (or simply delayed trigger)
// const handleScroll = useCallback(() => {
//   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
//   const viewportHeight = window.innerHeight;
//   const documentHeight = document.documentElement.scrollHeight;

//   if (scrollPosition + viewportHeight >= documentHeight - 1 && !loading) {
//     setPage((prevPage) => prevPage + 1);
//   }
// }, [loading]);

// useEffect(() => {
//   const debounceTimeout = setTimeout(() => {
//     window.addEventListener("scroll", handleScroll);
//   }, 300); // 300ms debounce time

//   return () => {
//     clearTimeout(debounceTimeout);
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, [handleScroll]);
