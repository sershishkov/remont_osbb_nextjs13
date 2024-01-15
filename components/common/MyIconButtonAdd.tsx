import Link from '@mui/material/Link';

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function MyIconButtonAdd({ href }: { readonly href: string }) {
  return (
    <IconButton
      component={Link}
      href={href}
      sx={{ position: 'fixed', top: 70, left: 8, zIndex: 12 }}
    >
      <AddCircleIcon color='success' sx={{ fontSize: 50 }} />
    </IconButton>
  );
}

export default MyIconButtonAdd;
