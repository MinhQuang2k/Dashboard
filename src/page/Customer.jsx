import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import { Breadcrumb, Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchCustomer from "../components/customer/SearchCustomer";
import AddSearch from "../components/table/AddSearch";
import {
  customersSelector,
  getCustomers,
  deleteCustomer,
} from "../slices/reducer/customer";

const Customer = () => {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data,
    pagination: { currentPage, perPage, totalRow },
  } = useSelector(customersSelector);

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  useEffect(() => {
    dispatch(getCustomers({ page, ...form }));
  }, [page, form]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>React CRM</Breadcrumb.Item>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
      </Breadcrumb>
      <div className="table-box">
        <h1>Customers ({totalRow})</h1>
        <table>
          <thead className="ant-table-thead">
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Membership</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">
            {data &&
              data.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    {customer.avatar && (
                      <img src={customer.avatar} alt=""></img>
                    )}
                  </td>
                  <td>{customer.firstname}</td>
                  <td>{customer.lastname}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobile}</td>
                  <td>
                    {customer.membership ? (
                      <div className="icon icon-success">
                        <CheckCircleFilled />
                      </div>
                    ) : (
                      <div className="icon icon-fail">
                        <CloseCircleFilled />
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="group-button">
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<EditFilled />}
                        className="btn-green"
                        onClick={() => navigate(customer.id.toString())}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<DeleteFilled />}
                        className="btn-line"
                        onClick={() => handleDelete(customer.id)}
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

      <AddSearch setVisible={setVisibleSearch} path="newcustomer" />
      <SearchCustomer
        visible={visibleSearch}
        setVisible={setVisibleSearch}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default Customer;
