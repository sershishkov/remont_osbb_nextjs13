import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { weCanDo } from '@/constants/description_weCanDo';

export default function Home() {
  return (
    <>
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h3' align='center'>
            Компания Олимп
          </Typography>
          <Typography variant='h5' align='center'>
            Наша компания осуществляет услуги по ремонтам для ОСББ, так же мы
            работаем с физическими лицами
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='h5' align='center'>
            Основные наши направления:
          </Typography>
        </Grid>

        {weCanDo.map((item) => (
          <Grid item key={item.workName}>
            <Typography variant='h6' align='center'>
              {item.workName}
            </Typography>
            <List>
              <Grid container direction='column' alignItems='center'>
                {item.works.map((work) => (
                  <Grid item key={work}>
                    <ListItem>
                      <Typography variant='body2'>{work}</Typography>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
