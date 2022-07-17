import { DeleteFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addOrder,
  getOneOrder,
  ordersSelector,
  updateOrder,
} from "../../slices/reducer/order";
const { Option } = Select;

const DetailOrder = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { order, categories, products, customers } =
    useSelector(ordersSelector);

  const onFinish = () => {
    if (params?.id) {
      dispatch(
        updateOrder({
          id: params.id,
          ...JSON.parse(JSON.stringify(form.getFieldValue())),
          products: listProduct,
        })
      );
    } else {
      dispatch(
        addOrder({
          ...JSON.parse(JSON.stringify(form.getFieldValue())),
          products: listProduct,
        })
      );
    }
    form.resetFields();
    navigate(-1);
  };

  const handleDeleteProduct = (product) => {
    let array = [...listProduct];
    const index = array.findIndex((a) => Number(a.id) === Number(product.id));
    array.splice(index, 1);
    setListProduct(array);
    subQuantity();
  };

  const addQuantity = () => {
    let quantity = form.getFieldValue()?.quantity;
    if (quantity) form.setFieldsValue({ quantity: quantity + 1 });
    else form.setFieldsValue({ quantity: 1 });
  };
  const subQuantity = () => {
    let quantity = form.getFieldValue()?.quantity;
    if (quantity > 0) {
      form.setFieldsValue({ quantity: quantity - 1 });
    } else {
      form.setFieldsValue({ quantity: 0 });
    }
  };

  useEffect(() => {
    dispatch(getOneOrder(params.id));
  }, []);

  useEffect(() => {
    if (params?.id) {
      form.setFieldsValue({
        customerId: order?.customerId,
        customer: customers.find(
          (c) => Number(c.id) === Number(order?.customerId)
        )?.lastname,
        reference: order?.reference,
        amount: order?.amount,
        quantity: order?.products.length,
        orderDate: order?.orderDate,
        shippedDate: order?.shippedDate,
        address: order?.shipAddress?.address,
        city: order?.shipAddress?.city,
        country: order?.shipAddress?.country,
        zipcode: order?.shipAddress?.zipcode,
      });
      setListProduct(order?.products);
    } else {
      form.resetFields();
    }
  }, [order]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
        <Breadcrumb.Item>Order</Breadcrumb.Item>
      </Breadcrumb>
      <div className="table-box">
        <h1>Order</h1>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="form-box"
        >
          <Row gutter={(16, 16)}>
            <Col span={8}>
              <Form.Item name="customer" label="Customer">
                <Select
                  showSearch
                  placeholder="Customer"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  className="input-box"
                  disabled={params?.id ? true : false}
                >
                  {customers &&
                    customers.map((customer) => (
                      <Option value={customer.id} key={customer.id}>
                        {customer.lastname}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="reference" label="Reference Number">
                <Input className="input-box" placeholder="Reference Number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="amount" label="Amount">
                <Input
                  className="input-box"
                  placeholder="Amount"
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="quantity" label="Quantity">
                <Input
                  className="input-box"
                  placeholder="Quantity"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="orderDate" label="Order Date">
                <Input
                  className="input-box"
                  placeholder="Order Date"
                  type="date"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="shippedDate" label="Shipped Date">
                <Input
                  className="input-box"
                  placeholder="Shipped Date"
                  type="date"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="address" label="Address">
                <Input className="input-box" placeholder="Address" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="city" label="City">
                <Input className="input-box" placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="country" label="Country">
                <Input className="input-box" placeholder="Country" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="zipcode" label="Zip Code">
                <Input className="input-box" placeholder="Zip Code" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="border-bottom">
            <h4 className="text-primary text-bold">Product List:</h4>
          </Row>
          {listProduct && (
            <Row className="border-bottom">
              {listProduct.map((product, index) => (
                <Col span={24} className="flex-space" key={index}>
                  <div>
                    <h4>{product.name}</h4>
                    <p className="text-line">$ {product.unitPrice}</p>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      shape="circle"
                      size="large"
                      icon={<DeleteFilled />}
                      className="btn-line"
                      onClick={() => handleDeleteProduct(product)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          )}

          <Row>
            <Col span={24} className="box-group-button">
              <Button
                htmlType="button"
                size="large"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button type="primary" htmlType="submit" size="large">
                Save
              </Button>
              <Button
                type="primary"
                htmlType="button"
                size="large"
                danger
                onClick={() => setIsModalVisible(true)}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
        <ModelAdd
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          categories={categories}
          products={products}
          setProduct={setListProduct}
          addQuantity={addQuantity}
        />
      </div>
    </div>
  );
};

const ModelAdd = ({
  isModalVisible,
  setIsModalVisible,
  categories,
  products,
  setProduct,
  addQuantity,
}) => {
  const [listProduct, setListProduct] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    if (form.getFieldValue()?.product) {
      const newProduct = products.find(
        (p) => p.id === form.getFieldValue()?.product
      );
      setProduct((pre) => {
        return [...pre, newProduct];
      });
      addQuantity();
    }

    form.resetFields();
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeCategory = (value) => {
    setListProduct(
      products.filter((p) => Number(p.categoryId) === Number(value))
    );
    form.setFieldsValue({
      product: null,
    });
  };
  return (
    <Modal
      title="Information"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" className="form-box">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="category">
              <Select
                showSearch
                placeholder="Category"
                optionFilterProp="children"
                onChange={onChangeCategory}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                className="max-width"
              >
                {categories &&
                  categories.map((category) => (
                    <Option value={category.id} key={category.id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="product">
              <Select
                showSearch
                placeholder="Product"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                className="max-width"
              >
                {listProduct.length > 0 &&
                  listProduct.map((product) => (
                    <Option value={product.id} key={product.id}>
                      {product.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DetailOrder;
