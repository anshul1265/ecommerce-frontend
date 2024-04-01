import React from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC.tsx";

interface DataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable: React.FC<{ data: DataType[] }> = ({ data }) => {
  return (
    <div className="transaction-box">
      <h2>Top Transactions</h2>
      <TableHOC<DataType>
        columns={columns}
        data={data}
        containerClassname="transaction-table"
        showPagination={true} // Assuming you want pagination
      />
    </div>
  );
};

export default DashboardTable;
