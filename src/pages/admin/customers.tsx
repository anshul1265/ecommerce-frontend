import { ReactElement, useCallback, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../component/admin/AdminSidebar";
import TableHOC from "../../component/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userApi";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../component/Loader";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, error, isError, data } = useAllUsersQuery(user?._id as string);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const [deleteUser] = useDeleteUserMutation()

  const deleteHandler = useCallback(async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id as string });
    responseToast(res, null, "");
  }, [user, deleteUser]);

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map(i => ({
          avatar: <img style={{ borderRadius: "50%" }} alt={i.name} src={i.photo} />,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: <button onClick={() => deleteHandler(i._id)}><FaTrash /></button>,
        }))
      )
    }
  }, [data, deleteHandler]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
