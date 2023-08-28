import React, { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Radio, DatePicker, Space } from "antd";
import "./EmpForm.css";
import useEmp from "../../hooks/useEmp";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function EmpForm() {
  const [open, setOpen] = useState(false);
  const { handleAddEmployee } = useEmp();

  const [empName, setEmpName] = useState("");
  const [phone, setPhone] = useState();
  const [empEmail, setEmpEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateContext, setDateContext] = useState("");
  const [err, setErr] = useState(false);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    setDateContext(dateString);
  };

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const handleSubmit = () => {
    console.log("first");
    if (
      empName === "" ||
      phone === "" ||
      empEmail === "" ||
      department === "" ||
      position === "" ||
      selectedDate === null
    ) {
      setErr(true);
      return;
    }
    handleAddEmployee(
      empName,
      empEmail,
      phone,
      department,
      position,
      dateContext.split("-")
    );
    console.log(
      empName,
      empEmail,
      phone,
      department,
      position,
      dateContext.split("-")
    );
    setEmpEmail("");
    setEmpName("");
    setDepartment("");
    setSelectedDate(null);
    setPhone("");
    setPosition("");
    setOpen(false);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  useEffect(() => {
    if (
      empName === "" ||
      phone === "" ||
      empEmail === "" ||
      department === "" ||
      position === "" ||
      selectedDate === null
    ) {
      setErr(false);
    }
  }, [empName, phone, empEmail, department, position, selectedDate]);

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add new
      </Button>
      <Modal
        title="NEW EMPLOYEE"
        centered
        open={open}
        onOk={form.submit}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          onFinish={handleSubmit}
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
                <Input
                  onChange={(e) => setEmpName(e.target.value)}
                  value={empName}
                  placeholder="Enter you full name"
                />
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
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="01... "
                />
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
                <Input
                  onChange={(e) => setEmpEmail(e.target.value)}
                  value={empEmail}
                  placeholder="Enter you email"
                />
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
                <Input
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  placeholder="Enter you Department"
                />
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
                <Input
                  onChange={(e) => setPosition(e.target.value)}
                  value={position}
                  placeholder="Enter you Position"
                />
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
