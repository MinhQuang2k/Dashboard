import { Button, Drawer, Form, Input, Space } from "antd";

const SearchOrder = ({ visible, setVisible, setForm }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    setForm((pre) => {
      let lastname = form.getFieldValue()?.lastname || "";
      return { ...pre, lastname };
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

export default SearchOrder;
