// src/styles.js
import styled from "@emotion/styled";

// Container for the entire component
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  flex-grow: 1;
`;

// Title of the component
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

// Dropdown container for items per page
export const ItemsPerPageContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

// Table container that allows scrolling
export const TableContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

// Basic table style
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Header cell style
export const Header = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
`;

// Row style for table rows
export const Row = styled.tr`
  border-bottom: 1px solid #ddd;
`;

// Style for table cells
export const Cell = styled.td`
  padding: 10px;
  text-align: left;
`;

// Pagination button styles
export const PaginationButton = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const SpinnerCircle = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
