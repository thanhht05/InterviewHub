import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Spin, message, Radio, Tag, Empty, Button, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { categoryService } from '../../../services/categoryService';
import { questionService } from '../../../services/questionService';
import { progressService } from '../../../services/progressService';
import { useThemeContext } from '../../../contexts/ThemeContext';
const { Title, Paragraph } = Typography;

const CategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const { token } = theme.useToken();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [difficulty, setDifficulty] = useState('ALL');
  const [filterLearned, setFilterLearned] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  useEffect(() => {
    fetchQuestions();
  }, [id, difficulty, filterLearned, isAuthenticated]);

  const fetchCategory = async () => {
    setLoadingCategory(true);
    try {
      const response = await categoryService.getCategoryById(id);
      setCategory(response.data);
    } catch (error) {
      console.error('Failed to fetch category:', error);
      message.error('Failed to load category details.');
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const params = {
        categoryId: id,
        page: 0,
        size: 100, // Fetch up to 100 questions for this category
      };

      if (filterLearned && isAuthenticated) {
        const response = await progressService.getLearnedQuestionsByCategory(id, params);
        let learnedQs = response.data.data;
        if (difficulty !== 'ALL') {
          learnedQs = learnedQs.filter(q => q.difficulty === difficulty);
        }
        setQuestions(learnedQs);
      } else {
        if (difficulty !== 'ALL') {
          params.difficulty = difficulty;
        }
        const response = await questionService.getAllQuestions(params);
        setQuestions(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      message.error('Failed to load questions.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'HARD': return 'volcano';
      case 'MEDIUM': return 'geekblue';
      case 'EASY': return 'green';
      default: return 'default';
    }
  };

  if (loadingCategory) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!category) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Empty description="Category not found" />
        <Button type="primary" onClick={() => navigate('/')} style={{ marginTop: 20 }}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px - 70px)', padding: '20px 20px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ color: token.colorPrimary }}>{category.name}</Title>
        <Paragraph style={{ fontSize: '1.1rem', color: token.colorTextSecondary }}>
          {category.description || 'Practice questions for this category.'}
        </Paragraph>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 500, color: token.colorText }}>Filter by Difficulty:</span>
          <Radio.Group value={difficulty} onChange={handleDifficultyChange} buttonStyle="solid">
            <Radio.Button value="ALL">All</Radio.Button>
            <Radio.Button value="EASY">Easy</Radio.Button>
            <Radio.Button value="MEDIUM">Medium</Radio.Button>
            <Radio.Button value="HARD">Hard</Radio.Button>
          </Radio.Group>
        </div>
        
        {isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: 500, color: token.colorText }}>Show:</span>
            <Radio.Group value={filterLearned} onChange={(e) => setFilterLearned(e.target.value)} buttonStyle="solid">
              <Radio.Button value={false}>All Questions</Radio.Button>
              <Radio.Button value={true}>Learned Only</Radio.Button>
            </Radio.Group>
          </div>
        )}
      </div>

      {/* Question List */}
      {loadingQuestions ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin />
        </div>
      ) : questions.length === 0 ? (
        <Empty description="No questions found for this category and difficulty." />
      ) : (
        <div style={{ background: token.colorBgContainer, borderRadius: '8px', overflow: 'hidden', border: `1px solid ${token.colorBorderSecondary}` }}>
          {questions.map((question, index) => (
            <div 
              key={question.id}
              style={{
                padding: '16px 24px',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: index < questions.length - 1 ? `1px solid ${token.colorBorderSecondary}` : 'none',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = token.colorFillAlter}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => navigate(`/questions/${question.id}`)}
            >
              <span style={{ fontWeight: 500, fontSize: '1.05rem', color: token.colorText }}>
                {question.title}
              </span>
              <Tag color={getDifficultyColor(question.difficulty)} style={{ margin: 0 }}>
                {question.difficulty}
              </Tag>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CategoryDetailPage;
