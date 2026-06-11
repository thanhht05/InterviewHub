import React from 'react';
import { Layout, Menu, Button, Space, ConfigProvider, theme, Switch } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ThemeProvider, useThemeContext } from '../../contexts/ThemeContext';

const { Header, Content, Footer } = Layout;

const MainLayoutContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeContext();
  
  const {
    token: { colorBgContainer, colorTextBase, colorBorderSecondary },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const navItems = [
    { key: '/', label: 'Home' },
    // Add more public links here later
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* We need an inner layout so that it correctly picks up the ConfigProvider's theme tokens */}
      <Layout style={{ minHeight: '100vh', background: colorBgContainer }}>
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: colorBgContainer, 
          padding: '0 50px',
          borderBottom: `1px solid ${colorBorderSecondary}`,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%'
        }}>
          <div 
            style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#1677ff', 
              cursor: 'pointer' 
            }}
            onClick={() => navigate('/')}
          >
            InterviewHub
          </div>
          
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={navItems}
            onClick={handleMenuClick}
            style={{ flex: 1, justifyContent: 'center', borderBottom: 'none', background: 'transparent' }}
          />
          
          <Space size="large">
            <Switch 
              checked={isDarkMode} 
              onChange={toggleTheme} 
              checkedChildren={<MoonOutlined />} 
              unCheckedChildren={<SunOutlined />} 
            />
            <Space>
              <Button type="text" onClick={() => navigate('/login')} style={{ color: colorTextBase }}>Login</Button>
              <Button type="primary" onClick={() => navigate('/signup')}>Sign Up</Button>
            </Space>
          </Space>
        </Header>

        <Content style={{ background: colorBgContainer, color: colorTextBase }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center', background: colorBgContainer, color: colorTextBase, borderTop: `1px solid ${colorBorderSecondary}` }}>
          InterviewHub ©{new Date().getFullYear()} Created to help you master your next interview
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

const MainLayout = () => {
  return (
    <ThemeProvider>
      <MainLayoutContent />
    </ThemeProvider>
  );
};

export default MainLayout;
