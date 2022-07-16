import { Button, Drawer, Form, Input, Space } from "antd";

const SearchCustomer = ({ visible, setVisible, setForm }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    setForm((pre) => {
      let firstname = form.getFieldValue()?.firstname || "";
      let lastname = form.getFieldValue()?.lastname || "";
      return { ...pre, firstname, lastname };
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
        <Form.Item name="firstname" label="First Name">
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastname" label="Last Name">
          <Input placeholder="Last Name" />
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

export default SearchCustomer;
