import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchOrder from "../components/order/SearchOrder";
import AddSearch from "../components/table/AddSearch";
import {
  deleteOrder,
  getOrders,
  ordersSelector,
} from "../slices/reducer/order";

const Order = () => {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    lastname: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data,
    pagination: { currentPage, perPage, totalRow },
  } = useSelector(ordersSelector);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    dispatch(getOrders({ page, ...form }));
  }, [page, form]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>React CRM</Breadcrumb.Item>
        <Breadcrumb.Item>Order</Breadcrumb.Item>
      </Breadcrumb>
      <div className="table-box">
        <h1>Orders ({totalRow})</h1>
        <table>
          <thead className="ant-table-thead">
            <tr>
              <th>Reference</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Shipping Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">
            {data &&
              data.map((order) => (
                <tr key={order.id}>
                  <td>{order.reference}</td>
                  <td>{order.quantity}</td>
                  <td>{order.amount}</td>
                  <td>{order.customer}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.shippedDate}</td>
                  <td>
                    <div className="group-button">
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<EditFilled />}
                        className="btn-green"
                        onClick={() => navigate(order.id.toString())}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<DeleteFilled />}
                        className="btn-line"
                        onClick={() => handleDelete(order.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {totalRow > data.length && totalRow > perPage && (
        <div className="pagination-box">
          <Pagination
            defaultCurrent={currentPage}
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={perPage}
            total={totalRow}
          />
        </div>
      )}
      <AddSearch setVisible={setVisibleSearch} path="neworder" />
      <SearchOrder
        visible={visibleSearch}
        setVisible={setVisibleSearch}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default Order;
