'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { worker_role } from '@/constants/constants';

import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import NavigationList from './NavigationList';
// import { MaterialUISwitch } from './MaterialUISwitch';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const pathname = usePathname();
  const pathStarts = pathname.split('/')[1];
  const isShowNavbar = !worker_role.includes(pathStarts);
  // const [themeChecked, set__themeChecked] = useState<boolean>(
  //   JSON.parse(localStorage.getItem('theme')!)
  // );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenDrawer(open);
    };

  // const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   set__themeChecked(event.target.checked);
  //   localStorage.setItem('theme', JSON.stringify(event.target.checked));
  // };
  return (
    <Box id='navbar'>
      <AppBar
        position='fixed'
        sx={{
          width: isShowNavbar ? '100%' : '95px',
          left: isShowNavbar ? undefined : 0,
        }}
      >
        <Toolbar sx={{ width: '100%' }}>
          <IconButton
            onClick={toggleDrawer(true)}
            size={isShowNavbar ? 'large' : 'small'}
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: isShowNavbar ? 2 : 0 }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <NavigationList toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>
          <IconButton
            component={Link}
            href='/'
            size={isShowNavbar ? 'large' : 'small'}
            edge='start'
            color='inherit'
            sx={{
              mr: isShowNavbar ? 2 : 0,
              display: isShowNavbar ? 'none' : 'block',
            }}
          >
            <HomeIcon />
          </IconButton>
          <Link
            href='/'
            sx={{
              //  flexGrow: 1,
              color: '#fff',
              display: isShowNavbar ? 'contents' : 'none',
            }}
          >
            Расчет Ремонтов
          </Link>

          {/* <MaterialUISwitch
            sx={{ m: 1 }}
            checked={themeChecked}
            onChange={toggleTheme}
          /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
