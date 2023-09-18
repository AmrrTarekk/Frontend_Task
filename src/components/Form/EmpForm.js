import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, DatePicker, Space } from "antd";
import "./EmpForm.css";
import useEmp from "../../hooks/useEmp";
import { useDropzone } from "react-dropzone";

import { toast } from "react-hot-toast";

const REGEX = {
  NAME_REGEX: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  PHONE_REGEX: /^01[0125][0-9]{8}$/,
  EMAIL_REGEX:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

////////////

function EmpForm({
  open,
  setOpen,
  imageCard,
  nameCard,
  phoneCard,
  dateCard,
  dateFormatCard,
  emailCard,
  officeCard,
  departmentCard,
  roleCard,
  attendanceProfileCard,
  positionCard,
  WFHCard,
  touched,
  valid,
  idCard,
}) {
  const initialFormFlags = {
    nameFocus: false,
    nameTouched: false || touched,
    phoneFocus: false,
    phoneTouched: false || touched,
    emailFocus: false,
    emailTouched: false || touched,
  };
  const initialFormValidation = {
    nameValid: false || valid,
    phoneValid: false || valid,
    emailValid: false || valid,
  };
  const initialFormValues = {
    image: imageCard || "",
    name: nameCard || "",
    phone: phoneCard || "",
    date: dateCard || "",
    dateFor: dateFormatCard || null,
    email: emailCard || "",
    office: officeCard || "",
    department: departmentCard || "",
    role: roleCard || "",
    attendanceProfile: attendanceProfileCard || "",
    position: positionCard || "",
    WFH: WFHCard || false,
    id: idCard || crypto.randomUUID(),
  };

  const { handleAddEmployee } = useEmp();
  const [formEmployee, setFormEmployee] = useState(initialFormValues);
  const [formEmployeeFlags, setFormEmployeeFlags] = useState(initialFormFlags);
  const [formEmployeeValidation, setFormEmployeeValidation] = useState(
    initialFormValidation
  );
  const {
    image,
    name,
    phone,
    date,
    dateFor,
    email,
    department,
    office,
    attendanceProfile,
    role,
    position,
    WFH,
  } = formEmployee;
  const { nameTouched, phoneTouched, emailTouched } = formEmployeeFlags;
  const { nameValid, phoneValid, emailValid } = formEmployeeValidation;

  // handle image drag&drop
  const handleRemoveImage = () => {
    setFormEmployee((prev) => ({
      ...prev,
      image: "",
    }));
  };
  const handleDrop = (acceptedFiles) => {
    setFormEmployee((prev) => ({
      ...prev,
      image: acceptedFiles[0],
    }));
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  // handle date input
  const [selectedDate, setSelectedDate] = useState(dateFor);
  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    setFormEmployee((prev) => ({
      ...prev,
      date: dateString.split("-"),
      dateFormat: date,
    }));
  };
  // handle checkbox
  const handleCheck = (e) => {
    setFormEmployee((prev) => ({
      ...prev,
      WFH: !prev.WFH,
    }));
  };

  const [err, setErr] = useState(false);

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleFormChange = (e, inputName) => {
    if (inputName) {
      setFormEmployee((prev) => ({
        ...prev,
        [inputName]: e,
      }));
    } else {
      const { value, name } = e.target;
      setFormEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
      handleFormValidation(name, value);
    }
  };
  const handleFormValidation = (name, value) => {
    const inp = name.toUpperCase();
    const result = REGEX[`${inp}_REGEX`].test(value);
    setFormEmployeeValidation((prev) => ({
      ...prev,
      [`${name}Valid`]: result,
    }));
  };
  const handleSubmit = () => {
    if (department === "" || position === "" || selectedDate === null) {
      setErr(true);
      toast.error("Fill The Required Fields Before Saving.");
      return;
    }
    if (!nameValid) {
      toast.error("Invalid Name");
      return;
    }
    if (!phoneValid) {
      toast.error("Invalid Phone Number");
      return;
    }
    if (!emailValid) {
      toast.error("Invalid Email Entry");
      return;
    }
    handleAddEmployee(formEmployee);
    toast.success("New Employee Successfully Saved!");
    setFormEmployee(initialFormValues);
    setFormEmployeeFlags(initialFormFlags);
    setFormEmployeeValidation(initialFormValidation);
    setSelectedDate(dateFor);
    setOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
    setFormEmployee(initialFormValues);
    setFormEmployeeFlags(initialFormFlags);
    setFormEmployeeValidation(initialFormValidation);
    setSelectedDate(dateFor);
    form.resetFields();
  };
  const handleFormFlags = (e) => {
    switch (e.type) {
      case "focus":
        setFormEmployeeFlags((prev) => ({
          ...prev,
          [`${e.target.name}Focus`]: true,
          [`${e.target.name}Touched`]: true,
        }));
        break;
      case "blur":
        setFormEmployeeFlags((prev) => ({
          ...prev,
          [`${e.target.name}Focus`]: false,
        }));
        break;
      default:
        break;
    }
  };
  return (
    <>
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
              {image && (
                <div className="text-center w-100 d-flex flex-column gap-2 justify-content-around h-100  align-items-center ">
                  <img
                    alt="cardPic"
                    className="cardPic"
                    src={URL.createObjectURL(image)}
                  />
                  <Button
                    type="primary"
                    className=" text-center"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
              )}
              {!image && (
                <Form.Item className="dragBox mt-2 " label="">
                  <div
                    {...getRootProps()}
                    className={`drop-zone ${isDragActive ? "dragging" : ""}`}
                  >
                    <input name="image" {...getInputProps()} />
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
                  className={
                    nameTouched && name && !nameValid ? "invalidInput" : ""
                  }
                  name="name"
                  value={name}
                  onChange={handleFormChange}
                  onFocus={handleFormFlags}
                  onBlur={handleFormFlags}
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
                  name="phone"
                  value={phone}
                  className={
                    phoneTouched && phone && !phoneValid ? "invalidInput" : ""
                  }
                  onChange={handleFormChange}
                  onFocus={handleFormFlags}
                  onBlur={handleFormFlags}
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
                    name="date"
                    className="w-100 "
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
                  name="email"
                  value={email}
                  onChange={handleFormChange}
                  className={
                    emailTouched && email && !emailValid ? "invalidInput" : ""
                  }
                  onFocus={handleFormFlags}
                  onBlur={handleFormFlags}
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
                  name="office"
                  value={office === "" ? null : office}
                  placeholder="Select"
                  onChange={(e) => handleFormChange(e, "office")}
                >
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
                  name="department"
                  value={department === "" ? null : department}
                  placeholder="Select"
                  onChange={(e) => handleFormChange(e, "department")}
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
                  name="attendanceProfile"
                  value={attendanceProfile === "" ? null : attendanceProfile}
                  placeholder="Select"
                  onChange={(e) => handleFormChange(e, "attendanceProfile")}
                >
                  <Select.Option value="none">none</Select.Option>
                </Select>
              </Form.Item>
            </div>
            {/*  Role */}
            <div className="col-sm-6 col-12">
              <Form.Item label="Role">
                <Select
                  name="role"
                  value={role === "" ? null : role}
                  placeholder="Select"
                  onChange={(e) => handleFormChange(e, "role")}
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
                  name="position"
                  value={position === "" ? null : position}
                  placeholder="Select"
                  onChange={(e) => handleFormChange(e, "position")}
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
                  checked={WFH}
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
    </>
  );
}

export default EmpForm;

// import React, { useState } from "react";
// import { InfoCircleOutlined } from "@ant-design/icons";
// import { Button, Modal, Form, Input, Select, DatePicker, Space } from "antd";
// import "./EmpForm.css";
// import useEmp from "../../hooks/useEmp";
// import { useDropzone } from "react-dropzone";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-hot-toast";

// const REGEX = {
//   NAME_REGEX: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
//   PHONE_REGEX: /^01[0125][0-9]{8}$/,
//   EMAIL_REGEX:
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
// };

// const initialFormValues = {
//   image: "",
//   name: "",
//   phone: "",
//   date: "",
//   email: "",
//   office: "",
//   department: "",
//   role: "",
//   attendanceProfile: "",
//   position: "",
//   WFH: false,
// };
// const initialFormFlags = {
//   nameFocus: false,
//   nameTouched: false,
//   phoneFocus: false,
//   phoneTouched: false,
//   emailFocus: false,
//   emailTouched: false,
// };
// const initialFormValidation = {
//   nameValid: false,
//   phoneValid: false,
//   emailValid: false,
// };
// function EmpForm() {
//   const [open, setOpen] = useState(false);
//   const { handleAddEmployee } = useEmp();
//   const [formEmployee, setFormEmployee] = useState(initialFormValues);
//   const [formEmployeeFlags, setFormEmployeeFlags] = useState(initialFormFlags);
//   const [formEmployeeValidation, setFormEmployeeValidation] = useState(
//     initialFormValidation
//   );
//   const {
//     image,
//     name,
//     phone,
//     date,
//     email,
//     department,
//     office,
//     attendanceProfile,
//     role,
//     position,
//     WFH,
//   } = formEmployee;
//   const { nameTouched, phoneTouched, emailTouched } = formEmployeeFlags;
//   const { nameValid, phoneValid, emailValid } = formEmployeeValidation;

//   // handle image drag&drop
//   const handleDrop = (acceptedFiles) => {
//     setFormEmployee((prev) => ({
//       ...prev,
//       image: acceptedFiles[0],
//     }));
//   };
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: handleDrop,
//   });
//   // handle date input
//   const [selectedDate, setSelectedDate] = useState(null);
//   const handleDateChange = (date, dateString) => {
//     setSelectedDate(date);
//     setFormEmployee((prev) => ({
//       ...prev,
//       date: dateString.split("-"),
//     }));
//   };
//   // handle checkbox
//   const handleCheck = (e) => {
//     setFormEmployee((prev) => ({
//       ...prev,
//       WFH: !prev.WFH,
//     }));
//   };

//   const [err, setErr] = useState(false);

//   const [form] = Form.useForm();
//   const [requiredMark, setRequiredMarkType] = useState("optional");
//   const onRequiredTypeChange = ({ requiredMarkValue }) => {
//     setRequiredMarkType(requiredMarkValue);
//   };
//   const handleFormChange = (e, inputName) => {
//     if (inputName) {
//       setFormEmployee((prev) => ({
//         ...prev,
//         [inputName]: e,
//       }));
//     } else {
//       const { value, name } = e.target;
//       setFormEmployee((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//       handleFormValidation(name, value);
//     }
//   };
//   const handleFormValidation = (name, value) => {
//     const inp = name.toUpperCase();
//     const result = REGEX[`${inp}_REGEX`].test(value);
//     setFormEmployeeValidation((prev) => ({
//       ...prev,
//       [`${name}Valid`]: result,
//     }));
//   };
//   const handleSubmit = () => {
//     if (department === "" || position === "" || selectedDate === null) {
//       setErr(true);

//       toast.error("Fill The Required Fields Before Saving.");
//       return;
//     }
//     if (!nameValid) {
//       toast.error("Invalid Name");
//       return;
//     }
//     if (!phoneValid) {
//       toast.error("Invalid Phone Number");
//       return;
//     }
//     if (!emailValid) {
//       toast.error("Invalid Email Entry");
//       return;
//     }
//     handleAddEmployee(formEmployee);
//     toast.success("New Employee Successfully Saved!");
//     setFormEmployee(initialFormValues);
//     setFormEmployeeFlags(initialFormFlags);
//     setFormEmployeeValidation(initialFormValidation);
//     setSelectedDate(null);
//     setOpen(false);
//     form.resetFields();
//   };

//   const handleCancel = () => {
//     setOpen(false);
//     setFormEmployee(initialFormValues);
//     setFormEmployeeFlags(initialFormFlags);
//     setFormEmployeeValidation(initialFormValidation);
//     setSelectedDate(null);
//     form.resetFields();
//   };
//   const handleFormFlags = (e) => {
//     switch (e.type) {
//       case "focus":
//         setFormEmployeeFlags((prev) => ({
//           ...prev,
//           [`${e.target.name}Focus`]: true,
//           [`${e.target.name}Touched`]: true,
//         }));
//         break;
//       case "blur":
//         setFormEmployeeFlags((prev) => ({
//           ...prev,
//           [`${e.target.name}Focus`]: false,
//         }));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div>
//       <Button
//         type="primary"
//         className="addNewBtn d-flex flex-row gap-1 align-items-center"
//         onClick={() => setOpen(true)}
//       >
//         <FontAwesomeIcon icon={faPlus} />
//         Add new
//       </Button>
//       <Modal
//         title="NEW EMPLOYEE"
//         centered
//         open={open}
//         onOk={form.submit}
//         onCancel={handleCancel}
//         width={1000}
//         okText="Save"
//       >
//         <div className="Line-164 mb-1"></div>
//         <Form
//           form={form}
//           layout="vertical"
//           initialValues={{
//             requiredMarkValue: requiredMark,
//           }}
//           onValuesChange={onRequiredTypeChange}
//           requiredMark={requiredMark}
//           onFinish={handleSubmit}
//         >
//           <div className="row">
//             <h5 className="personal-info mt-1">
//               Personal Info<div className="Rectangle-971"></div>
//             </h5>
//             {/* Image Uploader */}
//             <div className="col-4 ">
//               {image && (
//                 <div className="text-center w-100 d-flex flex-column gap-2 justify-content-around h-100  align-items-center ">
//                   <img
//                     alt="cardPic"
//                     className="cardPic"
//                     src={URL.createObjectURL(image)}
//                   />
//                   <Button
//                     type="primary"
//                     className=" text-center"
//                     onClick={(prev) => setFormEmployee({ ...prev, image: "" })}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               )}
//               {!image && (
//                 <Form.Item className="dragBox mt-2 " label="">
//                   <div
//                     {...getRootProps()}
//                     className={`drop-zone ${isDragActive ? "dragging" : ""}`}
//                   >
//                     <input name="image" {...getInputProps()} />
//                     {isDragActive ? (
//                       <span className="DRAG-IMAGE-HERE">DRAG IMAGE HERE</span>
//                     ) : (
//                       <span className="DRAG-IMAGE-HERE">DRAG IMAGE HERE</span>
//                     )}
//                   </div>
//                 </Form.Item>
//               )}
//             </div>
//             <div className="col-sm-4 col-8 ml-0">
//               {/*  Name */}
//               <Form.Item
//                 label="Name"
//                 required
//                 tooltip={{
//                   title: "Required",
//                   icon: <InfoCircleOutlined />,
//                 }}
//               >
//                 <Input
//                   className={
//                     nameTouched && name && !nameValid ? "invalidInput" : ""
//                   }
//                   name="name"
//                   value={name}
//                   onChange={handleFormChange}
//                   onFocus={handleFormFlags}
//                   onBlur={handleFormFlags}
//                   placeholder="Enter you full name"
//                 />
//               </Form.Item>
//               {/* Phone */}
//               <Form.Item
//                 label="Phone"
//                 required
//                 tooltip={{
//                   title: "Required",
//                   icon: <InfoCircleOutlined />,
//                 }}
//               >
//                 <Input
//                   type="number"
//                   name="phone"
//                   value={phone}
//                   className={
//                     phoneTouched && phone && !phoneValid ? "invalidInput" : ""
//                   }
//                   onChange={handleFormChange}
//                   onFocus={handleFormFlags}
//                   onBlur={handleFormFlags}
//                   placeholder="01.."
//                 />
//               </Form.Item>
//             </div>
//             <div className="col-sm-4 col-12">
//               {/* Start Date */}
//               <Form.Item
//                 label="Start Date"
//                 required
//                 tooltip={{
//                   title: "Required",
//                   icon: <InfoCircleOutlined />,
//                 }}
//               >
//                 <Space direction="vertical" className="w-100">
//                   <DatePicker
//                     name="date"
//                     className="w-100 "
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                   />
//                 </Space>
//               </Form.Item>
//               {/* Email */}
//               <Form.Item
//                 label="Email"
//                 required
//                 tooltip={{
//                   title: "Required",
//                   icon: <InfoCircleOutlined />,
//                 }}
//               >
//                 <Input
//                   type="email"
//                   name="email"
//                   value={email}
//                   onChange={handleFormChange}
//                   className={
//                     emailTouched && email && !emailValid ? "invalidInput" : ""
//                   }
//                   onFocus={handleFormFlags}
//                   onBlur={handleFormFlags}
//                   placeholder="Enter you email"
//                 />
//               </Form.Item>
//             </div>
//           </div>
//           <div className="row">
//             <h5 className="personal-info mt-1">
//               Office Info<div className="Rectangle-972"></div>
//             </h5>
//             {/*  Office */}
//             <div className="col-12">
//               <Form.Item label="Office">
//                 <Select
//                   name="office"
//                   value={office === "" ? null : office}
//                   placeholder="Select"
//                   onChange={(e) => handleFormChange(e, "office")}
//                 >
//                   <Select.Option value="Arabic Localizer">
//                     Arabic Localizer
//                   </Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>
//             {/*  Department */}
//             <div className="col-sm-6 col-12">
//               <Form.Item
//                 required
//                 tooltip={{
//                   title: "Required",
//                   icon: <InfoCircleOutlined />,
//                 }}
//                 label="Department"
//               >
//                 <Select
//                   name="department"
//                   value={department === "" ? null : department}
//                   placeholder="Select"
//                   onChange={(e) => handleFormChange(e, "department")}
//                 >
//                   <Select.Option value="Backend Team">
//                     Backend Team
//                   </Select.Option>
//                   <Select.Option value="Frontend Team">
//                     Frontend Team
//                   </Select.Option>
//                   <Select.Option value="Bussiness Development">
//                     Bussiness Development
//                   </Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>
//             {/*  Attendance Profile */}
//             <div className="col-sm-6 col-12">
//               <Form.Item label="Attendance Profile">
//                 <Select
//                   name="attendanceProfile"
//                   value={attendanceProfile === "" ? null : attendanceProfile}
//                   placeholder="Select"
//                   onChange={(e) => handleFormChange(e, "attendanceProfile")}
//                 >
//                   <Select.Option value="none">none</Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>
//             {/*  Role */}
//             <div className="col-sm-6 col-12">
//               <Form.Item label="Role">
//                 <Select
//                   name="role"
//                   value={role === "" ? null : role}
//                   placeholder="Select"
//                   onChange={(e) => handleFormChange(e, "role")}
//                 >
//                   <Select.Option value="Employee">Employee</Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>
//             {/* Position */}
//             <div className="col-sm-6 col-12">
//               <Form.Item
//                 required
//                 tooltip={{
//                   title: "Required",
//                   icon: <InfoCircleOutlined />,
//                 }}
//                 label="Position"
//               >
//                 <Select
//                   name="position"
//                   value={position === "" ? null : position}
//                   placeholder="Select"
//                   onChange={(e) => handleFormChange(e, "position")}
//                 >
//                   <Select.Option value="Backend Developer">
//                     Backend Developer
//                   </Select.Option>
//                   <Select.Option value="Frontend Developer">
//                     Frontend Developer
//                   </Select.Option>
//                   <Select.Option value="HR Head">HR Head</Select.Option>
//                   <Select.Option value="HR">HR</Select.Option>
//                 </Select>
//               </Form.Item>
//             </div>
//           </div>
//           <div className="row">
//             <h5 className="personal-info mt-1">
//               Work From Home<div className="Rectangle-973"></div>
//             </h5>
//             <div className="col-12 mt-2 ">
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={WFH}
//                   onChange={handleCheck}
//                   id="WFH"
//                   name="WFH"
//                 />
//                 <label htmlFor="WFH">
//                   <b>Allow Employee To Work From Home</b>
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="Line-165 mt-2"></div>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default EmpForm;
