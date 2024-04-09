import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsPotochnAktSkrRobotToPrint({
  currentContract,
  currentExecutor,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentExecutor: I_Client;
  currentClient: I_Client;
}>) {
  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName?.toLocaleUpperCase();
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient?.clientShortName;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  const contractDescription = currentContract?.contractDescription;
  const remsAktSkrytRabotWork = currentContract?.remsAktSkrytRabotWork;
  const remsAktSkrytRabotMaterial = currentContract?.remsAktSkrytRabotMaterial;
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='rems-potochn-akt-skryt'>
        <Table
          padding='none'
          sx={{
            width: '100%',
          }}
        >
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='right'
                >
                  ДБН А. З 1-5 2016
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='right'
                >
                  Додаток В
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                  align='center'
                >
                  Акт на закриття прихованих робіт № 1
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                  align='center'
                >
                  {remsAktSkrytRabotWork}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (найменування робіт)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                >
                  виконаних в: « {contractDescription} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (найменування і місце розташування об&apos;єкта)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='right'
                >
                  «____»______________202_ р.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  Представник будівельної організації:
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  {executorTypeShort} « {executorName} »
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  Представник замовника:
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  {clientTypeShort} {clientName}
                  {/* КП «Запоріжремсервіс» ЗМР */}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  провели огляд виконаних робіт і склали цей акт про наступне:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  1 До закриття пред&apos;явлені такі роботи:
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  {remsAktSkrytRabotWork}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                ></Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (найменування прихованих робіт)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  2 Роботи виконані за проектної документацією
                  _____________________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  3. При виконанні робіт застосовані
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  {remsAktSkrytRabotMaterial}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                ></Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (найменування матеріалів, конструкцій з посилання на
                  сертифікати або інші документи)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  4. При виконанні робіт відсутні (або допущені) відхілення від
                  проектної документації:
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  відхілення відсутні
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                ></Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (за наявності відхилень вказується, ким і як погоджені, №
                  креслень і дата погодження)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  5. Дата:
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  початку робіт ___________________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                ></Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  закінчення робіт ___________________________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                  align='center'
                >
                  Рішення :
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                  align='center'
                >
                  Роботи виконані відповідно стандартів, будівельних норм і
                  правил, технічних умов і відповідають вимогам їх прийняття.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                  align='center'
                >
                  На основі викладеного дозволяється виконання наступних робіт:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-chapter']}
                  align='center'
                >
                  {remsAktSkrytRabotWork}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                  mb={3}
                >
                  (найменування робіт і конструкцій)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '40%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                >
                  Представник будівельної организації
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='center'
                >
                  _______________________
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='center'
                >
                  {executorFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (підпись)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (Прізвище , ім&apos;я, по батькові)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  mt={5}
                >
                  Представник организації
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='center'
                  mt={5}
                >
                  _______________________
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                  align='center'
                  mt={5}
                >
                  _______________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-text']}
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (підпись)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  align='center'
                >
                  (Прізвище , ім&apos;я, по батькові)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-skryt-sub']}
                  mt={2}
                >
                  Примітка. Керівник Генпідрядної організації не пізніше ніж за
                  5 днів інформує учасників про дату і місце проведення роботи
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
