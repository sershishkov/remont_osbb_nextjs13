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

export default function RemsContractBudjetPrint({
  currentContract,
  currentOurFirm,
  currentClient,
  aktSum,
}: Readonly<{
  currentContract: I_Contract;
  currentOurFirm: I_Client;
  currentClient: I_Client;
  aktSum: number;
}>) {
  const totalSumPropis = FloatToSamplesInWordsUkr(aktSum);
  const aktSumString = aktSum?.toFixed(2).split('.');
  const contrDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });

  const contractDescription = currentContract?.contractDescription;

  const clientJobTitleRod = currentClient?.jobTitle_rodit;
  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIORodit = `${currentClient?.lastName_rodit} ${currentClient?.firstName_rodit} ${currentClient?.patronymic_rodit}`;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;

  const clientActsOn = currentClient?.whichActsOnTheBasis;
  const clientAddres = `${currentClient?.postIndex}, ${currentClient?.address}`;
  const kodDkBudjet = currentContract?.kodDkBudjet;

  const clientIBAN = currentClient?.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  //@ts-ignore
  const executorTypeLong = currentOurFirm?.firmType?.firmTypeLongName;
  //@ts-ignore
  const executorTypeShort = currentOurFirm?.firmType?.firmTypeShortName;
  const executorName = currentOurFirm?.clientShortName;
  const executorJobTitleRod = currentOurFirm?.jobTitle_rodit;
  const executorJobTitleimen = currentOurFirm?.jobTitle;
  const executorFIORodit = `${currentOurFirm?.lastName_rodit} ${currentOurFirm?.firstName_rodit} ${currentOurFirm?.patronymic_rodit}`;
  const executorFIOImen = `${
    currentOurFirm?.firstName_imen
  } ${currentOurFirm?.lastName_imen?.toLocaleUpperCase()}`;
  const executorActsOn = currentOurFirm?.whichActsOnTheBasis;
  //@ts-ignore
  const executorTaxationType = currentOurFirm?.taxationType?.taxationTypeName;
  const executorAddres = `${currentOurFirm?.postIndex}, ${currentOurFirm?.address}`;
  const executorIBAN = currentOurFirm?.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentOurFirm?.edrpou}`;
  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-rems-contract-budjet-header'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
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
              <TableCell colSpan={6}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='center'
                >
                  ДОГОВІР ПІДРЯДУ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-paragraph']}
                  align='center'
                >
                  на виконання робіт
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-paragraph']}
                  align='center'
                  mb={2}
                >
                  по обꞌєкту <strong>« {contractDescription} »</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell colSpan={2} align='center'>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='center'
                >
                  № _________
                </Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['rems-budjet-text']}
                  align='right'
                >
                  «____» __________ {contrDateStr} р.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        ЗАМОВНИК: Комунальне підприємство «Запоріжремсервіс» Запорізької міської
        ради в особі {clientJobTitleRod} {clientFIORodit}, який діє на підставі
        {clientActsOn}, з одної сторони,
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        ПІДРЯДНИК: {executorTypeLong} «{executorName}» в особі{' '}
        {executorJobTitleRod} {executorFIORodit} , який дії на підставі{' '}
        {executorActsOn}
        підприємства з другої сторони, уклали цей договір про нижченаведене:
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        1.1. ЗАМОВНИК доручає, а ПІДРЯДНИК, в межах договірної ціни приймає на
        себе обов&apos;язки на свій ризик власними або залученими силами,
        виконувати постачання необхідного обладнання, будівельно-монтажні,
        пусконалагоджувальні та інші роботи, які забезпечать введення в
        експлуатацію{' '}
        <strong>
          {' '}
          по обꞌєкту {kodDkBudjet}. Капітальні трансферти підприємствам
          (установам, організаціям) « {contractDescription} »
        </strong>{' '}
        , в обумовлений цим договором термін та з належною якістю в межах
        затвердженої проектно-кошторисної документації, та узгодженої ціни
        робіт, вимог техніки безпеки і охорони праці.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        1.2. ЗАМОВНИК здійснює фінансування ПІДРЯДНИКА на капітальний ремонт
        об&apos;єкту за рахунок коштів, перерахованих Головним розпорядником
        коштів – Департаментом з управління житлово-комунальним господарством
        Запорізької міської ради, наданих для фінансування предмету договору, в
        межах яких буде проводитись оплата виконаних робіт ПІДРЯДНИКА .
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        1.3. Підрядник гарантує, що предмет Договору відповідає видам
        діяльності, передбаченим його Статутом та документами дозвільного
        характеру.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        1.4. Обсяги та ціна договору можуть бути змінені в залежності від
        реального фінансування видатків.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        2. ЦІНА ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        2.1. Ціна договору динамічна і на момент укладання цього Договору
        складає {aktSumString[0]} грн. {aktSumString[1]} коп. ( {totalSumPropis}{' '}
        ), без ПДВ.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        Договірна ціна робіт, визначається згідно з державним стандартом
        України. При формуванні договірної ціни застосувати ресурсні елементні
        кошторисні норми України.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        Ціна договору враховує усі витрати ПІДРЯДНИКА на виконання предмету
        договору.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        2.2. Ціна договору може бути зменшена за взаємною згодою сторін згідно
        діючого законодавства.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        3. ПОРЯДОК ЗДІЙСНЕННЯ ОПЛАТИ
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        3.1. Розрахунки проводяться у відповідності до законодавства у сфері
        бюджетного фінансування в межах та за рахунок коштів, перерахованих
        Головним розпорядником коштів – Департаментом з управління
        житлово-комунальним господарством Запорізької міської ради, наданих для
        фінансування предмету договору в наступний спосіб:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - безготівкового перерахунку ЗАМОВНИКОМ грошових коштів ПІДРЯДНИКУ за
        виконані роботи після підписання Сторонами довідки про вартість
        виконаних будівельних робіт та витрат за формою КБ-3, акту приймання
        виконаних будівельних робіт за формою КБ-2в, складених ПІДРЯДНИКОМ
        відповідно до вимог КНУ «Настанова з визначення вартості будівництва» ,
        в межах ціни цього Договору, у строк до 15 календарних днів після
        надходження коштів для фінансування предмету договору на рахунок
        ЗАМОВНИКА; Розрахунок здійснюється у безготівковій формі шляхом
        перерахування Замовником грошових коштів на поточний рахунок
        Постачальника, відповідно до підпункту 3 пункту 19 Постанови КМУ від 09
        червня 2021р. №590 та в порядку передбаченому «Про затвердження Порядку
        виконання повноважень Державною казначейською службою в особливому
        режимі в умовах воєнного стану» (зі змінами).
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        3.2. У разі здійснення оплати обладнання та устаткування за рахунок
        видатків на фінансування об’єкта, безпосередньо оплата здійснюється на
        підставі накладної та акту приймання-передачі.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        3.3. ЗАМОВНИК звільняється від відповідальності у разі: - неналежного
        фінансування з боку головного розпорядника бюджетних коштів - затримки
        оплат з боку УДКСУ в Запорізькій області.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        4. ТЕРМІНИ ТА МІСЦЕ ВИКОНАННЯ РОБІТ
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        4.1. Строк виконання робіт: протягом {contrDateStr} року.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        4.2. Сторони мають право ставити питання про продовження виконання
        зобов&apos;язань щодо виконання робіт по цьому договору у разі
        виникнення документально підтверджених об&apos;єктивних обставин, що
        спричинили таке продовження, у тому числі форс-мажорних обставин,
        затримки фінансування витрат замовника за умови, що такі зміни не
        призведуть до збільшення суми, визначеної у договорі
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        5. ПРАВА ТА ОБОВ’ЯЗКИ СТОРІН
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.1. ЗАМОВНИК зобов’язаний:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.1.1. Передати ПІДРЯДНИКУ проектно-кошторисну документацію;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.1.2. Здійснювати контроль і технічний нагляд за відповідністю та
        якістю, обсягів і ціни обладнання та виконаних робіт проекту, кошторису,
        будівельним нормам і правилам, не втручаючись в господарську діяльність
        ПІДРЯДНИКА;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.1.3. Забезпечити проведення авторського нагляду за виконанням робіт
        шляхом укладання відповідного договору;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.1.4. Приймати виконані роботи згідно акту виконаних робіт у формі
        КБ-2в, довідки про вартість виконаних робіт КБ-3;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.1.5. Своєчасно та в повному обсязі оплачувати виконані роботи.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2. ЗАМОВНИК має право:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.1. Достроково розірвати цей Договір у випадках, передбачених цим
        договором.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.2. При наявності відхилень від якості, обсягів і ціни виконаних
        робіт проекту та обладнання, кошторису, будівельним нормам і правилам,
        видавати ПІДРЯДНИКУ розпорядження про їх усунення, а при істотних
        порушеннях прийняти рішення про призупинення робіт, або розірвання
        Договору;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.3. Вільного доступу в робочий час на будівельний майданчик для
        здійснення контролю за ходом виконання робіт;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.4. В будь-який час ознайомитися з порядком ведення загального
        журналу виконання робіт, при потребі, засвідчити кожний запис, викласти
        свої зауваження щодо об’єктивності і повноти інформації, ходу виконання
        робіт;{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.5. Зменшувати обсяг виконання робіт та загальну вартість цього
        Договору згідно діючого Законодавства. У такому разі Сторони вносять
        відповідні зміни до цього Договору шляхом укладання додаткової угоди;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.6. Повернути ПІДРЯДНИКУ довідку про вартість виконаних підрядних
        робіт у формі КБ-3, акт виконаних робіт у формі КБ-2в без здійснення
        оплати в разі неналежного оформлення (відсутність печатки, підписів
        тощо);{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.2.7. За своїм вибором вимагати: безоплатного виправлення ПІДРЯДНИКОМ
        недоліків у виконаних роботах або відшкодування ним необхідних витрат з
        виправлення недоліків робіт або відповідного зменшення винагороди за
        роботи, (якщо ПІДРЯДНИК припустився відхилень від умов цього Договору,
        які погіршили результат робіт, або допустив інші недоліки при виконанні
        робіт.)
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3. ПІДРЯДНИК зобов’язаний:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.1. Забезпечити виконання робіт у строки, встановлені цим Договором
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.2. Обов’язково надати ЗАМОВНИКУ разом з договором на виконання робіт
        всю інформацію для оформлення дозвільних документів на виконання
        будівельних робіт, згідно чинного законодавства а також копію наказу про
        призначення відповідальних осіб за виконанням будівельних робіт з
        найменуванням посади, прізвища, ім’я та по батькові, номера телефону.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.3. Встановити на об’єкті будівництва інформаційний стенд відповідно
        до вимог «Порядку виконання будівельних робіт» затвердженого Постановою
        КМУ №466 від 13 квітня 2011 року.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.4. Створити безпечні умови для роботи виробничого персоналу та
        перебування людей відповідно до вимог ДБН А.3.2-2-2009 «Охорона праці і
        промислова безпека у будівництві», нормативно-правових актів з охорони
        праці та промислової безпеки, пожежної та техногенної безпеки,
        екологічних і санітарних норм; виконувати роботи згідно Акта-допуску
        погодженого з територіальним відділенням.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.5. Вести загальний журнал робіт на об’єкті відповідно до вимог ДБН
        А.3.1-5-2016 «Організація будівельного виробництва».{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.6. Забезпечити ЗАМОВНИКУ та проектній організації можливість
        вільного доступу в робочий час на будівельний майданчик для здійснення
        технічного та авторського нагляду за ходом виконання робіт;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.7. У разі виконання силами залученої спеціалізованої організації
        геодезичної зйомки фактичного розташування інженерних мереж з наступною
        передачею міським організаціям містобудівництва та архітектури, витрати
        на її виконання компенсуються ПІДРЯДНИКУ ЗАМОВНИКОМ на підставі рахунків
        ПІДРЯДНИКА з наданням підтверджуючих документів.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.8. Виконати реалізацію, а при необхідності утилізацію, у випадку
        неможливості використання, матеріалів від розбирання конструкцій, що
        підтверджується відповідними документами, на об’єкті будівництва, після
        визначення в акті, підписаним чотирма сторонами (ЗАМОВНИК, ПІДРЯДНИК,
        проектна та експлуатуюча організації) номенклатури матеріальних
        ресурсів, їх кількості, технічних та якісних характеристик та
        обґрунтованих цін, які враховують визначені в акті характеристики, при
        необхідності, із залученням експертів для експертної оцінки матеріальних
        ресурсів. Кошти отримані від реалізації матеріалів, за вирахуванням
        понесених ПІДРЯДНИКОМ витрат, які пов’язані із реалізацією чи
        утилізацією, перераховуються ЗАМОВНИКУ;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.9. Здійснювати замовлення, придбання, приймання, розвантаження,
        складування, охорону та подачу на будівельний майданчик матеріалів,
        конструкцій, обладнання та виробів. Контролювати якість і комплектність
        постачання цих ресурсів, нести ризик випадкової втрати і пошкодження
        ресурсів до моменту здачі об’єкту в гарантійну експлуатацію;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.10. Забезпечити повне, якісне та своєчасне ведення виконавчої
        документації, що передбачена діючим порядком і цим Договором, визначити
        осіб, відповідальних за її ведення, із наданням двох примірників
        ЗАМОВНИКУ;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.11. Враховувати вимоги ЗАМОВНИКА по усуненню виявлених порушень і
        заносити запис про їх виконання до журналу;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.12. Надати ЗАМОВНИКУ паспорти на обладнання, виконавчу та виробничу
        документацію, враховуючи акти огляду прихованих робіт, які оформлюються
        в процесі будівництва ПІДРЯДНИКОМ та підписуються ЗАМОВНИКОМ та
        проектною організацією, за встановленими нормами;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.13. Виконати пусконалагоджувальні роботи технологічного обладнання
        згідно з технологічним регламентом, передбаченим проектом, з оформленням
        журналів та актів випробування змонтованого обладнання з підписанням
        експлуатуючою організацією;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.14. Нести ризик випадкового знищення або пошкодження виконаних робіт
        та їх результатів до прийняття Замовником;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.15. Своєчасно інформувати Замовника про хід виконання зобов’язань за
        Договором , будь-які обставини, що перешкоджають його виконанню та/або
        загрожують якості або придатності результату робіт, та про заходи,
        необхідні для їх усунення.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        Надіслати повідомлення про пошкодження об&apos;єкта будівництва
        ЗАМОВНИКУ протягом 3-х днів після його виявлення. Пошкодження підлягає
        усуненню ПІДРЯДНИКОМ у строки, узгоджені Сторонами із урахуванням його
        складності та обсягів. Повідомити ЗАМОВНИКА про вжиті заходи протягом
        3-х днів після усунення пошкодження;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.16. Приймати участь у передачі об’єкту будівництва в експлуатацію
        відповідно до чинного порядку;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.17. Передати ЗАМОВНИКУ один примірник робочої документації (комплект
        креслень) і два примірника виконавчої документації у відповідності до
        переліку виконавчої документації, затвердженої ЗАМОВНИКОМ та переданої
        ПІДРЯДНИКУ до початку будівництва.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.3.18. Забезпечити, у разі наявності, вивіз будівельного сміття, яке
        утворюється при будівництві, реконструкції. Витрати на послуги з
        утилізації будівельного сміття компенсуються ЗАМОВНИКОМ на підставі
        рахунку ПІДРЯДНИКА з підтвердженням суми розрахунку про фактичний обсяг
        будівельного сміття, вивезеного за звітний період, та вартість
        утилізації 1т сміття згідно даних підприємства, яке надає послуги з
        утилізації сміття.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.4. ПІДРЯДНИК має право:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.4.1.Своєчасно та в повному обсязі отримувати плату за виконані роботи,
        в порядку, передбаченому в розділі 4 цього Договору ;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.4.2. На дострокове виконання робіт за письмовим погодженням ЗАМОВНИКА;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.4.3. У разі невиконання зобов’язань ЗАМОВНИКОМ достроково розірвати
        цей Договір, повідомивши про це ЗАМОВНИКА в строк до 20 днів;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.4.4. Залучати за власним вибором до виконання визначених обсягів робіт
        субпідрядні спеціалізовані будівельні та інші організації та нести
        відповідальність за виконані ними роботи;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        5.4.5. Здійснити за свій рахунок, власними коштами та на своїх умовах
        страхування ризиків випадкового знищення або пошкодження об’єкта
        будівництва.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        6. ВИКОНАННЯ РОБІТ.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        6.1. ПІДРЯДНИК виконує роботи з використанням матеріальних ресурсів
        відповідно до вимог затвердженої проектно-кошторисної документації,
        вимог державних стандартів, будівельних норм і правил, строків виконання
        робіт, вимог техніки безпеки та охорони праці, письмових вказівок
        ЗАМОВНИКА та іншим нормативним документам.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        6.2. ПІДРЯДНИК несе повну відповідальність при використанні обладнання
        та/або іншого майна Замовника, за збереження матеріальних цінностей
        Замовника на місці виконання робіт (будівельному майданчику), освітлення
        й огородження його, дотримання санітарних та протипожежних вимог
        складування будівельних матеріалів і техніки, охорону праці й техніку
        безпеки при проведенні робіт в умовах житлової забудови та інших правил,
        що застосовуються при виконанні будівельних робіт.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        6.3. Відповідальність за дотримуванням техніки безпеки та охорони праці
        згідно із законодавством України про охорону праці несе ПІДРЯДНИК.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        6.4. Підрядник забезпечує збереження результатів робіт та несе всі
        ризики до моменту прийняття закінченних робіт Замовником, ПІДРЯДНИК
        відповідає за наслідки пошкодження або повної втрати результатів роботи
        з власної вини.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        6.5. ЗАМОВНИК забезпечує контроль і технічний нагляд за відповідністю
        якості, обсягів і ціни виконаних робіт кошторису, державним будівельним
        нормам і правилам. У разі наявності відхилень ЗАМОВНИК видає ПІДРЯДНИКУ
        розпорядження про їх усунення. У разі порушень ЗАМОВНИК може приймати
        рішення про призупинення робіт та відмовляє у підписанні акта
        здачі-приймання виконаних робіт. У цьому випадку ПІДРЯДНИК
        зобов&apos;язаний відшкодувати ЗАМОВНИКУ збитки у повному обсягу, понад
        сум штрафних санкцій.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        6.6. ПІДРЯДНИК завчасно і в письмовій формі інформує ЗАМОВНИКА про
        можливість припинення або сповільнення виконання робіт через незалежні
        від нього обставини.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        7. ЗДАЧА І ПРИЙМАННЯ РОБІТ
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        7.1. Здача-приймання робіт після їх закінчення здійснюється згідно з
        чинним порядком і оформлюється актом приймання виконаних робіт у формі
        КБ-2в, КБ-3.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        7.2. Розрахунок вартості фактично виконаних робіт у формі КБ-2в, КБ-3
        виконується ПІДРЯДНИКОМ згідно з вимогами державних будівельних норм,
        узгодженої договірної ціни, проектно-кошторисної документації
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        7.3. При виявленні в процесі здачі-приймання робіт недоробок або
        недоліків, на недоробки або недоліки складається акт із визначенням
        строків їх усунення. Вартість робіт над недоробками або недоліками до їх
        усунення не відшкодовується.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        7.4. Якщо при здачі-прийманні робіт будуть виявлені суттєві недоробки
        або недоліки, що виникли з вини ПІДРЯДНИКА або умов договору, ЗАМОВНИК
        має право не підписувати акт приймання виконаних робіт і затримує оплату
        робіт, виконаних з порушенням.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        Якщо усунення недоробок або недоліків буде неможливим, або буде вимагати
        дуже великих витрат, за рішенням ЗАМОВНИКА сторони визначають заподіяні
        збитки і на цей обсяг скорочується розмір кінцевих платежів ПІДРЯДНИКУ.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        8. ВІДПОВІДАЛЬНІСТЬ СТОРІН
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.1. У разі невиконання або неналежного виконання своїх зобов’язань за
        Договором Сторони несуть відповідальність, передбачену законами та цим
        Договором.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.2. У разі невиконання або несвоєчасного виконання зобов’язань при
        виконанні робіт ПІДРЯДНИК сплачує ЗАМОВНИКУ штрафні санкції:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - за порушення умов зобов&apos;язання щодо якості робіт стягується штраф
        у розмірі двадцяти відсотків вартості неякісних робіт;{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - за порушення строків виконання зобов&apos;язання стягується пеня у
        розмірі 0,1 відсотка вартості робіт, з яких допущено прострочення
        виконання за кожний день прострочення, а за прострочення понад тридцять
        днів додатково стягується штраф у розмірі п’яти відсотків вказаної
        вартості.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.3. Сторони звільняються від відповідальності за невиконання або
        неналежне виконання зобов’язань за цим Договором у разі виникнення
        обставин непереборної сили, які не існували під час укладання Договору
        та виникли поза волею Сторін (аварія, катастрофа, стихійне лихо,
        епідемія, епізоотія, війна тощо).
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.4. Сторона, що не може виконувати зобов&apos;язання за цим Договором
        унаслідок дії обставин непереборної сили, повинна не пізніше ніж
        протягом 5-ти днів з моменту їх виникнення повідомити про це іншу
        Сторону у письмовій формі
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.5. Доказом виникнення обставин непереборної сили та строку їх дії є
        відповідні документи, які видаються Запорізькою Торгово-промисловою
        палатою України або іншою, уповноваженою на це установою.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.6. У разі коли строк дії обставин непереборної сили продовжується
        більше ніж 30 днів, кожна із Сторін в установленому порядку має право
        розірвати цей Договір. У разі попередньої оплати ПІДРЯДНИК повертає
        ЗАМОВНИКУ кошти протягом трьох днів з дня розірвання цього Договору.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.7. У випадку виникнення спорів або розбіжностей Сторони
        зобов&apos;язуються вирішувати їх шляхом взаємних переговорів та
        консультацій.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        8.8. У разі недосягнення Сторонами згоди спори (розбіжності) вирішуються
        у судовому порядку.{' '}
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        9. СТРОК ДІЇ ДОГОВОРУ{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        9.1. Цей Договір набирає чинності з моменту його укладання і діє до 31
        грудня {contrDateStr} р., але в будь якому разі до виконання сторонами
        своїх обов&apos;язків відповідно до цього Договору .{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        9.2. Закінчення строку цього Договору не звільняє Сторони від
        відповідальності за його порушення, яке мало місце під час дії цього
        Договору.{' '}
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        10. ПРИЗУПИНЕННЯ ТА РОЗІРВАННЯ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        10.1. ЗАМОВНИК має право у односторонньому порядку розірвати або
        призупинити договір у випадках:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        а) відсутності коштів для фінансування виконуваних робіт ПІДРЯДНИКОМ;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        б) виявлення недоцільності фінансування та подальшого ведення
        виконуваних робіт, а також появи обставин непереборної сили, тощо;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        в) виявлення стійкої фінансової неплатоспроможності ПІДРЯДНИКА;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        г) відставання у виконанні доручених об&apos;ємів робіт з вини
        ПІДРЯДНИКА згідно з строками виконання робіт;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        д) неодноразового та/або грубого порушення ПІДРЯДНИКОМ державних
        будівельних норм та правил, відхилення при виконанні робіт від проектних
        рішень.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        10.2. Якщо ЗАМОВНИК прийняв рішення про продовження терміну виконання
        робіт або розірвання договору він зобов&apos;язаний письмово попередити
        іншу сторону не менш як за 15 днів до дати вступу такого рішення в силу.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        10.3. У разі істотних порушень ПІДРЯДНИКОМ своїх зобов&apos;язань за цим
        договором, які створюють передумови для несвоєчасного завершення
        виконання робіт у встановлений договором термін, ЗАМОВНИК має право
        укласти договір на виконання частини робіт за цим договором з іншим
        підрядником, попередньо повідомивши ПІДРЯДНИКА про зменшення обсягів
        робіт письмово.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        У випадку розірвання Договору з вини ПІДРЯДНИКА, останній
        зобов&apos;язаний відшкодувати ЗАМОВНИКУ всі збитки в повному обсязі,
        понад сум штрафних санкцій.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        11. ІНШІ УМОВИ{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.1. ПІДРЯДНИК гарантує якість виконаних робіт впродовж трьох років.
        При виявленні у цей період недоліків, які обумовлені виконанням робіт з
        порушенням діючих чинних норм та правил, проектної документації,
        усунення їх є обов’язком ПІДРЯДНИКА, за його рахунок. Включенню до
        дефектного акту підлягають недоліки, які виникли з вини ПІДРЯДНИКА. За
        недоліки, які обумовлені експлуатацією об’єкту з порушенням правил
        експлуатації, ПІДРЯДНИК відповідальності не несе.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.2. На протязі дії гарантійного терміну ПІДРЯДНИК несе
        відповідальність за недоліки, які призвели до руйнування, аварії,
        обвалюванню, при умові, якщо не доведе, що вони сталися не з вини
        ПІДРЯДНИКА.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.3. ПІДРЯДНИК несе відповідальність за наявність ліцензій, необхідних
        для виконання робіт, визначених нормативними документами.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.4. У випадку розірвання цього Договору, ПІДРЯДНИК зобов’язаний
        передати ЗАМОВНИКУ незавершене будівництво, оплачені матеріальні
        ресурси, проектно-кошторисну та виконавчу документацію у термін, що не
        може перевищувати 20 календарних днів від дати розірвання Договору.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.5. У разі зміни реквізитів Сторони зобов’язані у термін до 3-х
        робочих днів письмово повідомити про такі зміни.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.6. Кожна із сторін за цим договором не має права передавати свої
        права по цьому Договору третій стороні без письмової на це згоди другої
        сторони.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.7. У випадках, не передбачених цим Договором, Сторони керуються
        чинним законодавством України
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.8. ПІДРЯДНИК {executorTaxationType}.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.9. ЗАМОВНИК є платником ПДВ та платником податку на прибуток на
        загальних умовах.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.10. У випадку якщо ПІДРЯДНИК є платником ПДВ та платником податку на
        прибуток на загальних умовах, він складає податкову накладну в день
        виникнення податкових зобов’язань, визначених у відповідності з нормами
        статті 187.7 Податкового кодексу України та надає Замовнику в порядку,
        визначеному пунктом 201.1 статті 201 Податкового кодексу України.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.11. Вартість прямих витрат визначається у такому порядку:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - заробітна плата приймається у рівні, рекомендованому Мінрегіонбудом
        відповідно до даного періоду;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - вартість машино-години будівельних машин та механізмів за показниками
        Мінрегіонбуду із урахуванням фактичної вартості паливно-мастильних
        матеріалів;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - транспортні витрати приймаються по усередненим показникам за провізну
        плату з урахуванням фактичної відстані перевезення, узгодженої з
        ЗАМОВНИКОМ;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - вартість матеріалів, конструкцій та виробів не повинна перевищувати
        рівня середніх регіональних цін;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - заготівельно-складські витрати приймаються у розмірі 2% (для
        металоконструкцій 0,75%) від вартості придбання матеріалів з урахуванням
        витрат на перевезення
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - кошти на покриття загальновиробничих витрат визначаються відповідно до
        показників, які склалися на підприємстві за попередній рік але не більше
        показників рекомендованих Мінрегіонбудом;
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - додаткові витрати, пов’язані з виконанням робіт просто неба у літній
        та зимовий періоди, визначаються згідно КНУ «Настанова з визначення
        вартості будівництва» зі змінами і доповненнями.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.12. Сторони домовились про розміщення інформації про умови даного
        Договору на сайті Запорізької міської ради в розділі «Міське
        господарство. Реєстр укладених договорів закупівлі» по формі та змісту,
        зазначених на сайті.
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        11.13. Цей договір складений у 2-х примірниках, що мають однакову
        юридичну силу.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        12. ДОДАТКИ ДО ДОГОВОРУ{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        Невід&apos;ємною частиною цього Договору є:
      </Typography>
      <Typography variant='body2' className={classes['rems-budjet-paragraph']}>
        - договірна ціна;
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-budjet-chapter']}
        align='center'
      >
        13. МІСЦЕЗНАХОДЖЕННЯ ТА БАНКІВСЬКІ РЕКВІЗИТИ СТОРІН
      </Typography>
      <TableContainer id='table-rems-contract-budjet-sign'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
                // paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   borderBottom: '1px solid black',
                  //   borderLeft: '1px solid transparent',
                  // }}
                >
                  ПІДРЯДНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  <strong>КП «Запоріжремсервіс» ЗМР</strong>{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  <strong>
                    {executorTypeShort} «{executorName}»
                  </strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  {clientAddres}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  {executorAddres}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  {' '}
                  {clientIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  mb={2}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-text']}
                  mb={2}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-text']}
                    >
                      {clientFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   // borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-text']}
                    >
                      {executorFIOImen}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  align='left'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   borderBottom: '1px solid black',
                  //   borderLeft: '1px solid black',
                  // }}
                >
                  М.П.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='left'
                  className={classes['rems-budjet-text']}
                  // sx={{
                  //   // borderTop: '1px solid black',
                  //   borderRight: '1px solid black',
                  //   borderBottom: '1px solid black',
                  //   // borderLeft: '1px solid black',
                  // }}
                >
                  М.П.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
