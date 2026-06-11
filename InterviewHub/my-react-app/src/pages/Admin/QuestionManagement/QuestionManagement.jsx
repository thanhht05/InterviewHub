import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Typography, Card, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import QuestionModal from './components/QuestionModal';
import { questionService } from '../../../services/questionService';

const { Title } = Typography;

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchQuestions = async (page = pagination.current, size = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await questionService.getAllQuestions({ page: page - 1, size });
      setQuestions(response.data.data);
      setPagination(prev => ({ ...prev, current: page, pageSize: size, total: response.data.totalElements }));
    } catch (error) {
      message.error('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    fetchQuestions(newPagination.current, newPagination.pageSize);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAdd = () => {
    setEditingQuestion(null);
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingQuestion(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await questionService.deleteQuestion(id);
      message.success('Question deleted successfully');
      fetchQuestions();
    } catch (error) {
      message.error('Failed to delete question');
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      if (editingQuestion) {
        await questionService.updateQuestion(editingQuestion.id, values);
        message.success('Question updated successfully');
      } else {
        await questionService.createQuestion(values);
        message.success('Question created successfully');
      }
      setModalVisible(false);
      fetchQuestions();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => record.category?.name,
    },
    {
      title: 'Difficulty',
      key: 'difficulty',
      dataIndex: 'difficulty',
      render: (difficulty) => {
        let color = difficulty === 'HARD' ? 'volcano' : difficulty === 'MEDIUM' ? 'geekblue' : 'green';
        return (
          <Tag color={color}>
            {difficulty}
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this question?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card bordered={false}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>Question Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Question
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={questions}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <QuestionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        initialValues={editingQuestion}
      />
    </Card>
  );
};

export default QuestionManagement;
