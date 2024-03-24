import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function RemsBudjetCc1ToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const servWorkShortForJournal = currentContract?.servWorkShortForJournal;
  const whereWirkIsPerfomed = currentContract?.whereWirkIsPerfomed;
  const lifeTime = currentContract?.lifeTime;
  const zvedeniySumBudjet = currentContract?.zvedeniySumBudjet;
  const prognozZbytok = zvedeniySumBudjet * 0.45 * (1 - 0.5 * lifeTime * 0.01);

  const contractDescription = currentContract?.contractDescription;

  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  return (
    <div className={classes.page} id='page'>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
        mt={2}
      >
        Розрахунок
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
      >
        класу наслідків (відповідальності) для об’єкта будівництва:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
        mb={2}
      >
        « {contractDescription} »
      </Typography>

      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        При визначенні класу наслідків (відповідальності) об’єкта
        використовувались наступні документи:
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        1. Закон України від 17.02.2011 №3038-VI «Про регулювання містобудівної
        діяльності» (з урахуванням змін та доповнень).
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        2. ДСТУ 8855:2019 «Визначення класу наслідків (відповідальності)».
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        3. ДБН В. 1.2-14:2018 «Загальні принципи забезпечення надійності та
        конструктивної безпеки будівель і споруд».
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        4. «Методика оцінки збитків від наслідків надзвичайних ситуацій
        техногенного та природного характеру», що затверджена постановою
        Кабінету Міністрів України від 15 лютого 2002 р. №175.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        5. Згідно п.4.3 ДСТУ 8855:2019 клас наслідків (відповідальності) може
        бути визначено для частини (відокремленої частини) об’єкту.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        {' '}
        Відповідно п.3.2.25 ДБН А.2.2-3:2014 частина будівлі - це визначена
        проектною документацією на реконструкцію, капітальний ремонт або
        технічне переоснащення частина об’єкта, якою не передбачається
        збільшення навантажень на фундаменти, мережі тепло-, водо, газо-,
        електропостачання та/або втручання в несучі та огороджувальні
        конструкції, а також інженерні системи загального користування об’єкта
        без повного призупинення його використання за функціональним
        призначенням.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        За проектом виконується капітальний ремонт: {servWorkShortForJournal}.
        Роботи виконуються {whereWirkIsPerfomed} без повного призупинення його
        функціонування, тому розрахунок визначається для частини (відокремленої
        частини) об’єкту.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        Відповідно до п.4.4 ДСТУ 8855:2019 клас наслідків (відповідальності)
        визначається за кожною характеристикою таблиці 1, додатково враховується
        стаття 32 Закону України від 17.02.2011 №3038-VI «Про регулювання
        містобудівної діяльності» (з урахуванням змін та доповнень), а також
        розділ 5 ДБН В.1.2-14:2018 та додаткові умови за п.4.15 ДСТУ 8855:2019.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-chapter']}>
        Визначення класу наслідків (відповідальності) об’єкта
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        1. Можлива небезпека для здоров&apos;я та життя людей, які постійно
        знаходяться на об’єкті (кількість людей) - 0.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        За цією характеристикою об&apos;єкт відноситься до класу наслідків -
        СС1.
      </Typography>

      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        2. Кількість осіб, які періодично перебувають на об’єкті будівництва не
        нормується та не повинно перевищувати верхнє значення (99 осіб). У
        відповідності з ДСТУ 8855:2019 об’єкт будівництва відноситься до класу
        наслідків (відповідальності) СС1.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        За цією характеристикою об&apos;єкт відноситься до класу наслідків - СС1
      </Typography>

      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        3. Кількість, які перебувають зовні об&apos;єкта, не нормується та не
        повинно перевищувати верхнє значення (99 осіб).
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        За цією характеристикою об&apos;єкт відноситься до класу наслідків - СС1
      </Typography>

      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        4. Можливі матеріальні збитки оцінюються витратами, пов ’язаними як з
        необхідністю відновлення об’єкта, що відмовив, так і з побічними
        збитками (збитки від зупинки виробництва, втрачена вигода).
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        Прогнозований обсяг збитку від можливого руйнування чи пошкодження
        об’єкту згідно з ДСТУ 8855:2019 п.4.12 розраховується за формулою:
      </Typography>
      <Typography variant='h4' align='center'>
        Ф = C х P x (1-½Tef x Ka,i)
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        де:
      </Typography>

      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        Ф - прогнозовані збитки, грн.: ( {prognozZbytok?.toFixed(2)} );
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        C - коефіцієнт, що враховує відносну долю вартості об’єкта, повністю
        втраченої під час аварії. Значення с можна оцінювати при аналізі
        сценарію розвитку аварії: (0,45);
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        Р — вартість об’єкта, визначена на підставі «Правил визначення вартості
        будівництва» (ДСТУ Б Д. 1.1-1:2013) або за об’єктом- аналогом, грн.: (
        {zvedeniySumBudjet?.toFixed(2)} );
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        Tef- середнє значення розрахункового строку експлуатації об’єкта, років:
        ({lifeTime});
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        Ка,і - коефіцієнт амортизаційних відрахувань: (0,01).
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        Прогнозований обсяг збитку від можливого руйнування об’єкта дорівнює:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
      >
        <strong>
          Ф = 0,45 * {zvedeniySumBudjet?.toFixed(2)} * (1 -1/2 * {lifeTime} *
          0,01) ={prognozZbytok?.toFixed(2)} грн.
        </strong>
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        Можливі матеріальні збитки та/чи соціальні втрати від відмови об’єкта
        оцінюють, керуючись «Методикою оцінки збитків від наслідків
        надзвичайній: ситуацій техногенного та природного та розраховують за
        формулою (1) цієї Методики. Ці збитки складають:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
      >
        <strong>Ф = 0 грн. </strong>
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        Загальний обсяг збитків дорівнює:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
      >
        <strong>
          Ф = {prognozZbytok?.toFixed(2)} + 0 = {prognozZbytok?.toFixed(2)} грн.{' '}
        </strong>
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        обсяг можливого економічного збитку у м.р.з.п. складає:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budj-cc1-main']}
        align='center'
      >
        <strong>8325 / 6700 = 1,25 м.р.з.п. </strong>
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        За цією характеристикою об&apos;єкт відноситься до класу наслідків -
        СС1.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        5. Спорудження об’єкта не загрожує призупиненням функціонування лінійних
        об&apos;єктів інженерно-транспортної інфраструктури, об’єктів
        комунікації, зв’язку, енергетики та інженерних мереж .
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-indent']}>
        За цією характеристикою об&apos;єкт відноситься до класу наслідків -
        СС1.
      </Typography>
      <Typography variant='body2' className={classes['rems-budj-cc1-main']}>
        6. Додаткові умови згідно з пунктом 4.15 ДСТУ 8855:2019: не встановлено.
        Висновок. Відповідно до п.6 статті 32 Закону України «Про регулювання
        містобудівної діяльності» (з урахуванням змін та доповнень), а також
        п.4.4 ДСТУ 8855:2019 клас наслідків (відповідальності) для даного
        об’єкту встановлюється за найвищою характеристикою можливих наслідків,
        отриманих за результатами розрахунків, тобто « {contractDescription} »
        відноситься до класу наслідків (відповідальності) - СС1.
      </Typography>
      <TableContainer id='rems-budj-cc1-sign'>
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
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                  mt={2}
                  mb={2}
                >
                  Інженер проектувальник
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                  align='right'
                  mt={2}
                  mb={2}
                >
                  Любов ПАСТУШОК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                  mb={2}
                >
                  ФОП «Пастушок Л.І.»
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                  align='right'
                  mb={2}
                >
                  Любов ПАСТУШОК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                  align='right'
                ></Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                >
                  КП «Запоріжремсервіс» ЗМР
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budj-cc1-main']}
                  align='right'
                >
                  {clientFIOImen}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
