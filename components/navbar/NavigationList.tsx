'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

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
  refData_links,
  admin_links,
} from '@/constants/constants';

function NavigationList({ toggleDrawer }: { toggleDrawer: Function }) {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  const [openAuth, set__openAuth] = useState<boolean>(false);
  const [open__RefData, set__open__RefData] = useState<boolean>(false);
  const [open__Admin, set__open__Admin] = useState<boolean>(false);
  // const [open__accounting, set__open__accounting] = useState<boolean>(false);

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
      <ListItemButton onClick={() => set__openAuth(!openAuth)}>
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
                href='/user/profile'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <PersonPinIcon />
                </ListItemIcon>
                <ListItemText primary={`${user.name}`} />
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

      {user?.role === 'admin' && (
        <>
          <ListItemButton onClick={() => set__open__Admin(!open__Admin)}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='ADMINKA' />
            {open__Admin ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open__Admin} timeout='auto' unmountOnExit>
            <List disablePadding>
              {admin_links.map((item) => (
                <ListItemButton
                  key={item.link}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={item.link}
                  onClick={() => toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.caption}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}

      {manager_role.includes(user?.role!) && (
        <>
          <ListItemButton onClick={() => set__open__RefData(!open__RefData)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Справочники' />
            {open__RefData ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open__RefData} timeout='auto' unmountOnExit>
            <List disablePadding>
              {refData_links.map((item) => (
                <ListItemButton
                  key={item.link}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={item.link}
                  onClick={() => toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.caption}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
}

export default NavigationList;
