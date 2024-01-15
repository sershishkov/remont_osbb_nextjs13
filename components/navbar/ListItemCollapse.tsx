import React, { useState } from 'react';

import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface LinkToShow {
  link: string;
  caption: string;
}

interface LocalProps {
  readonly caption: string;
  readonly toggleDrawer: Function;
  readonly userRole: string;
  readonly allowedRoles: string[];
  readonly linksToShow: LinkToShow[];
  readonly groupIcon: any;
  readonly itemIcon: any;
}

function ListItemCollapse({
  caption,
  toggleDrawer,
  userRole,
  allowedRoles,
  linksToShow,
  groupIcon,
  itemIcon,
}: //
//
LocalProps) {
  const [open__Data, setOpen__Data] = useState<boolean>(false);
  const GroupIcon = groupIcon;
  const ItemIcon = itemIcon;
  return (
    <>
      {allowedRoles.includes(userRole) && (
        <>
          <ListItemButton
            onClick={() => setOpen__Data((prevState) => !prevState)}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={caption} />
            {open__Data ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open__Data} timeout='auto' unmountOnExit>
            <List disablePadding>
              {linksToShow.map((item) => (
                <ListItemButton
                  key={item.link}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={item.link}
                  onClick={() => toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <ItemIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.caption}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
}

export default ListItemCollapse;
