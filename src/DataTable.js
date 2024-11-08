// DataTable.js
import React from "react";
import { TableContainer, Table, Header, Row, Cell } from "./App.styles";

const DataTable = React.memo(({ data }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Header>ID</Header>
            <Header>Name</Header>
            <Header>Email</Header>
            <Header>Body</Header>
          </tr>
        </thead>
        <tbody id="data-table">
          {data.map((item) => (
            <Row key={item.id}>
              <Cell>{item.id}</Cell>
              <Cell>{item.name}</Cell>
              <Cell>{item.email}</Cell>
              <Cell>{item.body}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
});

export default DataTable;
