import { useSelector } from "react-redux";
import AdminSidebar from "../../../component/admin/AdminSidebar";
import { LineChart } from "../../../component/admin/Charts";
import { getLastMonths } from "../../../utils/features";
import { RootState } from "../../../redux/store";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../component/Loader";

const { lastTwelveMonth } = getLastMonths();

const Linecharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useLineQuery(user?._id as string);

  const productCount = data?.charts.productCount || [];
  const userCount = data?.charts.userCount || [];
  const discount = data?.charts.discount || [];
  const revenue = data?.charts.revenue || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {
          isLoading ? <Skeleton length={20} /> :
            <>
              <section>
                <LineChart
                  data={userCount}
                  label="Users"
                  borderColor="rgb(53, 162, 255)"
                  labels={lastTwelveMonth}
                  backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2>Active Users</h2>
              </section>

              <section>
                <LineChart
                  data={productCount}
                  backgroundColor={"hsla(269,80%,40%,0.4)"}
                  borderColor={"hsl(269,80%,40%)"}
                  labels={lastTwelveMonth}
                  label="Products"
                />
                <h2>Total Products (SKU)</h2>
              </section>

              <section>
                <LineChart
                  data={revenue}
                  backgroundColor={"hsla(129,80%,40%,0.4)"}
                  borderColor={"hsl(129,80%,40%)"}
                  label="Revenue"
                  labels={lastTwelveMonth}
                />
                <h2>Total Revenue </h2>
              </section>

              <section>
                <LineChart
                  data={discount}
                  backgroundColor={"hsla(29,80%,40%,0.4)"}
                  borderColor={"hsl(29,80%,40%)"}
                  label="Discount"
                  labels={lastTwelveMonth}
                />
                <h2>Discount Allotted </h2>
              </section>
            </>
        }
      </main>
    </div>
  );
};

export default Linecharts;
