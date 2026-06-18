import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Spin, message, Button, Tag, Empty, theme, Space, Grid } from 'antd';
import { ArrowLeftOutlined, EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useSelector } from 'react-redux';

import { questionService } from '../../../services/questionService';
import { progressService } from '../../../services/progressService';
import { useThemeContext } from '../../../contexts/ThemeContext';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const isMobile = screens.md === false;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progressStatus, setProgressStatus] = useState(null);
  const [markingProgress, setMarkingProgress] = useState(false);

  useEffect(() => {
    fetchQuestion();
    if (isAuthenticated) {
      fetchProgress();
    }
  }, [id, isAuthenticated]);

  const fetchProgress = async () => {
    try {
      const response = await progressService.getQuestionProgress(id);
      if (response.data?.data) {
        setProgressStatus(response.data.data.status);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const handleToggleLearned = async () => {
    if (!isAuthenticated) {
      message.info('Please log in to track your learning progress.');
      navigate('/login');
      return;
    }
    
    const newStatus = progressStatus === 'MASTERED' ? 'LEARNING' : 'MASTERED';
    setMarkingProgress(true);
    try {
      await progressService.markQuestionStatus({ questionId: id, status: newStatus });
      setProgressStatus(newStatus);
      message.success(newStatus === 'MASTERED' ? 'Question marked as learned!' : 'Question unlearned!');
    } catch (error) {
      console.error('Failed to update progress:', error);
      message.error('Failed to update progress.');
    } finally {
      setMarkingProgress(false);
    }
  };

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await questionService.getQuestionById(id);
      setQuestion(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch question:', error);
      message.error('Failed to load question details.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'HARD': return 'volcano';
      case 'MEDIUM': return 'geekblue';
      case 'EASY': return 'green';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!question) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Empty description="Question not found" />
        <Button type="primary" onClick={() => navigate(-1)} style={{ marginTop: 20 }}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px - 70px)', maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '16px' : '20px 40px' }}>

      {/* Back Button */}
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ paddingLeft: 0, marginBottom: '20px' }}
      >
        Back
      </Button>

      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <Title level={isMobile ? 3 : 2} style={{ color: token.colorPrimary, margin: 0, flex: 1, minWidth: isMobile ? 'auto' : '300px' }}>
          {question.title}
        </Title>
        <Tag color={getDifficultyColor(question.difficulty)} style={{ fontSize: '1rem', padding: '4px 12px' }}>
          {question.difficulty}
        </Tag>
      </div>



      {/* Action Area */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Space size={isMobile ? 'middle' : 'large'} direction={isMobile ? 'vertical' : 'horizontal'} style={{ width: isMobile ? '100%' : 'auto' }}>
          <Button
            type="primary"
            size="large"
            block={isMobile}
            icon={showAnswer ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </Button>
          
          <Button
            type={progressStatus === 'MASTERED' ? 'default' : 'primary'}
            size="large"
            block={isMobile}
            icon={progressStatus === 'MASTERED' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <CheckOutlined />}
            onClick={handleToggleLearned}
            loading={markingProgress}
            style={progressStatus === 'MASTERED' ? { borderColor: '#52c41a', color: '#52c41a' } : { background: '#52c41a' }}
          >
            {progressStatus === 'MASTERED' ? 'Unlearn' : 'Mark as Learned'}
          </Button>
        </Space>
      </div>

      {/* Answer Section */}
      {showAnswer && (
        <div
          data-color-mode={isDarkMode ? 'dark' : 'light'}
          className="markdown-preview"
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            padding: isMobile ? '16px' : '24px',
            borderRadius: '8px',
            background: token.colorBgContainer
          }}
        >
          <MarkdownEditor.Markdown
            source={question.answerMarkdown || '*No answer provided.*'}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default QuestionDetailPage;
