import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const CategoryModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? 'Edit Category' : 'Add New Category'}
      okText={initialValues ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="category_form"
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
