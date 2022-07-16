import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  updateCustomer,
  getOneCustomer,
  customersSelector,
} from "../../slices/reducer/customer";
import { useEffect } from "react";

const DetailCustomer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { customer } = useSelector(customersSelector);

  const onFinish = () => {
    if (params?.id) {
      dispatch(
        updateCustomer({
          id: params.id,
          ...JSON.parse(JSON.stringify(form.getFieldValue())),
        })
      );
    } else {
      dispatch(addCustomer(form.getFieldValue()));
    }
    form.resetFields();
    navigate(-1);
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(getOneCustomer(params.id));
    }
  }, []);

  useEffect(() => {
    if (params?.id) {
      form.setFieldsValue({
        firstname: customer?.firstname,
        lastname: customer?.lastname,
        rewards: customer?.rewards,
        email: customer?.email,
        mobile: customer?.mobile,
        avatar: customer?.avatar,
      });
    } else {
      form.resetFields();
    }
  }, [customer]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
      </Breadcrumb>
      <div className="table-box">
        <h1>Customer</h1>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="form-box"
        >
          <Row gutter={(16, 16)}>
            <Col span={8}>
              <Form.Item name="firstname" label="First Name">
                <Input className="input-box" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="lastname" label="Last Name">
                <Input className="input-box" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="rewards" label="Rewards">
                <Input
                  className="input-box"
                  placeholder="Rewards"
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <Input className="input-box" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="mobile" label="Mobile">
                <Input className="input-box" placeholder="Mobile" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="box-img">
              {params?.id && customer?.avatar && (
                <img src={customer.avatar} alt="" className="img-avatar" />
              )}
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

export default DetailCustomer;
