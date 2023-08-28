import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Radio, DatePicker, Space } from "antd";
import "./EmpForm.css";

function EmpForm() {
  const [open, setOpen] = useState(false);
  //   const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateContext, setDateContext] = useState("");
  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    setDateContext(dateString);
  };

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add new
      </Button>
      <Modal title="NEW EMPLOYEE" centered open={open} width={1000}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <div className="row">
            <h5>Personal Info</h5>
            <div className="col-4"></div>
            <div className="col-4">
              {/*  Name */}
              <Form.Item
                label="Name"
                required
                tooltip="This is a required field"
              >
                <Input placeholder="Enter you full name" />
              </Form.Item>
              {/* Phone */}
              <Form.Item
                label="Phone"
                required
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="01... " />
              </Form.Item>
            </div>
            <div className="col-4">
              {/* Start Date */}
              <Form.Item
                label="Start Date"
                required
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Space direction="vertical">
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Space>
              </Form.Item>
              {/* Email */}
              <Form.Item
                label="Email"
                required
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Enter you email" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <h5>Office Info</h5>

            <div className="col-6">
              {/*  Department */}
              <Form.Item
                label="Department "
                required
                tooltip="This is a required field"
              >
                <Input placeholder="Enter you Department" />
              </Form.Item>
            </div>
            <div className="col-6">
              {/* Position */}
              <Form.Item
                label="Position"
                required
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Enter you Position" />
              </Form.Item>
            </div>
          </div>
          <Form.Item className="d-flex justify-content-center">
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmpForm;
