import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { Skeleton } from "../component/Loader";
import TableHOC from "../component/admin/TableHOC";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
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
  {
    Header: "Action",
    accessor: "action",
  },
]

const Orders = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const [rows, setRows] = useState<DataType[]>([]);

  const { isLoading, isError, data, error } = useMyOrdersQuery(user?._id as string);

  const table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Orders", rows.length > 6)();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(data.orders.map((i) => ({
        _id: i._id,
        amount: i.total,
        discount: i.discount,
        quantity: i.orderItems.length,
        status: <span className={i.status === "Processing" ? "red" : (i.status === "Shipped" ? "green" : "purple")}>{i.status}</span>,
        action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
      })));
    }
  }, [data]);

  return (
    <div className="container">
      <h2>My Orders</h2>
      {isLoading ? <Skeleton length={20} /> : table}
    </div>
  )
}

export default Orders