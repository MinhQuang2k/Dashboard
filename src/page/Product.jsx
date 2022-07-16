import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchProduct from "../components/product/SearchProduct";
import AddSearch from "../components/table/AddSearch";
import {
  deleteProduct,
  getProducts,
  productsSelector,
} from "../slices/reducer/product";

const Product = () => {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    product: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data,
    pagination: { currentPage, perPage, totalRow },
  } = useSelector(productsSelector);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(getProducts({ page, ...form }));
  }, [page, form]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>React CRM</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="table-box">
        <h1>Products ({totalRow})</h1>
        <table>
          <thead className="ant-table-thead">
            <tr>
              <th>Product Name</th>
              <th>Category Name</th>
              <th>Price</th>
              <th>Total In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">
            {data &&
              data.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.numInStock}</td>
                  <td>
                    <div className="group-button">
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<EditFilled />}
                        className="btn-green"
                        onClick={() => navigate(product.id.toString())}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<DeleteFilled />}
                        className="btn-line"
                        onClick={() => handleDelete(product.id)}
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
      <AddSearch setVisible={setVisibleSearch} path="newproduct" />
      <SearchProduct
        visible={visibleSearch}
        setVisible={setVisibleSearch}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default Product;
