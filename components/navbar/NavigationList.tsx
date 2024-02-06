'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import ListItemCollapse from './ListItemCollapse';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupIcon from '@mui/icons-material/Group';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {
  manager_role,
  accountant_role,
  accountant_refData_links,
  manager_refData_links,
  manager_Docums_links,
  admin_links,
} from '@/constants/constants';

function NavigationList({
  toggleDrawer,
}: Readonly<{ toggleDrawer: Function }>) {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  const [openAuth, setOpenAuth] = useState<boolean>(false);

  const onLogout = () => {
    signOut();
    router.push('/');
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      onClick={() => toggleDrawer(false)}
    >
      <ListItemButton onClick={() => setOpenAuth(!openAuth)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Пользователь' />
        {openAuth ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAuth} timeout='auto' unmountOnExit>
        <List disablePadding>
          {user ? (
            <>
              <ListItemButton
                // sx={{ pl: 4 }}
                component={Link}
                href='/user'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <QuestionMarkIcon />
                </ListItemIcon>
                <ListItemText primary='Информация' />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  toggleDrawer(false);
                  onLogout();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Выход' />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/user/profile/updatedetails'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <PersonPinIcon />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/auth/register'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary='Регистрация' />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/auth/login'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Вход' />
              </ListItemButton>
            </>
          )}
        </List>
      </Collapse>

      <ListItemCollapse
        caption='ADMINKA'
        toggleDrawer={toggleDrawer}
        userRole={user?.role!}
        allowedRoles={['admin']}
        linksToShow={admin_links}
        groupIcon={AdminPanelSettingsIcon}
        itemIcon={InboxIcon}
      />

      <ListItemCollapse
        caption='Справочники Менедж'
        toggleDrawer={toggleDrawer}
        userRole={user?.role!}
        allowedRoles={manager_role}
        linksToShow={manager_refData_links}
        groupIcon={GroupIcon}
        itemIcon={InboxIcon}
      />
      <ListItemCollapse
        caption='Первичка бух'
        toggleDrawer={toggleDrawer}
        userRole={user?.role!}
        allowedRoles={manager_role}
        linksToShow={manager_Docums_links}
        groupIcon={GroupIcon}
        itemIcon={InboxIcon}
      />

      <ListItemCollapse
        caption='Справочники Бух'
        toggleDrawer={toggleDrawer}
        userRole={user?.role!}
        allowedRoles={accountant_role}
        linksToShow={accountant_refData_links}
        groupIcon={GroupIcon}
        itemIcon={InboxIcon}
      />
    </List>
  );
}

export default NavigationList;
