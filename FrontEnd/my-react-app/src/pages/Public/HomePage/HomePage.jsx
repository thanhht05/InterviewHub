import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Card, Spin, message, theme, Grid } from 'antd';
import { ArrowRightOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../../services/categoryService';
import { useThemeContext } from '../../../contexts/ThemeContext';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeContext();
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const isMobile = screens.md === false;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories({ page: 0, size: 20 });
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      message.error('Could not load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const heroBackground = isDarkMode 
    ? `linear-gradient(135deg, ${token.colorBgLayout} 0%, #141414 100%)`
    : 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 100%)';

  return (
    <div style={{ minHeight: 'calc(100vh - 64px - 70px)' }}> {/* Adjusting for header and footer approx heights */}
      
      {/* Hero Section */}
      <div style={{ 
        background: heroBackground, 
        padding: isMobile ? '40px 16px' : '80px 50px', 
        textAlign: 'center' 
      }}>
        <Title style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '24px', color: token.colorPrimary }}>
          Master Your Next Interview
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto', color: token.colorTextSecondary }}>
          Practice with real-world interview questions organized by category. Level up your skills and land your dream job with InterviewHub.
        </Paragraph>
        <Button 
          type="primary" 
          size="large" 
          icon={<ArrowRightOutlined />}
          style={{ height: '50px', padding: '0 40px', fontSize: '1.1rem', borderRadius: '25px' }}
          onClick={() => {
            document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Start Practicing
        </Button>
      </div>

      {/* Categories Section */}
      <div id="categories-section" style={{ padding: isMobile ? '40px 16px' : '60px 50px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={2}>Explore Categories</Title>
          <Paragraph type="secondary">Choose a topic to start practicing questions.</Paragraph>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {categories.map((category) => (
              <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                <Card
                  hoverable
                  style={{ height: '100%', borderRadius: '12px', transition: 'transform 0.2s' }}
                  bodyStyle={{ padding: '24px' }}
                  onClick={() => navigate(`/categories/${category.id}`)}
                >
                  <BookOutlined style={{ fontSize: '32px', color: '#1677ff', marginBottom: '16px' }} />
                  <Title level={4} style={{ marginBottom: '12px' }}>{category.name}</Title>
                  <Paragraph type="secondary" ellipsis={{ rows: 3 }}>
                    {category.description || 'Practice questions for this category.'}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      
    </div>
  );
};

export default HomePage;
