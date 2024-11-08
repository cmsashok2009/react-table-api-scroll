import axios from "axios";
export const fetchData = async (page, limit) => {
  console.log(page, limit, "page, limit");
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments",
      {
        params: {
          _page: page,
          _limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export default fetchData;

// export const fetchData = async (page, limit) => {
//   try {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const result = await response.json();
//     return result; // Return the fetched data
//   } catch (error) {
//     throw new Error(error.message); // Propagate the error to be handled by the component
//   }
// };
