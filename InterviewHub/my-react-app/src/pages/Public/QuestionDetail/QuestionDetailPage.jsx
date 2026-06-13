import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Spin, message, Button, Tag, Empty, theme } from 'antd';
import { ArrowLeftOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import MarkdownEditor from '@uiw/react-markdown-editor';

import { questionService } from '../../../services/questionService';
import { useThemeContext } from '../../../contexts/ThemeContext';

const { Title, Paragraph } = Typography;

const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const { token } = theme.useToken();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

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
    <div style={{ minHeight: 'calc(100vh - 64px - 70px)', maxWidth: '1200px', margin: '0 auto' }}>

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
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <Title level={2} style={{ color: token.colorPrimary, margin: 0, flex: 1, minWidth: '300px' }}>
          {question.title}
        </Title>
        <Tag color={getDifficultyColor(question.difficulty)} style={{ fontSize: '1rem', padding: '4px 12px' }}>
          {question.difficulty}
        </Tag>
      </div>



      {/* Action Area */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Button
          type="primary"
          size="large"
          icon={showAnswer ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
      </div>

      {/* Answer Section */}
      {showAnswer && (
        <div
          data-color-mode={isDarkMode ? 'dark' : 'light'}
          className="markdown-preview"
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            padding: '24px',
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
