import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

import classes from '../styles.module.scss';

export default function RemsBudjetPrAndAvtDogToPrint({
  currentContract,
  currentClient,
  currentExecutor,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
  currentExecutor: I_Client;
}>) {
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

  const clientIBAN = currentClient?.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  //@ts-ignore
  const executorTypeLong = currentExecutor?.firmType?.firmTypeLongName;
  //@ts-ignore
  const executorTypeShort = currentExecutor?.firmType?.firmTypeShortName;
  const executorName = currentExecutor?.clientShortName;
  const executorJobTitleRod = currentExecutor?.jobTitle_rodit;
  const executorJobTitleimen = currentExecutor?.jobTitle;
  const executorFIORodit = `${currentExecutor?.lastName_rodit} ${currentExecutor?.firstName_rodit} ${currentExecutor?.patronymic_rodit}`;
  const executorFIOImen = `${
    currentExecutor?.firstName_imen
  } ${currentExecutor?.lastName_imen?.toLocaleUpperCase()}`;
  const executorActsOn = currentExecutor?.whichActsOnTheBasis;
  //@ts-ignore
  const executorTaxationType = currentExecutor?.taxationType?.taxationTypeName;
  const executorAddres = `${currentExecutor?.postIndex}, ${currentExecutor?.address}`;
  const executorIBAN = currentExecutor?.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentExecutor?.edrpou}`;

  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;
  const expertizaSumBudjet = currentContract?.expertizaSumBudjet;

  const expertizaSumBudjetPDV = expertizaSumBudjet / 6;

  const totalContractSum =
    proectnSumBudjet + avtorskSumBudjet + expertizaSumBudjet;

  const [totalContractSumGrn, totalContractSumKop] =
    totalContractSum > 0
      ? totalContractSum.toFixed(2).split('.')
      : '0.00'.split('.');
  const [proectnSumBudjetSumGrn, proectnSumBudjetSumKop] =
    proectnSumBudjet > 0
      ? proectnSumBudjet.toFixed(2).split('.')
      : '0.00'.split('.');
  const [avtorskSumBudjetSumGrn, avtorskSumBudjetSumKop] =
    avtorskSumBudjet > 0
      ? avtorskSumBudjet.toFixed(2).split('.')
      : '0.00'.split('.');
  const [expertizaSumBudjetSumGrn, expertizaSumBudjetSumKop] =
    expertizaSumBudjet > 0
      ? expertizaSumBudjet.toFixed(2).split('.')
      : '0.00'.split('.');
  const [expertizaSumPDVSumGrn, expertizaSumPDVSumKop] =
    expertizaSumBudjetPDV > 0
      ? expertizaSumBudjetPDV.toFixed(2).split('.')
      : '0.00'.split('.');
  const totalContractSumPropis = FloatToSamplesInWordsUkr(totalContractSum);
  const proectnSumBudjetPropis = FloatToSamplesInWordsUkr(proectnSumBudjet);
  const avtorskSumBudjetPropis = FloatToSamplesInWordsUkr(avtorskSumBudjet);
  const expertizaSumBudjetPropis = FloatToSamplesInWordsUkr(expertizaSumBudjet);

  return (
    <div className={classes.page} id='page'>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      ></Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      ></Typography>

      <TableContainer id='table-rems-budjet-pr-avt-dog-header'>
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
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='center'
                >
                  <strong>ДОГОВІР №</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='center'
                >
                  <strong>
                    на виконання проектних робіт та здійснення авторського
                    нагляду
                  </strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='center'
                >
                  <strong>по обꞌєкту « {contractDescription} »</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='right'
                >
                  «____» ____________ {contrDateStr} р.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        ЗАМОВНИК: Комунальне підприємство «Запоріжремсервіс» Запорізької міської
        ради в особі {clientJobTitleRod} {clientFIORodit}, який діє на підставі{' '}
        {clientActsOn}, з однієї сторони,
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        ПІДРЯДНИК: {executorTypeLong} « {executorName} » іменоване надалі
        Підрядник ., в особі {executorJobTitleRod} {executorFIORodit}, який(ка)
        діє на підставі {executorActsOn} підприємства з другої сторони, уклали
        цей договір про нижченаведене:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        1. Предмет Договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        1.1. В порядку та на умовах, визначених цим Договором, ПІДРЯДНИК бере на
        себе зобов&apos;язання своїми силами і засобами, за рахунок коштів,
        перерахованих Головним розпорядником ЗАМОВНИКУ виконати проектні роботи
        в частині кошторисної документації{' '}
        <strong>
          по обꞌєкту код ДК 021:2015 71240000-2 Архітектурні, інженерні та
          планувальні послуги. Капітальні трансферти підприємствам (установам,
          організаціям) « {contractDescription} »
        </strong>{' '}
        , (надалі іменується &ldquo;об&apos;єкт&rdquo;) згідно дефектного акту,
        пройти експертизу та отримати позитивний висновок в спеціалізованої
        організації, здійснювати авторський нагляд за виконанням
        будівельно-монтажних робіт, а ЗАМОВНИК зобов&apos;язується прийняти
        виконані роботи і сплатити ПІДРЯДНИКУ вартість виконаних робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        1.2. ЗАМОВНИК здійснює фінансування ПІДРЯДНИКА за рахунок коштів,
        перерахованих Головним розпорядником коштів – Департаментом з управління
        житлово-комунальним господарством Запорізької міської ради, наданих для
        фінансування предмету договору, в межах яких буде проводитись оплата
        виконаних робіт ПІДРЯДНИКОМ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        2. Виконання робіт
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.1. ЗАМОВНИК забезпечує надання ПІДРЯДНИКУ вихідних даних (дефектний
        акт, копії інвентарної справи житлового будинку, необхідні
        характеристики житлового будинку й іншу інформацію) щодо об&apos;єкта,
        визначеного у п. 1.1 цього Договору, в строк не пізніше 10 робочих днів
        з дня отримання ЗАМОВНИКОМ від ПІДРЯДНИКА листа-вимоги про надання
        відповідних даних.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        Несвоєчасне надання ЗАМОВНИКОМ вихідних даних, надає право ПІДРЯДНИКУ
        ставити питання про продовження терміну виконання робіт.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.2. ПІДРЯДНИК приступає до виконання проектних робіт за цим Договором
        не пізніше 3-х календарних днів з моменту отримання від ЗАМОВНИКА
        вихідних даних визначених у п. 2.1 цього Договору.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.3. ПІДРЯДНИК виконує роботи відповідно до вимог державних будівельних
        норм і правил, строків виконання робіт, вимог техніки безпеки та охорони
        праці.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.4. ЗАМОВНИК має право здійснювати контроль за ходом та якістю
        виконання проектних робіт ПІДРЯДНИКОМ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.5. При неможливості виконання окремих частин проектних робіт власними
        силами ПІДРЯДНИК за узгодженням із ЗАМОВНИКОМ має право залучати до їх
        виконання на умовах субпідряду спеціалістів чи спеціалізовані проектні
        організації. Відповідальність за виконання ними взятих на себе
        зобов&apos;язань несе ПІДРЯДНИК.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.6. ПІДРЯДНИК зобов&apos;язується не пізніше 3-х календарних днів після
        настання кінцевого терміну, визначеного у п. 5.1 цього Договору,
        передати ЗАМОВНИКУ матеріали виконаних проектних робіт, що є предметом
        договору, на паперових носіях у двох примірниках, додатково на
        електронному носії кошторисну документацію на об&apos;єкт та скласти і
        підписати Акт приймання-передачі.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.7. ЗАМОВНИК зобов&apos;язується не зволікати із прийманням матеріалів
        виконаних проектних робіт та підписати Акт приймання-передачі протягом 5
        робочих днів з моменту його надання.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        2.8. У разі виявлення недоліків у матеріалах виконаних проектних робіт,
        в т.ч. за наслідками проведеної експертизи, ЗАМОВНИК вправі вимагати від
        ПІДРЯДНИКА усунення таких недоліків у 14-денний термін після виявлення
        недоліків.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        3. Ціна договору та порядок оплати
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        3.1. Ціна договору складає {totalContractSumGrn} грн.
        {totalContractSumKop} коп. ( {totalContractSumPropis} ) без ПДВ
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        {' '}
        Ціна договору враховує усі витрати ПІДРЯДНИКА на виконання предмету
        договору, в тому числі:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - Вартість проектних робіт - {proectnSumBudjetSumGrn} грн.{' '}
        {proectnSumBudjetSumKop} коп. ( {proectnSumBudjetPropis} ) без ПДВ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - Роботи з авторського нагляду {avtorskSumBudjetSumGrn} грн.{' '}
        {avtorskSumBudjetSumKop} коп. ( {avtorskSumBudjetPropis} ) без ПДВ.
      </Typography>
      {expertizaSumBudjet > 0 && (
        <Typography
          variant='body2'
          className={classes['rems-budjet-pr-avt-dog-paragraph']}
        >
          - Вартість проходження експертизи {expertizaSumBudjetSumGrn} грн.{' '}
          {expertizaSumBudjetSumKop} коп. ( {expertizaSumBudjetPropis} ) у тому
          числі ПДВ {expertizaSumPDVSumGrn} грн. {expertizaSumPDVSumKop} коп
        </Typography>
      )}

      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        3.2. Ціна робіт може уточнюватися протягом виконання зобов&apos;язань у
        випадках: уточнення фактично виконаних робіт, уточнення фактично
        понесених ПІДРЯДНИКОМ витрат, змінення проектних рішень за ініціативою
        ЗАМОВНИКА, виявлення необхідності проведення непередбачених робіт, які
        не було виявлено на стадії укладання договору, а також отримання
        додаткових технічних умов, узгоджень, виникнення обставин непереборної
        сили, змінення законодавства у ціноутворенні, або змінення порядку
        відрахувань податків, надання ЗАМОВНИКОМ додаткового завдання.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        3.3. Перегляд ціни договору обґрунтовується розрахунками та оформлюється
        сторонами шляхом укладання додаткових угод з обґрунтуванням обставин.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        3.4.Оплата виконаних робіт здійснюється в повному розмірі після
        отримання від ПІДРЯДНИКА позитивного звіту спеціалізованої організації
        на підставі підписаного ЗАМОВНИКОМ акту виконаних робіт у термін 10
        календарних днів після надходження коштів для фінансування предмету
        договору на рахунок ЗАМОВНИКА від Головного розпорядника коштів.
        Розрахунок здійснюється у безготівковій формі шляхом перерахування
        Замовником грошових коштів на поточний рахунок Постачальника, відповідно
        до підпункту 3 пункту 19 Постанови КМУ від 09 червня 2021р. №590 та в
        порядку передбаченому «Про затвердження Порядку виконання повноважень
        Державною казначейською службою в особливому режимі в умовах воєнного
        стану» (зі змінами).
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        4. Права й обов&apos;язки Сторін
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        4.1. ЗАМОВНИК зобов&apos;язаний:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - вчасно передати ПІДРЯДНИКУ вихідні дані згідно п.2.1. цього договору;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - забезпечити надання доступу до об&apos;єкту;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - здійснити приймання результатів робіт в порядку та на умовах,
        визначених цим Договором;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - в обумовлений Договором строк провести оплату виконаних робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - погодити кошторисну документацію;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        4.2. ЗАМОВНИК має право:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - вимагати виконання робіт та досягнення їх результату відповідно до
        строків, порядку та інших умов і вимог, установлених Договором, вимог
        чинного законодавства України та інших вимог, що зазвичай ставляться до
        роботи та результату роботи такого виду;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - здійснювати контроль за ходом та якістю виконання проектних робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - вносити зміни до дефектного акту.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        4.3. ПІДРЯДНИК зобов&apos;язаний:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - виконати роботи у відповідності з умовами договору та дефектним актом,
        пройти експертизу та отримати позитивний висновок від спеціалізованої
        організації, забезпечити якість робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - не передавати без згоди ЗАМОВНИКА кошторисну документацію іншим
        особам;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - безпосередньо брати участь у розгляді проектних рішень в експертних
        організаціях і здійснювати їх захист на вимогу експертних та
        погоджувальних організацій.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        4.4. ПІДРЯДНИК має право:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        {' '}
        - отримати оплату за виконані роботи в порядку та на умовах, визначених
        цим Договором;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - залучати до виконання частини проектних робіт третіх осіб
        (кваліфікованих спеціалістів чи спеціалізовані проектні організації).
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        5.1. Строк виконання робіт: протягом {contrDateStr} р.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        5.2. Строк виконання робіт переглядається в наступних випадках:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - у разі внесення змін у дефектний акт, якщо це тягне за собою
        збільшення обсягу робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - у разі ненадання ЗАМОВНИКОМ у передбачений договором строк вихідних
        даних, якщо їх несвоєчасне ненадання унеможливлює закінчення виконання
        робіт ПІДРЯДНИКОМ в строк відповідно до п. 5.1. договору. В цьому
        випадку термін виконання робіт продовжується на строк затримки видання
        вихідних даних.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        5.3. У разі виникнення обставин, що не залежать від ПІДРЯДНИКА і
        перешкоджають виконанню робіт у строк зазначений договором, ПІДРЯДНИК
        може ставити перед ЗАМОВНИКОМ питання про його перегляд.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        5.4. Рішення про перегляд строку оформляється додатковою угодою до цього
        договору з обґрунтуванням обставин.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      ></Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        5.5. Строки проходження експертизи визначаються відповідно до діючого
        законодавства.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        6. Відповідальність Сторін і вирішення спорів
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.1. Якщо робота виконана ПІДРЯДНИКОМ з відступами від умов договору або
        з іншими недоліками, які роблять її непридатною для використання,
        ЗАМОВНИК має право за своїм вибором вимагати від ПІДРЯДНИКА:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        а) безоплатного усунення недоліків в роботі у встановлений ЗАМОВНИКОМ
        строк;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        б) пропорційного зменшення ціни роботи;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        в) відшкодування своїх витрат на усунення недоліків.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.2. У випадку невиконання робіт або виконання не в повному обсязі у
        строк, визначений цим Договором, ПІДРЯДНИК сплачує ЗАМОВНИКУ пеню в
        розмірі 0,1% від суми невиконаних робіт за кожен день прострочення
        виконання, а за прострочення понад тридцяти днів додатково стягується
        штраф у розмірі 7% від загальної вартості робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.3. У випадку порушення строків отримання позитивного звіту експертизи
        з вини ПІДРЯДНИКА, ПІДРЯДНИК сплачує ЗАМОВНИКУ пеню в розмірі 0,1% від
        вартості робіт за кожен день прострочення.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.4. У випадку порушення своїх зобов&apos;язань за цим Договором Сторони
        несуть відповідальність, визначену цим Договором та чинним
        законодавством України.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.5. Усі спори що виникли між сторонами вирішуються в господарському
        суді відповідно до вимог чинного законодавства України.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.6. У разі отримання від ЗАМОВНИКА або погоджувальних й експертних
        служб мотивованих зауважень, пов&apos;язаних з порушенням законодавства
        та нормативних вимог, ПІДРЯДНИК зобов&apos;язаний безоплатно внести
        необхідні зміни й доповнення в проектну продукцію в узгоджені із
        ЗАМОВНИКОМ термін.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.7. Оплату повторної експертизи виконує ПІДРЯДНИК, у разі наявності
        помилок при виконанні проектних рішень
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        6.8. У випадку порушення ЗАМОВНИКОМ термінів оплати згідно п. 3.4. він
        сплачує ПІДРЯДНИКУ неустойку в розмірі подвійної облікової ставки НБУ за
        кожний прострочений день. Порушенням щодо несвоєчасного фінансування з
        вини ЗАМОВНИКА є лише ті несплати, які виникли внаслідок ненадання
        ЗАМОВНИКОМ документів для оплати до органів Держказначейства за
        наявності необхідних грошових коштів на рахунку ЗАМОВНИКА.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        7. Призупинення робіт та розірвання договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        7.1. ЗАМОВНИК має право у односторонньому порядку розірвати або
        призупинити договір у випадках:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        а) відсутності коштів для фінансування виконаних ПІДРЯДНИКОМ робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        б) виявлення недоцільності фінансування та подальшого ведення
        виконуваних робіт, а також появи обставин непереборної сили, неякісності
        проекту тощо;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        в) виявлення стійкої фінансової неплатоспроможності ПІДРЯДНИКА;
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        г) відставання у виконанні робіт з вини ПІДРЯДНИКА згідно з строками
        виконання робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        7.2. Якщо ЗАМОВНИК прийняв рішення про продовження терміну виконання
        робіт або розірвання договору він зобов&apos;язаний письмово попередити
        іншу сторону не менш як за 15 днів до дати вступу такого рішення в силу.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        7.3. У випадку розірвання договору ПІДРЯДНИК зобов&apos;язаний передати
        ЗАМОВНИКУ або його правонаступнику виконані роботи, проектні рішення та
        іншу документацію за актом приймання-передачі у десятиденний термін з
        дня розірвання.{' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        7.4. У разі істотних порушень ПІДРЯДНИКОМ своїх зобов&apos;язань за цим
        договором, які створюють передумови для несвоєчасного завершення
        виконання робіт у встановлений договором термін, ЗАМОВНИК має право
        укласти договір на виконання частини робіт за цим договором з іншим
        підрядником, попередньо повідомивши ПІДРЯДНИКА про зменшення обсягів
        робіт письмово.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        7.5. У випадку розірвання Договору за п.п. «г» п.7.1. та п. 7.4. цього
        Договору ПІДРЯДНИК зобов&apos;язаний відшкодувати ЗАМОВНИКУ всі збитки в
        повному обсязі, понад сум штрафних санкцій.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        7.6. У разі розірвання цього договору сторони складають акт виконаних
        робіт, що є підставою для здійснення взаємних розрахунків.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        8. Строк дії Договору та інші умови
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.1. Цей Договір набуває чинності з моменту його підписання і діє до 31
        грудня {contrDateStr} року, а в частині фінансових розрахунків до
        повного виконання Сторонами.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.2. Після підписання цього Договору всі попередні переговори за ним,
        листування, попередні угоди та протоколи про наміри з питань, що так чи
        інакше стосуються цього Договору, втрачають юридичну силу.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.3. Зміни в цей Договір можуть бути внесені за взаємною згодою Сторін,
        що оформляється додатковою угодою до цього Договору і які є його
        невід&apos;ємною частиною і мають юридичну силу у разі, якщо вони
        викладені у письмовій формі та підписані уповноваженими на те
        представниками Сторін.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.4. Кожна із сторін договору не має права передавати свої права по
        цьому договору третій стороні.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.5. Згідно з діючим законодавством України ЗАМОВНИК є платником ПДВ та
        платником податку на прибуток на загальних умовах.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.6. Згідно з діючим законодавством України ПІДРЯДНИК{' '}
        {executorTaxationType}
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.7. У випадку якщо ПІДРЯДНИК є платником ПДВ та платником податку на
        прибуток на загальних умовах, він складає податкову накладну в день
        виникнення податкових зобов’язань, визначених у відповідності з нормами
        статті 187.7 Податкового кодексу України та надає Замовнику в порядку,
        визначеному пунктом 201.1 статті 201 Податкового кодексу України.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.8. У разі змін статусу платника податку та зміни адреси, сторони
        зобов&apos;язуються письмово сповіщати один одного протягом 3-х
        календарних днів, наступних за днем, в якому відбулася така зміна.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        8.9. Усі правовідносини, що виникають у зв&apos;язку з виконанням умов
        цього Договору і не врегульовані ним, регламентуються нормами чинного в
        Україні законодавства.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        {' '}
        8.10. Цей Договір складений українською мовою, в 2-х примірниках, які
        мають однакову юридичну силу.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        {' '}
        8.11. Сторони домовились про розміщення інформації про умови даного
        Договору на сайті Запорізької міської ради в розділі «Міське
        господарство. Реєстр укладених договорів закупівлі» по формі та змісту,
        зазначених на сайті.
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        9. Додатки до договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        9.1.Невід&apos;ємною частиною цього Договору є:
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - кошторис на виконання проектних робіт (додаток №1)
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-paragraph']}
      >
        - кошторис на здійснення авторського нагляду (додаток №2)
      </Typography>
      <Typography
        variant='body2'
        className={classes['rems-budjet-pr-avt-dog-chapter']}
      >
        10. Місцезнаходження та банківські реквізити сторін
      </Typography>
      <TableContainer id='table-rems-budjet-pr-avt-dog-sign'>
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
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='center'
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  align='center'
                >
                  ПІДРЯДНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  <strong>КП «Запоріжремсервіс» ЗМР</strong>{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
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
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  {clientAddres}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  {executorAddres}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  pr={1}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  mb={2}
                >
                  {clientJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-budjet-pr-avt-dog-text']}
                  mb={2}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-pr-avt-dog-text']}
                    >
                      {clientFIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid container direction={`row`}>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-budjet-pr-avt-dog-text']}
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
                  className={classes['rems-budjet-pr-avt-dog-text']}
                >
                  М.П.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  align='left'
                  className={classes['rems-budjet-pr-avt-dog-text']}
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
