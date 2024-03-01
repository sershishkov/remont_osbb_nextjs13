import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { arr__TypeOfOSBB } from '@/constants/constants';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from './styles.module.scss';

export default function BaseContractPrint({
  currentContract,
  currentContractType,
  currentOurFirm,
  currentClient,
  naklSum,
  aktSum,
}: Readonly<{
  currentContract: I_Contract;
  currentContractType: string;
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
  //@ts-ignore
  const clientType = currentClient?.firmType?.firmTypeShortName;
  //@ts-ignore
  const executorType = currentOurFirm?.firmType?.firmTypeShortName;

  let clientPreambula = '';
  let executorPreambula = '';
  if (clientType === 'Фізична особа' || clientType === 'ФОП') {
    //@ts-ignore
    clientPreambula = ` ${currentClient?.firmType?.firmTypeLongName!} «${
      currentClient.clientLongName
    }», надалі іменується «ЗАМОВНИК», та`;
  } else {
    //@ts-ignore
    clientPreambula = ` ${currentClient?.firmType?.firmTypeLongName!} «${
      currentClient?.clientLongName
    }», в особі ${currentClient?.jobTitle_rodit} ${
      currentClient?.lastName_rodit
    } ${currentClient?.firstName_rodit} ${
      currentClient?.patronymic_rodit
    }, що діє на підставі ${
      currentClient?.whichActsOnTheBasis
    }, надалі іменується «ЗАМОВНИК», та`;
  }

  const injectPhrase = arr__TypeOfOSBB.includes(clientType)
    ? 'у житловому будинку за адресою: '
    : ' за адресою:';
  const workAddress = currentContract?.workAddress;
  const contractDescription = `${currentContract?.contractDescription} ${injectPhrase} ${workAddress}`;
  //@ts-ignore
  const ourTaxationType = currentOurFirm?.taxationType?.taxationTypeName;

  if (executorType === 'ФОП') {
    //@ts-ignore
    executorPreambula = ` ${currentOurFirm?.firmType?.firmTypeShortName!} «${
      currentOurFirm?.clientLongName
    }» , надалі іменується «ВИКОНАВЕЦЬ», що діє на підставі ${
      currentOurFirm?.certificateNumber
    } ${
      currentOurFirm?.representedBy
    }, ${ourTaxationType}, з іншого боку, кожна окремо - Сторона, а разом – Сторони уклали даний Договір про наступне:`;
  } else if (executorType === 'Фізична особа') {
    //@ts-ignore
    executorPreambula = ` ${currentOurFirm?.firmType?.firmTypeLongName!} «${
      currentOurFirm?.clientLongName
    }», з іншого боку, кожна окремо - Сторона, а разом – Сторони уклали даний Договір про наступне:`;
  } else {
    //@ts-ignore
    executorPreambula = ` ${currentOurFirm?.firmType?.firmTypeShortName!} «${
      currentOurFirm?.clientLongName
    }» , надалі іменується « ВИКОНАВЕЦЬ » в особі ${
      currentOurFirm?.jobTitle_rodit
    } ${currentOurFirm?.lastName_rodit} ${currentOurFirm?.firstName_rodit} ${
      currentOurFirm?.patronymic_rodit
    }, що діє на підставі ${
      currentOurFirm?.whichActsOnTheBasis
    }, ${ourTaxationType}, з іншого боку, кожна окремо - Сторона, а разом – Сторони уклали даний Договір про наступне: `;
  }

  const prepaymentPercentage = currentContract?.prepaymentPercentage;
  const totalSum = naklSum + aktSum;
  const prePayPercentSum =
    Math.round(
      ((totalSum * prepaymentPercentage) / 100 + Number.EPSILON) * 100
    ) / 100;
  const restPrePayPercentSum =
    Math.round((totalSum - prePayPercentSum + Number.EPSILON) * 100) / 100;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);

  const prePayNaklSumPropis = FloatToSamplesInWordsUkr(naklSum);
  const restPrePayNaklSumPropis = FloatToSamplesInWordsUkr(aktSum);

  const prePayPercentSumPropis = FloatToSamplesInWordsUkr(
    isNaN(prePayPercentSum) ? 0 : prePayPercentSum
  );
  const restPrePayPercentSumPropis = FloatToSamplesInWordsUkr(
    isNaN(restPrePayPercentSum) ? 0 : restPrePayPercentSum
  );

  const arr__totalSum = totalSum.toFixed(2).split('.');
  const arr__prePayPercentSum = prePayPercentSum.toFixed(2).split('.');
  const arr__restPrePayPercentSum = restPrePayPercentSum.toFixed(2).split('.');
  const arr__naklSum = naklSum.toFixed(2).split('.');
  const arr__aktSum = aktSum.toFixed(2).split('.');
  let p1_2 = '';

  let p2_1 = '';
  let p2_2 = '';
  let p2_2_1 = '';
  let p2_2_2 = '';

  let p4_2_7 = '';

  if (currentContractType === 'Общий') {
    p2_1 = `2.1. Оплата за надані послуги та матерiали відбувається згідно актів виконаних робіт, видаткових накладных або наданих рахунків ВИКОНАВЦЯ. Вартість послуг визначається згідно обсягу наданих послуг.`;
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
  } else {
    p2_1 = `2.1. Вартість послуг складає  ${arr__totalSum[0]} грн ${arr__totalSum[1]} коп (${totalSumPropis}), без ПДВ.`;
  }

  if (
    currentContractType === 'Кошторис Сумма' ||
    currentContractType === 'Кошторис Частичная Предоплата' ||
    currentContractType === 'Кошторис Предоплата Материал' ||
    currentContractType === 'Кошторис Предоплата 100%'
  ) {
    p1_2 = `1.2. ЗАМОВНИК доручає, а ВИКОНАВЕЦЬ, згідно Кошторису розрахунків виконання робіт , який є невід'ємною частиною договору, виконує з належною якістю поточний ремонт, з вимогами національних стандартів, будівельних норм і правил, вимог техніки безпеки і охорони праці.`;
    p4_2_7 = `4.2.7. ВИКОНАВЕЦЬ виконує  роботи з власних будівельних матеріалів`;
  } else {
    p1_2 = `1.2. Перелік виконаних робот вказуються в Актах виконаних робіт. Акт виконаних робіт є невід’ємною частиною цього Договору`;
  }

  if (
    currentContractType === 'Общий Сумма' ||
    currentContractType === 'Кошторис Сумма'
  ) {
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
  }
  if (
    currentContractType === 'Предоплата Частичная' ||
    currentContractType === 'Предоплата 100%'
  ) {
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів:`;
    p2_2_1 = `2.2.1. Попередньої оплати, яка надається ВИКОНАВЕЦЮ , у розмірі (${prepaymentPercentage})% ${arr__prePayPercentSum[0]} грн ${arr__prePayPercentSum[1]} коп (${prePayPercentSumPropis} ), без ПДВ.`;
    if (restPrePayPercentSum > 0) {
      p2_2_2 = `2.2.2. Остаточна оплата по даному Договору, у розмірі (${
        100 - prepaymentPercentage
      })% ${arr__restPrePayPercentSum[0]} грн ${
        arr__restPrePayPercentSum[1]
      } коп (${restPrePayPercentSumPropis}), без ПДВ. здійснюється протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
    }
  }

  if (
    currentContractType === 'Предоплата Материал' ||
    currentContractType === 'Кошторис Предоплата Материал'
  ) {
    p2_2 = `2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на розрахунковий рахунок ВИКОНАВЦЯ коштів:`;
    p2_2_1 = `   2.2.1. Попередньої оплати, яка надається ВИКОНАВЕЦЮ , у розмірі ${arr__naklSum[0]} грн ${arr__naklSum[1]} коп ${prePayNaklSumPropis} ), без ПДВ.`;

    p2_2_2 = `   2.2.2. Остаточна оплата по даному Договору, у розмірі  ${arr__aktSum[0]} грн ${arr__aktSum[1]} коп (${restPrePayNaklSumPropis}), без ПДВ. здійснюється протягом 3 банківських днів після дати підписання акту виконаних робіт.`;
  }
  const guaranteePeriod = currentContract?.guaranteePeriod;
  //@ts-ignore
  const clientFirm = `${currentClient?.firmType?.firmTypeShortName} ${currentClient?.clientShortName}`;
  //@ts-ignore
  const executorFirm = `${currentOurFirm?.firmType?.firmTypeShortName} ${currentOurFirm?.clientShortName}`;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const executorAddress = `${currentOurFirm?.postIndex} ${currentOurFirm?.address}`;
  const clientIBAN = `${currentClient?.iban}`;
  const executorIBAN = `${currentOurFirm?.iban}`;

  const clientTel = `${
    currentClient?.telNumber ? `Тел:${currentClient?.telNumber}` : ''
  }`;
  const executorTel = `${
    currentOurFirm?.telNumber ? `Тел:${currentOurFirm?.telNumber}` : ''
  }`;
  const clientEmail = `${
    currentClient?.email ? `email:${currentClient?.email}` : ''
  }`;
  const executorEmail = `${
    currentOurFirm?.email ? `email:${currentOurFirm?.email}` : ''
  }`;
  const clientJobTitle = `${currentClient?.jobTitle}`;
  const executorJobTitle = `${currentOurFirm?.jobTitle}`;
  const clientShortName = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const executorShortName = `${
    currentOurFirm?.firstName_imen
  } ${currentOurFirm?.lastName_imen?.toLocaleUpperCase()}`;

  let clientEDRPO;
  let executorEDRPO;

  if (executorType === 'Фізична особа') {
    executorEDRPO = `ІПН: ${currentOurFirm?.inn}`;
  } else if (executorType === 'ФОП') {
    executorEDRPO = `ЄДРПОУ: ${currentOurFirm?.inn}`;
  } else {
    executorEDRPO = `ЄДРПОУ: ${currentOurFirm?.edrpou}`;
  }

  if (clientType === 'Фізична особа') {
    clientEDRPO = `ІПН: ${currentClient?.inn}`;
  } else if (clientType === 'ФОП') {
    clientEDRPO = `ЄДРПОУ: ${currentClient?.inn}`;
  } else {
    clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  }

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-base-contract-header'>
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
                  className={classes['base-contr-chapter']}
                  align='center'
                >
                  Договір № {contrNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['base-contr-paragraph']}
                  align='center'
                >
                  на виконання ремонтних робіт
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-paragraph']}
                  align='left'
                >
                  {contrDateStr}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-paragraph']}
                  align='right'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant='body2'
        className={classes['base-contr-paragraph']}
        mt={2}
      >
        {clientPreambula}
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        {executorPreambula}
      </Typography>
      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        1.1. Згідно цього договору ВИКОНАВЕЦЬ приймає на себе зобов`язання
        виконувати <strong>«{contractDescription}»</strong> , а ЗАМОВНИК
        зобов`язується приймати роботу та оплатити її вартість у строки та на
        умовах, що визначаються цим договором та додатками до нього.{' '}
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        {p1_2}
      </Typography>
      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        2. ВАРТІСТЬ РОБІТ ТА ПОРЯДОК РОЗРАХУНКІВ
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        {p2_1}
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        {p2_2}
      </Typography>
      <Typography
        variant='body2'
        className={classes['base-contr-paragraph']}
        sx={{ display: p2_2_1 !== '' ? 'block' : 'none' }}
      >
        {p2_2_1}
      </Typography>
      <Typography
        variant='body2'
        className={classes['base-contr-paragraph']}
        sx={{ display: p2_2_2 !== '' ? 'block' : 'none' }}
      >
        {p2_2_2}
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        2.3. Датою здійснення платежу є дата списання коштів з поточного рахунку
        ЗАМОВНИКА.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        2.4 Факт виконання договірних зобов’язань ВИКОНАВЦЯ підтверджується
        Актом виконаних робіт. Даний Акт складається і підписується сторонами
        договору.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        2.5. Вартість за виконання інших додаткових послуг погоджується
        сторонами окремо, і сплачується на підставі виставленого рахунку і
        відповідного Акту виконаних робіт.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        2.6.ЗАМОВНИК протягом двох робочих днів з моменту отримання Актів
        виконаних робіт підписує їх або направляє ЗАМОВНИКУ мотивовану відмову в
        прийманні робіт, в іншому випадку, Акти виконаних робіт вважаються
        підписаними.
      </Typography>

      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        3.СТРОК ДІЇ ТА УМОВИ РОЗІРВАННЯ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        3.1. Даний договір починає діяти з моменту його підписання Сторонами і
        діє до повного виконання робіт по цьому договору.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        3.2. В випадку продовження строку дії даного Договору Сторони мають
        право переглянути ціни на передбачені Договором роботи.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        3.3. Будь-яка із сторін може розірвати цей Договір в односторонньому
        порядку або призупинити його виконання, якщо інша сторона:
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        3.3.1.Не виконує свої зобов’язання за Договором або не виконує положення
        Договору, з письмовим повідомленням про цей факт іншій стороні за 10
        робочих днів.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        3.4.ЗАМОВНИК має право розірвати Договір у будь-який час, якщо
        ВИКОНАВЕЦЬ не буде виконувати свої обов’язки на рівні, що задовольняє
        ЗАМОВНИКА.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        3.5.У випадку розірвання Договору платежі по договору проводяться на
        дату розірвання Договору з врахуванням об’єму виконаних робіт.
      </Typography>
      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        4.ОБОВ’ЯЗКИ СТОРІН
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.1. Замовник зобов’язується:
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.1.1.Своєчасно здійснювати оплату в строки, зазначені в даному
        Договорі.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.1.2.Прийняти результати робіт протягом двох робочих днів з дня
        отримання Актів виконаних робіт або направити Виконавцю мотивовану
        відмову в прийомі робіт, в іншому випадку, Акти виконаних робіт
        вважаються підписаними.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.1.3.Забезпечити доступ до об’єктів, а саме: в визначені приміщення в
        яких мають проводитись монтажні роботи.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.1.4.Відповідно до цього договору ЗАМОВНИК має право здійснювати
        контроль і технічний нагляд за відповідністю обсягу і якості виконуваних
        робіт.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2. Виконавець зобов’язується:
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2.1.Своєчасно та якісно виконувати роботи, які є предметом цього
        договору.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2.2.Своєчасно надати Акти виконаних робіт і рахунки, які підлягають
        оплаті.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2.3.Усунути за свій рахунок брак та недоробки, виявлені ЗАМОВНИКОМ у
        процесі контролювання якості виконаних ВИКОНАВЦЕМ робіт згідно даного
        Договору.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2.4.Відповідальність за виконання техніки безпеки при виконанні робіт
        за цим договором покладається на ВИКОНАВЦЯ.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2.5.ВИКОНАВЕЦЬ несе повну відповідальність за шкоду нанесену
        обладнанню ЗАМОВНИКА, які виникли з вини ВИКОНАВЦЯ при виконані робіт за
        цим Договором.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        4.2.6. ВИКОНАВЕЦЬ зобов&apos;язується в продовж гарантійного терміну
        безкоштовно з використанням власних матеріалів і засобів ліквідовувати
        будь-які недоліки, які виникли з вини ВИКОНАВЦЯ. Гарантійний термін
        складає {guaranteePeriod} мiсяцiв, якій починається з дати підписання
        Акту виконаних робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['base-contr-paragraph']}
        sx={{ display: p4_2_7 !== '' ? 'block' : 'none' }}
      >
        {p4_2_7}
      </Typography>
      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        5.ВІДПОВІДАЛЬНІСТЬ
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        5.1. В випадку порушення умов даного Договору, винна Сторона несе
        відповідальність визначену цим Договором або чинним законодавством
        України.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        5.2. За цим договором, сплата винуватою Стороною визначених даним
        договором та/або чинним законодавством України штрафних санкцій
        (неустойка, пеня, штраф) не звільняє останню від обов’язку від виконання
        обов’язків за Договором в натурі та в повному обсязі.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        5.3. В випадку безпідставної відмови будь-якої із сторін від підписання
        Акту виконаних робіт, Сторона, яка безпідставно відмовилася або
        ухиляється від підписання Акту, сплачує іншій стороні штраф в розмірі
        0,2% від суми, яка підлягає сплаті.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        5.4. За несвоєчасне перерахування коштів ЗАМОВНИК сплачує пеню в розмірі
        0,2 % від суми за кожен день несплати.
      </Typography>

      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        6.ВИРІШЕННЯ СПОРІВ
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        6.1. Усі спори, що виникають між Сторонами в процесі здійснення умов
        Договору, вирішуються шляхом переговорів між Сторонами.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        6.2. Якщо спір неможливо вирішити шляхом переговорів, він вирішується в
        судовому порядку, відповідно до чинного законодавства України.
      </Typography>

      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        7.ФОРС-МАЖОР
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        7.1. Сторони погодились, що у разі виникнення форс-мажорних обставин
        (дії непереборної сили, які не залежать від волі сторін), а саме:
        військові дії, блокада, ембарго, пожежі, повені, епідемії, землетруси,
        інші стихійні лиха і т.п.,строк виконання зобов’язань за даним договором
        переноситься на період, протягом якого будуть діяти такі обставини і
        жодна із сторін не несе відповідальності за невиконання умов Договору.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        7.2.Сторона, що не виконує свого зобов’язання внаслідок дії непереборної
        сили, повинна негайно повідомити іншу сторону про перешкоду і її вплив
        на виконання зобов’язань за даним Договором.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        7.3.Якщо форс-мажорні обставини діють більше ніж 30 календарних днів, то
        Сторона, за своїм бажанням, має розірвати Договір. В даному випадку ні
        одна із сторін не має права вимагати від іншої сторони компенсації за
        будь-які збитки, крім тих, що виникли до початку дії форс-мажорних
        обставин
      </Typography>

      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        8.ІНШІ ПОЛОЖЕННЯ
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.1. Цей Договір являє собою повне взаємопорозуміння Сторін відносно
        предмету договору, ціни договору, строку дії договору та інших умов.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.2. Доповнення, додатки та відмови до даного договору вважаються
        дійсними тільки в тому випадку, якщо вони надані в письмовій формі і
        підписанні Сторонами.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.3. Жодна із сторін не має права передавати свої права та обов’язки за
        Договором третій стороні без попередньої письмової згоди на це іншої
        сторони.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.4. Виконавець є резидентом України та {ourTaxationType}
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.5. Всі повідомлення, які відносяться до виконання умов договору
        здійснюється в письмовій формі і підписуються уповноваженою особою
        сторони.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.6.Будь-яке повідомлення вважається отриманим якщо воно вручено
        адресату під розписку, при цьому адресат підписує копію повідомлення про
        вручення, яка повертається відправнику.
      </Typography>
      <Typography variant='body2' className={classes['base-contr-paragraph']}>
        8.7.Всі доповнення і додатки є невід’ємною частиною Договору.
      </Typography>
      <Typography
        variant='body1'
        className={classes['base-contr-chapter']}
        align='center'
      >
        9. РЕКВІЗИТИ ТА ПІДПИСИ СТОРІН
      </Typography>

      <TableContainer id='table-base-contr-sign'>
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
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                  align='center'
                >
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
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
                  className={classes['base-contr-text']}
                >
                  {executorFirm}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {clientFirm}{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: !(executorAddress && clientAddress)
                  ? 'none'
                  : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {executorAddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: !(executorEDRPO && clientEDRPO) ? 'none' : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: !(executorIBAN && clientIBAN) ? 'none' : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: !(executorTel && clientTel) ? 'none' : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {executorTel}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {clientTel}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: !(executorTel && clientTel) ? 'none' : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {executorEmail}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                >
                  {clientEmail}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                display: !(executorJobTitle && clientJobTitle)
                  ? 'none'
                  : 'table-row',
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                  mb={2}
                >
                  {executorJobTitle}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                  mb={2}
                >
                  {clientJobTitle}
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
                      className={classes['base-contr-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {executorShortName}
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
                      className={classes['base-contr-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {clientShortName}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>{' '}
        </Table>
      </TableContainer>
    </div>
  );
}
