import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';

const { Option } = Select;

const UserModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          roleId: initialValues.role?.id || initialValues.roleId,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const submissionValues = {
          ...values,
          roleId: values.roleId
        };

        onSubmit(submissionValues);

      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? 'Edit User' : 'Add New User'}
      okText={initialValues ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="user_form"
      >
        <Form.Item
          name="username"
          label="User name"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please input the full name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>
        {!initialValues && (
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          name="roleId"
          label="Role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value={1}>Admin</Option>
            <Option value={2}>User</Option>
          </Select>
        </Form.Item>
        {initialValues && (
          <Form.Item
            name="isActive"
            label="Active Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserModal;
