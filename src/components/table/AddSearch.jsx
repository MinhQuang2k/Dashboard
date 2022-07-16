import React from "react";
import { Button } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AddSearch = ({ setVisible, path }) => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate(path);
  };

  return (
    <div className="group-button-bottom">
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<SearchOutlined />}
        className="btn-blue"
        onClick={() => setVisible(true)}
      ></Button>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        className="btn-red"
        onClick={() => handleAdd()}
      ></Button>
    </div>
  );
};

export default AddSearch;
