import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

import { categoryService } from '../../../../services/categoryService';
import MarkdownEditor from '@uiw/react-markdown-editor';

const { Option } = Select;

const QuestionModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [answerMarkdown, setAnswerMarkdown] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          categoryId: initialValues.category?.id || initialValues.categoryId,
        });
        setAnswerMarkdown(initialValues.answerMarkdown || '');
      } else {
        form.resetFields();
        setAnswerMarkdown('');
      }
    }
  }, [visible, initialValues, form]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories({ page: 0, size: 100 });
      setCategories(response.data.data);
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const submissionValues = {
          ...values,
          answerMarkdown,
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
      title={initialValues ? 'Edit Question' : 'Add New Question'}
      okText={initialValues ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onClose}
      onOk={handleOk}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        name="question_form"
      >
        <Form.Item
          name="title"
          label="Question Title"
          rules={[{ required: true, message: 'Please input the question title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select a category">
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>{cat.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="difficulty"
          label="Difficulty"
          rules={[{ required: true, message: 'Please select difficulty!' }]}
        >
          <Select placeholder="Select difficulty">
            <Option value="EASY">Easy</Option>
            <Option value="MEDIUM">Medium</Option>
            <Option value="HARD">Hard</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="content"
          label="Content / Prompt"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Answer (Markdown)"
          required
        >
          <div >
            <MarkdownEditor
              value={answerMarkdown}
              onChange={setAnswerMarkdown}
              height={300}
            />
          </div>
          {!answerMarkdown && <div style={{ color: '#ff4d4f', marginTop: 5 }}>Please input the answer in markdown!</div>}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
