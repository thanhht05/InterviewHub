import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Typography, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryModal from './components/CategoryModal';
import { categoryService } from '../../../services/categoryService';

const { Title } = Typography;

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchCategories = async (page = pagination.current, size = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await categoryService.getAllCategories({ page: page - 1, size });
      setCategories(response.data.data);
      setPagination(prev => ({ ...prev, current: page, pageSize: size, total: response.data.totalElements }));
    } catch (error) {
      message.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    fetchCategories(newPagination.current, newPagination.pageSize);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      message.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, values);
        message.success('Category updated successfully');
      } else {
        await categoryService.createCategory(values);
        message.success('Category created successfully');
      }
      setModalVisible(false);
      fetchCategories();
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            title="Are you sure you want to delete this category?"
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
        <Title level={3} style={{ margin: 0 }}>Category Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        initialValues={editingCategory}
      />
    </Card>
  );
};

export default CategoryManagement;
