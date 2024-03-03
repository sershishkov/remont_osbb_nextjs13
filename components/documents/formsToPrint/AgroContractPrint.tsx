import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from './styles.module.scss';

export default function AgroContractPrint({
  currentContract,
  currentOurFirm,
  currentClient,
  naklSum,
  aktSum,
}: Readonly<{
  currentContract: I_Contract;
  currentOurFirm: I_Client;
  currentClient: I_Client;
  naklSum: number;
  aktSum: number;
}>) {
  const contrNumber = currentContract?.contractNumber;
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const contrYearStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  const guaranteePeriod = currentContract?.guaranteePeriod;

  const prepaymentPercentage = currentContract?.prepaymentPercentage;
  const totalSum = naklSum + aktSum;
  const prePayPercentSum =
    Math.round(
      ((totalSum * prepaymentPercentage) / 100 + Number.EPSILON) * 100
    ) / 100;
  const restPrePayPercentSum =
    Math.round((totalSum - prePayPercentSum + Number.EPSILON) * 100) / 100;
  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);
  const prePayPercentSumPropis = FloatToSamplesInWordsUkr(
    isNaN(prePayPercentSum) ? 0 : prePayPercentSum
  );
  const restPrePayPercentSumPropis = FloatToSamplesInWordsUkr(
    isNaN(restPrePayPercentSum) ? 0 : restPrePayPercentSum
  );
  const arr__totalSum = totalSum.toFixed(2).split('.');
  const arr__prePayPercentSum = prePayPercentSum.toFixed(2).split('.');
  const arr__restPrePayPercentSum = restPrePayPercentSum.toFixed(2).split('.');

  const contractDescription = currentContract.contractDescription;

  //@ts-ignore
  const clientTypeLong = currentClient?.firmType?.firmTypeLongName;
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  const clientName = currentClient.clientShortName;

  const clientJobTitleRod = currentClient.jobTitle_rodit;
  const clientJobTitleimen = currentClient.jobTitle;
  const clientFIORodit = `${currentClient.lastName_rodit} ${currentClient.firstName_rodit} ${currentClient.patronymic_rodit}`;
  const clientFIOImen = `${
    currentClient.firstName_imen
  } ${currentClient.lastName_imen?.toLocaleUpperCase()}`;
  const clientActsOn = currentClient.whichActsOnTheBasis;
  const clientIBAN = currentClient.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient.edrpou}`;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const clientTel = `${
    currentClient?.telNumber ? `Тел:${currentClient?.telNumber}` : ''
  }`;
  const clientEmail = `${
    currentClient?.email ? `email:${currentClient?.email}` : ''
  }`;

  const executorName = currentOurFirm.clientShortName;
  const executorJobTitleRod = currentOurFirm.jobTitle_rodit;
  const executorJobTitleimen = currentOurFirm.jobTitle;
  const executorFIORodit = `${currentOurFirm.lastName_rodit} ${currentOurFirm.firstName_rodit} ${currentOurFirm.patronymic_rodit}`;
  const executorFIOImen = `${
    currentOurFirm.firstName_imen
  } ${currentOurFirm.lastName_imen?.toLocaleUpperCase()}`;
  const executorActsOn = currentOurFirm.whichActsOnTheBasis;
  //@ts-ignore
  const executorTaxationType = currentOurFirm.taxationType?.taxationTypeName;

  const executorIBAN = currentOurFirm.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentOurFirm.edrpou}`;

  //@ts-ignore
  const executorTypeLong = currentOurFirm?.firmType?.firmTypeLongName;
  //@ts-ignore
  const executorTypeShort = currentOurFirm?.firmType?.firmTypeShortName;
  const executorAddress = `${currentOurFirm?.postIndex} ${currentOurFirm?.address}`;
  const executorTel = `${
    currentOurFirm?.telNumber ? `Тел:${currentOurFirm?.telNumber}` : ''
  }`;
  const executorEmail = `${
    currentOurFirm?.email ? `email:${currentOurFirm?.email}` : ''
  }`;

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-agro-header' sx={{ marginBottom: 2 }}>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
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
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['agro-contract-chapter']}
                  align='center'
                >
                  ДОГОВІР ПІДРЯДУ № {contrNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='center'
                >
                  (типова форма)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='left'
                >
                  м. Київ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='right'
                >
                  {contrDateStr}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        <strong>{clientTypeLong}</strong> <strong>« {clientName} »</strong> , в
        особі {clientJobTitleRod} {clientFIORodit} , що діє на підставі{' '}
        {clientActsOn}, надалі іменується «ЗАМОВНИК», та
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        <strong>{executorTypeLong}</strong> <strong> «{executorName}»</strong> ,
        надалі іменується « ПІДРЯДНИК » в особі {executorJobTitleRod}{' '}
        {executorFIORodit}, що діє на підставі {executorActsOn}{' '}
        {executorTaxationType}, з іншого боку, кожна окремо - Сторона, а разом –
        Сторони уклали даний Договір про наступне:
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        1.1. Замовник доручає, а Підрядник приймає на себе зобов&apos;язання по
        виконанню наступних робіт (далі – роботи):{' '}
        <strong>{contractDescription}</strong>, а Замовник зобов&apos;язується в
        терміни і на умовах цього договору прийняти та оплатити якісно і
        своєчасно виконані роботи.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        1.2. Обсяги, склад і вартість робіт за даним Договором визначаються
        Сторонами шляхом підписання договірної ціни та кошторисної документації,
        які є невід&apos;ємною частиною даного Договору.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        2. СТРОКИ ТА УМОВИ ХОДУ ВИКОНАННЯ РОБІТ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.1. Матеріально-технічне забезпечення для виконання робіт за цим
        договором покладається на Підрядника. Матеріали, використовувані
        Підрядником, повинні відповідати державним стандартам та технічним
        умовам.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.2. Підрядник зобов&apos;язується приступити до робіт протягом 3
        банківських днів після отримання передоплати згідно умов п.3.2.2 цього
        Договору, та виконати роботи протягом 10 календарних днів.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.3. Підрядник має право, керуючись своїми специфічними та професійними
        знаннями, закінчити роботи достроково за умови дотримання якості
        виконуваних робіт.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.4. Виконані роботи приймаються Замовником за актом прийому-здачі
        виконаних робіт (за формою КБ-2в), які надаються Підрядником Замовнику
        протягом 5 календарних днів з моменту виконання робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.5. При підписанні договору Сторони узгоджують процедуру підписання
        Акту, у разі недотримання якої роботи вважаються невиконаними:
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.5.1. Підрядник після виконання робіт готує документи і передає їх
        (будь-яким зручним для Сторін способом у встановлений термін) на розгляд
        і підписання Замовнику.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.5.2. На розгляд і підписання (затвердження) Акту, тобто на прийом
        виконаної роботи, Замовнику відводиться п&apos;ять робочих днів.
        Замовник зобов&apos;язується в зазначений строк або підписати Акт або в
        той же термін надати мотивовану відмову від підписання.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.5.3. У випадку, якщо у Замовника з&apos;являються обґрунтовані
        зауваження та претензії щодо якості виконаних робіт, згідно предмета
        даного Договору, то він складає перелік претензій (зауважень), що
        додається до акта (п. 2.4.) і Сторони визначають терміни (не більше
        одного місяця) їх усунення. Підрядник зобов&apos;язаний за свій рахунок
        усунути обґрунтовані зауваження Замовника до якості виконаних робіт. При
        наявності обґрунтованих претензій (зауважень) Замовника, Підрядником
        здійснює усунення таких претензій (зауважень) за власний рахунок
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.5.4. Моментом підписання Акту (тобто прийому виконаної роботи) є дати
        підписання документів Замовником, якщо інша дата не проставляється
        Замовником при фактичному підписанні документів або якщо інше не
        обумовлено договором.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.6. Оплата за виконані роботи здійснюється Замовником протягом 5
        (п&apos;яти) банківських днів після усунення Підрядником претензій
        (зауважень), і підписання актів виконаних робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        2.7. При відмові Підрядника усунути виявлені недоліки виконаних робіт,
        Замовник має право залучити для усунення таких недоліків третіх осібі
        стягнути з Підрядника всі витрати, пов&apos;язані з усуненням недоліків
        виконаних робіт.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        3. ЦІНА ДОГОВОРУ ТА УМОВИ ОПЛАТИ
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        3.1. Загальна вартість робіт включає всі витрати Підрядника на виконання
        даних робіт, визначається на підставі розрахунку договірної ціни і
        становить {arr__totalSum[0]} грн {arr__totalSum[1]} коп (
        {totalSumPropis}), без ПДВ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        3.2. Оплата здійснюється «Замовником» шляхом перерахування на
        розрахунковий рахунок «Підрядника» коштів в наступному порядку:
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        3.2.1 Попередня оплата {prepaymentPercentage} %, у розмірі{' '}
        {arr__prePayPercentSum[0]} грн {arr__prePayPercentSum[1]} коп (
        {prePayPercentSumPropis} )
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        3.2.1 Остаточна оплата, у розмірі {arr__restPrePayPercentSum[0]} грн{' '}
        {arr__restPrePayPercentSum[1]} коп ({restPrePayPercentSumPropis} ) по
        даному Договору, здійснюється протягом 3 банківських днів після дати
        підписання Сторонами акту виконаних робіт.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        4. ПРАВА ТА ОБОВ&apos;ЯЗКИ СТОРІН
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        Сторони виконують свої обов&apos;язки сумлінно і в належному вигляді.
        Крім обов&apos;язків, зазначених у інших розділах цього договору,
        сторони зобов&apos;язані:
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1. Підрядник зобов&apos;язаний:
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.1. Своєчасно і належним чином (згідно умов договору) виконати свої
        зобов&apos;язання за цим договором.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.2. Виконати роботи якісно із застосуванням якісних матеріалів, з
        дотриманням встановлених законодавством технічних норм і правил.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.3. Своєчасно оформляти документацію за цим договором.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.4. Попередити Замовника про наявність більш економного варіанту
        виконання робіт за умови, що така економія не спричинить за собою
        зниження якості робіт в цілому.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.5. Цим Підрядник підтверджує і гарантує Замовнику професійну
        компетентність своїх фахівців для проведення робіт
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.6. Вправі залучати для виконання зобов&apos;язань за даним Договором
        третіх осіб, залишаючись відповідальним перед Замовником за результати
        робіт, виконаних такими залученими третіми особами в повному обсязі.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.7. Зобов&apos;язується забезпечити і нести відповідальність, при
        виконанні робіт, як своїм персоналом, так і персоналом залучених третіх
        осіб, за дотримання санітарних правил, охорони праці та протипожежної
        безпеки, згідно вимог чинного законодавства та внутрішніх положень
        Замовника, зокрема організувати інструктаж залучених співробітників,
        створити безпечні умови праці і прийняти інші необхідні заходи безпеки.
        При нещасних випадках на виробництві під час виконання робіт цим
        договором, Підрядник самостійно організовує розслідування і облік таких
        випадків згідно вимог чинного законодавства України. Підрядник своїм
        наказом призначає осіб, відповідальних за виконання вимог законодавства
        України у сфері охорони праці. У тому числі правил пожежної безпеки,
        правил техніки безпеки та санітарно-гігієнічних норм, і несе
        відповідальність за недотримання зазначених норм
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.8. Підрядник гарантує, що він та/або залучені субпідрядники мають
        всі необхідні відповідно до вимог законодавства дозвільні та
        кваліфікаційні документи для виконання робіт за цим договором. Підрядник
        гарантує, що всі його працівники та працівники залучених субпідрядників
        мають необхідні відповідно до вимог законодавства дозволи та допуски для
        виконання робіт за цим договором.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.1.9. Підрядник зобов&apos;язаний протягом 5-ти днів після завершення
        виконання робіт (прийняття об&apos;єкта) звільнити будівельний майданчик
        від сміття, будівельних машин та механізмів, тимчасових споруд та
        приміщень. Якщо Підрядник не зробить цього у визначені строки, Замовник
        має право попередити Підрядника про вказане порушення, визначити
        необхідний строк для його усунення та у разі невжиття Підрядником
        заходів звільнити будівельний майданчик своїми силами або із залученням
        третіх осіб. Компенсація понесених витрат здійснюється за рахунок
        Підрядник.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.2. Замовник зобов&apos;язаний:
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.2.1. Своєчасно надати фахівцям Підрядника допуск до місця виконання
        робіт, передбачених цим Договором, забезпечити, при необхідності,
        підключення і доступ до електромережі.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.2.2. Проводити оплату на умовах цього договору.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.2.3. Прийняти якісно виконані роботи за актом прийому-здачі виконаних
        робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.3. Замовник має право:
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.3.1. Контролювати хід виконання робіт, в тому числі здійснювати
        технічний нагляд.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.3.2. Вимагати від Підрядника роз&apos;яснень, у тому числі і з
        наданням розшифрувань по будь-якій частині акту прийому-здачі виконаних
        робіт і Акт перевірки на будь-якому етапі виконання робіт
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.3.3. Вимагати від Підрядника заміни працівників Підрядника, якщо такі
        вимоги викликані об&apos;єктивними причинами (неякісними виконання
        робіт, халатність і не організованість роботи, грубі порушення при
        виробництві робіт, при дотриманні техніки безпеки, прогули, порушення
        термінів виконання робіт, явка на робоче місці в стані алкогольного
        сп&apos;яніння, інші).
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        4.3.4. У разі повного або часткового невиконання умов цього Договору з
        вини Підрядника, вправі вимагати у нього відповідного відшкодування.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        5. ВІДПОВІДАЛЬНІСТЬ СТОРІН
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.1. За невиконання чи неналежне виконання зобов&apos;язань за цим
        Договором, винна Сторона несе відповідальність відповідно до чинного
        законодавства України і зобов&apos;язана відшкодувати іншій стороні всі
        заподіяні таким невиконанням чи неналежним виконанням збитки.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.2. Підрядник несе відповідальність перед Замовником та третіми особами
        у разі заподіяння їм шкоди (збитків) в ході виконання робіт за цим
        Договором.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.3. За порушення Замовником строків остаточного розрахунку за
        Договором, Замовник виплачує пеню в розмірі подвійної облікової ставки
        НБУ, що діяла в момент порушення, від суми цього Договору, за кожний
        день прострочення, включаючи день фактичного виконання зобов&apos;язань.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.4. Підрядник несе відповідальність за якість виконуваних робіт і
        якість застосовуваних матеріалів, а також за дотримання державних
        стандартів, технічних умов згідно з чинним законодавством України.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.5. У випадку, якщо Підрядник своєчасно не приступив (без обґрунтованих
        причин) до виконання робіт або виконує її настільки повільно, що
        закінчення робіт у встановлений строк, стає явно неможливо, або в разі
        порушення строків здачі робіт більш ніж на 30 днів, Замовник має право
        відмовитися від даного Договору, а Підрядник зобов’язаний повернути на
        першу вимогу Замовника суму передоплати, сплачену останнім на умовах
        цього Договору, у повному обсязі.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.5.1. У разі якщо Підрядник порушує строк завершення (здачі) робіт, він
        сплачує Замовнику пеню в розмірі 0,5 % від загальної вартості робіт за
        цим договором, за кожний день прострочення виконання зобов&apos;язання.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.5.2. При порушенні Підрядником строку здачі робіт більш ніж на 10
        (десять) календарних днів, у відповідності зі строками, погодженими
        Сторонами у цьому Договорі (додатках до нього), останній сплачує
        Замовнику додатково штраф у розмірі 10% (десяти) від вартості робіт за
        цим договором.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.5.3. При порушенні Підрядником строку здачі робіт більш ніж на 20
        (двадцять) календарних днів, у відповідності зі строками, погодженими
        Сторонами у цьому Договорі (додатках до нього), останній
        зобов&apos;язується додатково сплатити Замовнику штраф у розмірі 20% від
        вартості робіт за цим договором. Штрафна неустойка в даному пункті
        означає, що Підрядник виплачує її понад інші неустойки та штрафні
        санкції, встановленої цим договором.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.6. У випадку накладання банківським установами штрафних санкцій на
        Замовника, у зв&apos;язку з простроченням виконання Підрядником робіт за
        цим Договором, Підрядник зобов’язується компенсувати такі документально
        підтверджені штрафні санкції Замовнику в повному обсязі, в строк 7
        календарних днів з моменту пред’явлення відповідної вимоги.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.7. Замовник має право затримати оплату до усунення Підрядником
        порушень. При цьому Підрядник не має права зрушувати терміни виконання
        робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.8. У разі виявлення Замовником грубих порушень від встановлених
        законодавством норм і правил в ході виконання робіт, Замовник має право
        відсторонити Підрядника від подальшого виконання робіт і розірвати цей
        договір. При цьому Підрядник компенсує Замовнику всі збитки, викликані
        розірванням цього договору, а сума перерахованої передоплати Замовника
        закриває тільки обсяг якісно виконаних робіт Підрядником. Суму
        передоплати, що залишилася з урахуванням індексу інфляції та 5
        (п&apos;ять)% річних за весь період користування чужими грошовими
        коштами від суми перерахованої передоплати поряд з виплатою штрафу в
        розмірі 5 (п&apos;ять)% від суми цього договору Підрядник сплачує
        Замовнику в строк не пізніше п&apos;яти банківських днів з дати
        фактичного відсторонення Підрядника. Під фактичним відстороненням
        мається на увазі наявність документа, підписаного Замовником або його
        повноважним представником (протокол, акт, лист, інше), направленого
        Підряднику або його повноважному представнику з врученням особисто або
        за допомогою поштового повідомлення.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        5.9.Сплата неустойки і збитків не звільняє Сторони від виконання
        зобов&apos;язань щодо усунення порушень і фактичного виконання
        зобов&apos;язань в натурі.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        6. ГАРАНТІЯ
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        6.1. Підрядник гарантує якість виконаних робіт протягом{' '}
        {guaranteePeriod} місяців з моменту підписання Сторонами акту
        приймання-здачі виконаних робіт. У разі неякісного виконання робіт
        Підрядник на вимогу Замовника усуває недоліки за власний рахунок.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        6.2. Всі дефекти, виявлені в гарантійний період, а також терміни їх
        усунення (не більше одного місяця) фіксуються в акті комісії, до складу
        якої входять представники Замовника і Підрядника. Складений акт протягом
        3 (трьох) днів комісія передає Підряднику, а він у свою чергу протягом
        7-ми календарних днів зобов&apos;язаний приступити до виправлення
        дефектів. При відмові Підрядника брати участь у складанні акту комісії,
        зазначений акт складається Замовником в односторонньому порядку і такий
        акт матиме пріоритетну силу в суді.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        6.3. Якщо Підрядник не приступить до усунення неполадок (дефектів)
        протягом зазначеного терміну, Замовник має право самостійно їх усунути
        або залучити для виконання робіт третіх осіб з подальшим віднесенням
        всіх витрат на Підрядника, а Підрядник зобов&apos;язаний відшкодувати
        такі витрати Замовнику в протягом 5 календарних днів з моменту отримання
        відповідної вимоги Замовника.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        6.4. У разі незгоди або відмови Підрядника від сплати понесених
        Замовником витрат, питання буде розглядатися в судовому порядку.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        7. ФОРС-МАЖОР ТА ПОРЯДОК РОЗГЯДУ СПОРІВ
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.1. Сторони погодилися що у разі виникнення форс-мажорних обставин (дії
        непереборної сили, яка не залежить від волі Сторін які сторони не могли
        передбачити або запобігти і що наступили після підписання цього
        договору), а саме: війни, військових дій, блокади (страйки, дії і
        рішення органів влади, інші, які унеможливлюють виконання Сторонами
        своїх зобов&apos;язань, пожеж, повеней, іншого стихійного лиха чи
        сезонних природних явищ) Сторони звільняються від виконання своїх
        зобов&apos;язань на час дії зазначених обставин.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.2. Сторона, для якої створилася неможливість виконання
        зобов&apos;язань за цим договором, зобов&apos;язана, по можливості,
        негайно сповістити іншу сторону про настання і припинення вищевказаних
        обставин.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.3. Несвоєчасне сповіщення (або не повідомлення) про обставини
        непереборної сили, якщо була можливість сповіщення, так само як і
        відсутність підтвердження, позбавляє відповідну сторону права по п.
        7.1., А також права посилатися на них у майбутньому. Належним доказом
        наявності зазначених вище обставин та їх тривалості будуть служити
        письмове підтвердження регіональної торгово-промисловою палатою України
        або іншого компетентного органу.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.4. У разі, коли дія зазначених обставин триває більш як 30 (тридцяти)
        календарних днів, кожна із Сторін має право на розірвання цього договору
        і не несе відповідальності за таке розірвання за умови, що вона
        повідомить про це іншу Сторону не пізніше як за 10 (десять) календарних
        днів до розірвання. У такому випадку сторони вирішують подальшу долю
        договору і погашення фактично виконаних зобов&apos;язань. Форс-мажор не
        поширюється на передоплату. Підрядник повертає невикористану суму
        передоплати Замовникові в строк за домовленістю сторін. В даному випадку
        сторони підписують акт звірки взаєморозрахунків для визначення розміру
        повернення передоплати.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.5. Всі спори та розбіжності сторони вирішують мирним шляхом. Досудове
        врегулювання спору не обов&apos;язково. При недосягненні компромісу,
        суперечка передається на розгляд до суду за встановленої чинним
        законодавством підвідомчістю та підсудністю.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.6. Сторони погодили, що воєнний стан, введений на території України,
        сам по собі не є форс-мажорною обставиною.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        7.7. Оскільки цей Договір укладено під час дії воєнного стану, воєнний
        стан, сам по собі не є форс-мажорною обставиною у розумінні цього
        договору. Форс-мажорними обставинами Сторони розуміють безпосередні
        військові дії, які унеможливлюють виконання цього договору.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        8. РОЗІРВАННЯ ДОГОВОРУ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        8.1. Замовник може відсторонити Підрядника або розірвати цей договір при
        неодноразовому та/або грубому порушенні Підрядником ходу виконання
        робіт, умов цього договору.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        8.2. Підрядник може розірвати договір або призупинити виконання робіт,
        якщо терміни оплати порушені Замовником на два місяці і більше.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        8.3. Сторона, яка прийняла рішення про розірвання цього договору,
        повідомляє про це письмово іншій стороні не менш, ніж за 10 (десять)
        календарних днів до передбачуваної дати розірвання. Відсторонити
        Підрядника від виконання робіт Замовник має право у будь-який момент
        шляхом повідомлення. Оплачуються тільки якісні результати робіт.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        8.4. У випадку, якщо провина Підрядника вимагає негайних дій Замовника
        для запобігання будь-яких небезпечних наслідків, Замовник має право не
        дотримуватися термінів повідомлення Підрядника про його усунення або
        розірвання цього договору.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        9. ЗАКЛЮЧНІ ПОЛОЖЕННЯ
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.1. Цей договір набуває чинності з моменту його підписання, який
        визначається датою, зазначеної в преамбулі цього договору на першій
        сторінці, і діє до «31» грудня {contrYearStr} року.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.2. Якщо жодна із Сторін не заявила про свій намір розірвати Договір за
        2 (два) тижні до закінчення терміну дії цього Договору, то Договір
        автоматично продовжується на кожний наступний календарний рік.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.3. Сторони зобов&apos;язані надати одна одній копії правовстановлюючих
        та дозвільних документів.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.4. Зобов&apos;язання за цим договором не можуть бути передані третім
        особам без попередньої письмової згоди на це іншої сторони. У разі
        реорганізації Замовника або Підрядника всі права та обов&apos;язки за
        цим договором автоматично передаються правонаступникам
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.5. Сторони гарантують що володіють всіма правомочностями на укладання
        та підписання цього договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.6. Всі доповнення і зміни до цього договору складаються виключно у
        письмовій формі за погодженням сторін. У разі зміни реквізитів сторін
        або статусу платника податку на прибуток, сторона, у якої з&apos;явилися
        такі зміни, зобов&apos;язана повідомити про це іншу сторону. Всю
        відповідальність за неповідомлення несе винна сторона.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.7. З підписанням цього договору Підрядник зобов&apos;язаний надати
        Замовнику свої реєстраційні документи, документи, що підтверджують
        повноваження особи, яка підписує договір, і ліцензію на виробництво
        робіт в копіях, засвідчених особою, яка підписала договір з боку
        Підрядника та проставленням відтиску печатки Підрядника.
      </Typography>
      <Typography
        variant='body2'
        className={classes['agro-contract-paragraph']}
      >
        9.8. Цей договір складений і підписаний в 2 (двох) автентичних
        примірниках, українською мовою, по одному для кожної сторони.
      </Typography>
      <Typography
        variant='body1'
        className={classes['agro-contract-chapter']}
        align='center'
      >
        10. МІСЦЕЗНАХОДЖЕННЯ, РЕКВІЗИТИ ТА ПІДПИСИ СТОРІН.
      </Typography>

      <TableContainer id='table-agro-contract-sign'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            backgroundColor: 'white',
          }}
        >
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
                paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='center'
                >
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='center'
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {executorTypeShort} «{executorName}»{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display:
                  executorAddress === '' && clientAddress === ''
                    ? 'none'
                    : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {executorAddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display:
                  executorEDRPO === '' && clientEDRPO === ''
                    ? 'none'
                    : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display:
                  executorIBAN === '' && clientIBAN === ''
                    ? 'none'
                    : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display:
                  executorTel === '' && clientTel === '' ? 'none' : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {executorTel}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {clientTel}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display:
                  executorTel === '' && clientTel === '' ? 'none' : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {executorEmail}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                >
                  {clientEmail}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display:
                  executorJobTitleimen === '' && clientJobTitleimen === ''
                    ? 'none'
                    : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  mb={2}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  mb={2}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      className={classes['agro-contract-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {executorFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      className={classes['agro-contract-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {clientFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['agro-contract-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
