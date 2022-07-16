import { Button, Drawer, Form, Input, Space } from "antd";

const SearchProduct = ({ visible, setVisible, setForm }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    setForm((pre) => {
      let product = form.getFieldValue()?.product || "";
      return { ...pre, product };
    });
    form.resetFields();
    onClose();
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      title={<strong>Search</strong>}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="product" label="Product">
          <Input placeholder="Product" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button htmlType="button" onClick={onClose}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SearchProduct;
