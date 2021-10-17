import React, { Fragment, useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import _ from 'lodash';
import { history } from '../../App';
import { USER_LOGIN, ACCESS_TOKEN } from '../../util/settings/config'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './AdminTemplate.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {

  const { Component, ...restProps } = props;

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    // console.log(collapsed);
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này!");
    return <Redirect to="/" />
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này!");
    return <Redirect to="/" />
  }

  const operations = <Fragment>
    {!_.isEmpty(userLogin) ? <Fragment>
      <div style={{display:'flex', flexDirection:'row', justifyContent: 'end', alignItems: 'center'}}>
        <button onClick={() => {
          history.push('./profile')
        }} className="text-xl self-center rounded btn-logged-user">
          <div style={{ width: '50px', height: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '0.9rem', textAlign: 'center', fontSize: '18px', backgroundColor: 'coral' }} className="rounded-full text-white">{userLogin.taiKhoan.substr(0, 1)}</div>
        </button>
        <button className="btn-sign-out" onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(ACCESS_TOKEN);
          history.push('/home');
          window.location.reload();
        }} style={{ width: 'fit-content', padding: '0 1rem', fontSize: '1rem', backgroundColor: 'rgba(0, 21, 41)', height: '60px', color: '#fff', marginLeft:'1rem', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem'}}>{t('Đăng xuất')}</button>
      </div>

    </Fragment> : ''}
  </Fragment>

  return <Route {...restProps} render={(propsRoute) => {
    return <Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo p-5">
            <span style={{ color: '#fff', fontSize: '35px' }}>H∴Cinema</span>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
              <NavLink to="/admin/films">Films</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <NavLink to="/admin/films">Showtime</NavLink>
            </Menu.Item>
            {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
              </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <div className="text-right pr-10 pt-1">{operations}</div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}

export default AdminTemplate;