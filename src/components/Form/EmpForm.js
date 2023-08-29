import React, { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, DatePicker, Space } from "antd";
import "./EmpForm.css";
import useEmp from "../../hooks/useEmp";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "react-hot-toast";

const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const PHONE_REGEX = /^01[0125][0-9]{8}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const DATE_REGEX =
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

function EmpForm() {
  const [open, setOpen] = useState(false);
  const { handleAddEmployee } = useEmp();

  const [empName, setEmpName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [empEmail, setEmpEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [department, setDepartment] = useState("");
  const [office, setOffice] = useState("");
  const [attendance, setAttendance] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [check, setCheck] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateContext, setDateContext] = useState("");
  const [validDate, setValidDate] = useState(false);
  const [dateFocus, setDateFocus] = useState(false);

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

  const handleDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  useEffect(() => {
    const result = NAME_REGEX.test(empName);
    setValidName(result);
  }, [empName]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    if (phone.length < 11 || !result) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
  }, [phone]);

  useEffect(() => {
    const result = DATE_REGEX.test(dateContext);
    setValidDate(result);
  }, [dateContext]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(empEmail);
    setValidEmail(result);
  }, [empEmail]);

  const handleSubmit = () => {
    if (
      empName === "" ||
      phone === "" ||
      empEmail === "" ||
      department === "" ||
      position === "" ||
      selectedDate === null
    ) {
      setErr(true);

      toast.error("Fill The Required Fields Before Saving.");
      return;
    }
    if (!validName) {
      toast.error("Invalid Name");
      return;
    }
    if (!validPhone) {
      toast.error("Invalid Phone Number");
      return;
    }
    if (!validEmail) {
      toast.error("Invalid Email Entry");
      return;
    }
    if (!validDate) {
      toast.error("Invalid Date");
      return;
    }

    handleAddEmployee(
      empName,
      phone,
      empEmail,
      department,
      position,
      selectedImage,
      dateContext.split("-"),
      office,
      attendance,
      role
    );
    toast.success("New Employee Successfully Saved!");
    setEmpEmail("");
    setEmpName("");
    setDepartment("");
    setPhone("");
    setPosition("");
    setSelectedDate(null);
    setSelectedImage(null);
    setOffice("");
    setAttendance("");
    setRole("");
    setOpen(false);
    setCheck(false);
    form.resetFields();
  };

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

  const handleCancel = () => {
    setOpen(false);
    setEmpEmail("");
    setEmpName("");
    setDepartment("");
    setPhone("");
    setPosition("");
    setSelectedDate(null);
    setSelectedImage(null);
    setOffice("");
    setAttendance("");
    setRole("");
    setOpen(false);
    setCheck(false);
    form.resetFields();
  };
  return (
    <div>
      <Button
        type="primary"
        className="addNewBtn d-flex flex-row gap-1 align-items-center"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add new
      </Button>
      <Modal
        title="NEW EMPLOYEE"
        centered
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        width={1000}
        okText="Save"
      >
        <div className="Line-164 mb-1"></div>
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
            <h5 className="personal-info mt-1">
              Personal Info<div className="Rectangle-971"></div>
            </h5>
            {/* Image Uploader */}
            <div className="col-4 ">
              {selectedImage && (
                <div className="text-center w-100 d-flex flex-column gap-2 justify-content-around h-100  align-items-center ">
                  <img
                    alt="cardPic"
                    className="cardPic"
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <Button
                    type="primary"
                    className=" text-center"
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
              {!selectedImage && (
                <Form.Item className="dragBox mt-2 " label="">
                  <div
                    {...getRootProps()}
                    className={`drop-zone ${isDragActive ? "dragging" : ""}`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <span className="DRAG-IMAGE-HERE">DRAG IMAGE HERE</span>
                    ) : (
                      <span className="DRAG-IMAGE-HERE">DRAG IMAGE HERE</span>
                    )}
                  </div>
                </Form.Item>
              )}
            </div>
            <div className="col-sm-4 col-8 ml-0">
              {/*  Name */}
              <Form.Item
                label="Name"
                required
                tooltip={{
                  title: "Required",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  className={nameFocus && !validName ? "invalidInput" : ""}
                  onChange={(e) => setEmpName(e.target.value)}
                  value={empName}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  placeholder="Enter you full name"
                />
              </Form.Item>
              {/* Phone */}
              <Form.Item
                label="Phone"
                required
                tooltip={{
                  title: "Required",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  type="number"
                  className={phoneFocus && !validPhone ? "invalidInput" : ""}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                  value={phone}
                  placeholder="01.."
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 col-12">
              {/* Start Date */}
              <Form.Item
                label="Start Date"
                required
                tooltip={{
                  title: "Required",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Space direction="vertical" className="w-100">
                  <DatePicker
                    className={
                      dateFocus && !validDate ? "w-100 invalidInput" : "w-100"
                    }
                    onFocus={() => setDateFocus(true)}
                    onBlur={() => setDateFocus(false)}
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
                  title: "Required",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  type="email"
                  onChange={(e) => setEmpEmail(e.target.value)}
                  className={emailFocus && !validEmail ? "invalidInput" : ""}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  value={empEmail}
                  placeholder="Enter you email"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <h5 className="personal-info mt-1">
              Office Info<div className="Rectangle-972"></div>
            </h5>
            {/*  Office */}
            <div className="col-12">
              <Form.Item label="Office">
                <Select
                  value={office === "" ? null : office}
                  placeholder="Select"
                  onChange={(e) => setOffice(e)}
                >
                  {/* <Select.Option
                    value=""
                    className="selectedOp"
                    disabled
                    selected
                  >
                    Select
                  </Select.Option> */}
                  <Select.Option value="Arabic Localizer">
                    Arabic Localizer
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            {/*  Department */}
            <div className="col-sm-6 col-12">
              <Form.Item
                required
                tooltip={{
                  title: "Required",
                  icon: <InfoCircleOutlined />,
                }}
                label="Department"
              >
                <Select
                  value={department === "" ? null : department}
                  placeholder="Select"
                  onChange={(e) => setDepartment(e)}
                >
                  <Select.Option value="Backend Team">
                    Backend Team
                  </Select.Option>
                  <Select.Option value="Frontend Team">
                    Frontend Team
                  </Select.Option>
                  <Select.Option value="Bussiness Development">
                    Bussiness Development
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            {/*  Attendance Profile */}
            <div className="col-sm-6 col-12">
              <Form.Item label="Attendance Profile">
                <Select
                  value={attendance === "" ? null : attendance}
                  placeholder="Select"
                  onChange={(e) => setAttendance(e)}
                >
                  <Select.Option value="none">none</Select.Option>
                </Select>
              </Form.Item>
            </div>
            {/*  Role */}
            <div className="col-sm-6 col-12">
              <Form.Item label="Role">
                <Select
                  value={role === "" ? null : role}
                  placeholder="Select"
                  onChange={(e) => setRole(e)}
                >
                  <Select.Option value="Employee">Employee</Select.Option>
                </Select>
              </Form.Item>
            </div>
            {/* Position */}
            <div className="col-sm-6 col-12">
              <Form.Item
                required
                tooltip={{
                  title: "Required",
                  icon: <InfoCircleOutlined />,
                }}
                label="Position"
              >
                <Select
                  value={position === "" ? null : position}
                  placeholder="Select"
                  onChange={(e) => setPosition(e)}
                >
                  <Select.Option value="Backend Developer">
                    Backend Developer
                  </Select.Option>
                  <Select.Option value="Frontend Developer">
                    Frontend Developer
                  </Select.Option>
                  <Select.Option value="HR Head">HR Head</Select.Option>
                  <Select.Option value="HR">HR</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <h5 className="personal-info mt-1">
              Work From Home<div className="Rectangle-973"></div>
            </h5>
            <div className="col-12 mt-2 ">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={check}
                  onChange={handleCheck}
                  id="WFH"
                  name="WFH"
                />
                <label htmlFor="WFH">
                  <b>Allow Employee To Work From Home</b>
                </label>
              </div>
            </div>
          </div>

          <div className="Line-165 mt-2"></div>
        </Form>
      </Modal>
    </div>
  );
}

export default EmpForm;
