import { Breadcrumb, Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  getOneProduct,
  productsSelector,
  updateProduct,
} from "../../slices/reducer/product";
const { Option } = Select;

const DetailProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { product, categories } = useSelector(productsSelector);

  const onFinish = () => {
    if (params?.id) {
      dispatch(
        updateProduct({
          id: params.id,
          ...JSON.parse(JSON.stringify(form.getFieldValue())),
        })
      );
    } else {
      dispatch(addProduct(form.getFieldValue()));
    }
    form.resetFields();
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getOneProduct(params.id));
  }, []);

  useEffect(() => {
    if (params?.id) {
      form.setFieldsValue({
        name: product?.name,
        category: categories.find(
          (c) => Number(c.id) === Number(product?.categoryId)
        )?.name,
        numInStock: product?.numInStock,
        unitPrice: product?.unitPrice,
        categoryId: product?.categoryId,
      });
    } else {
      form.resetFields();
    }
  }, [product]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="table-box">
        <h1>Product</h1>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="form-box"
        >
          <Row gutter={(16, 16)}>
            <Col span={8}>
              <Form.Item name="category" label="Category">
                <Select
                  showSearch
                  placeholder="Category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  className="input-box"
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
            <Col span={8}>
              <Form.Item name="name" label="Product">
                <Input className="input-box" placeholder="Product" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="unitPrice" label="Price">
                <Input
                  className="input-box"
                  placeholder="Price"
                  type="number"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="numInStock" label="Quantity">
                <Input
                  className="input-box"
                  placeholder="Quantity"
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>
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
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default DetailProduct;
