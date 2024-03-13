import { I_Contract, I_Client } from '@/interfaces/refdata';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import classes from '../styles.module.scss';

export default function JkhProectnAvtDogToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contrProectAvtorskNumber = currentContract?.contrProectAvtorskNumber;
  const contractDescription = currentContract?.contractDescription;
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  //@ts-ignore
  const clientTypeLong = currentClient?.firmType?.firmTypeLongName;
  const clientJobTitleRod = currentClient?.jobTitle_rodit;
  const clientFIORodit = `${currentClient?.lastName_rodit} ${currentClient?.firstName_rodit} ${currentClient?.patronymic_rodit}`;
  const clientActsOn = currentClient?.whichActsOnTheBasis;
  const clientName = currentClient?.clientShortName;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const clientEDRPO = `ЄДРПОУ: ${currentClient?.edrpou}`;
  const clientJobTitleimen = currentClient?.jobTitle;
  const clientFIOImen = `${
    currentClient?.firstName_imen
  } ${currentClient?.lastName_imen?.toLocaleUpperCase()}`;
  const paymentSourceProectnAvt = currentContract?.paymentSourceProectnAvt;
  const clientIBAN =
    paymentSourceProectnAvt === 'собств'
      ? currentClient?.iban
      : currentClient?.iban_budget;

  const proectnSumBudjet = currentContract?.proectnSumBudjet;
  const avtorskSumBudjet = currentContract?.avtorskSumBudjet;

  const totalSum = proectnSumBudjet + avtorskSumBudjet;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);
  const proectnSumPropis = FloatToSamplesInWordsUkr(proectnSumBudjet);
  const avtorskSumPropis = FloatToSamplesInWordsUkr(avtorskSumBudjet);

  const [totalSumGrn, totalSumKopeyki] = totalSum
    ? totalSum.toFixed(2).split('.')
    : '0.00'.split('.');
  const [proectnSumGrn, proectnSumKopeyki] = proectnSumBudjet
    ? proectnSumBudjet.toFixed(2).split('.')
    : '0.00'.split('.');
  const [avtorskSumGrn, avtorskSumKopeyki] = avtorskSumBudjet
    ? avtorskSumBudjet.toFixed(2).split('.')
    : '0.00'.split('.');

  return (
    <div className={classes.page} id='page'>
      <TableContainer
        id='table-jkh-proectn-avt-header'
        sx={{ marginBottom: 2 }}
      >
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
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
                  className={classes['jkh-proectn-avt-chapter']}
                  align='center'
                >
                  ДОГОВІР №{contrProectAvtorskNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-paragraph']}
                  align='center'
                >
                  на виконання проектних робіт
                  {avtorskSumBudjet > 0 &&
                    ' та здійснення авторського нагляду'}{' '}
                  по обꞌєкту :
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-paragraph']}
                  align='center'
                >
                  <strong>« {contractDescription} »</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-paragraph']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-paragraph']}
                  align='right'
                >
                  «___»_______________{contrDateStr} року.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        ЗАМОВНИК: {clientTypeLong} « {clientName} » в особі {clientJobTitleRod}
        {` ${clientFIORodit}`} який діє на підставі {clientActsOn}, з одної
        сторони,
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        ПІДРЯДНИК: ФОП Пастушок Любов Іванівна, якій є платником єдиного податку
        за ставкою 5%, 3 група, не платник ПДВ, з другої сторони, уклали цей
        договір про нижченаведене:
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        1. Предмет Договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        1.1 В порядку та на умовах, визначених цим Договором, ПІДРЯДНИК бере на
        себе зобов&apos;язання своїми силами і засобами, виконати проектні
        роботи в частині кошторисної документації по об’єкту{' '}
        <strong> « {contractDescription} »</strong> , (надалі іменується
        об&apos;єкт) згідно дефектного акту
        {avtorskSumBudjet > 0 &&
          ` здійснювати авторський нагляд за
        виконанням ремонтних робіт`}{' '}
        , а ЗАМОВНИК зобов&apos;язується прийняти виконані роботи і сплатити
        ПІДРЯДНИКУ вартість виконаних робіт.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        1.2. ЗАМОВНИК здійснює фінансування ПІДРЯДНИКА за рахунок власних коштів
        наданих для фінансування предмету договору, в межах яких буде
        проводитись оплата виконаних робіт ПІДРЯДНИКОМ.
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        2. Виконання робіт
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        2.1 ЗАМОВНИК забезпечує надання ПІДРЯДНИКУ вихідних даних (дефектний
        акт){' '}
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        2.2. ПІДРЯДНИК приступає до виконання проектних робіт за цим Договором
        не пізніше 3-х календарних днів з моменту отримання від ЗАМОВНИКА
        вихідних даних визначених у п. 2.1 цього Договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        2.3. ПІДРЯДНИК зобов&apos;язується не пізніше 3-х календарних днів після
        настання кінцевого терміну, визначеного у п. 5.1 цього Договору,
        передати ЗАМОВНИКУ матеріали виконаних проектних робіт, що є предметом
        договору, на паперових носіях у двох примірниках, додатково на
        електронному носії кошторисну документацію на об&apos;єкт та скласти і
        підписати Акт приймання-передачі.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        2.4. ЗАМОВНИК зобов&apos;язується не зволікати із прийманням матеріалів
        виконаних проектних робіт та підписати Акт приймання-передачі протягом 5
        робочих днів з моменту його надання.{' '}
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        3. Ціна договору та порядок оплати
      </Typography>

      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        3.1. Ціна договору складає {totalSumGrn} грн.{totalSumKopeyki} коп. (
        {totalSumPropis}) без ПДВ. Ціна договору враховує усі витрати ПІДРЯДНИКА
        на виконання предмету договору, в тому числі:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - Вартість проектних робіт – {proectnSumGrn} грн. {proectnSumKopeyki}{' '}
        коп.( {proectnSumPropis} ) без ПДВ;
      </Typography>
      {avtorskSumBudjet > 0 && (
        <Typography
          variant='body2'
          className={classes['jkh-proectn-avt-paragraph']}
        >
          - Роботи з авторського нагляду - {avtorskSumGrn} грн.{' '}
          {avtorskSumKopeyki} коп.( {avtorskSumPropis} ) без ПДВ;
        </Typography>
      )}

      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        3.2. Ціна робіт може уточнюватися протягом виконання зобов&apos;язань у
        випадках: уточнення фактично виконаних робіт, уточнення фактично
        понесених ПІДРЯДНИКОМ витрат, змінення проектних рішень за ініціативою
        ЗАМОВНИКА, виявлення необхідності проведення непередбачених робіт, які
        не було виявлено на стадії укладання договору, а також отримання
        додаткових умов, узгоджень, виникнення обставин непереборної сили,
        змінення законодавства у ціноутворенні, або змінення порядку відрахувань
        податків, надання ЗАМОВНИКОМ додаткового завдання.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        3.3. Перегляд ціни договору обґрунтовується розрахунками та оформлюється
        сторонами шляхом укладання додаткових угод з обґрунтуванням обставин.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        3.4. Оплата виконаних робіт здійснюється в повному розмірі після
        отримання від ПІДРЯДНИКА кошторисної документації на підставі
        підписаного ЗАМОВНИКОМ акту виконаних робіт у термін 10-ти календарних
        днів.{' '}
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        4. Права й обов&apos;язки Сторін
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        4.1. ЗАМОВНИК зобов&apos;язаний:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - вчасно передати ПІДРЯДНИКУ вихідні дані згідно п.2.1. цього договору;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - забезпечити надання доступу до об&apos;єкту;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - здійснити приймання результатів робіт в порядку та на умовах,
        визначених цим Договором;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - в обумовлений Договором строк провести оплату виконаних робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - погодити кошторисну документацію;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        4.2. ЗАМОВНИК має право:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - вимагати виконання робіт та досягнення їх результату відповідно до
        строків, порядку та інших умов і вимог, установлених Договором, вимог
        чинного законодавства України та інших вимог, що зазвичай ставляться до
        роботи та результату роботи такого виду;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - здійснювати контроль за ходом та якістю виконання проектних робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - вносити зміни до дефектного акту.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        4.3. ПІДРЯДНИК зобов&apos;язаний:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - виконати роботи у відповідності з умовами договору та дефектним актом,
        забезпечити якість робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - не передавати без згоди ЗАМОВНИКА кошторисну документацію іншим
        особам;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        4.4. ПІДРЯДНИК має право:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - отримати оплату за виконані роботи в порядку та на умовах, визначених
        цим Договором;
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        5. Строки виконання робіт
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        5.1. Строк виконання робіт : протягом року (з моменту підписання
        договору).
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        5.2. Строк виконання робіт переглядається в наступних випадках:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - у разі внесення змін у дефектний акт, якщо це тягне за собою
        збільшення обсягу робіт;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - у разі ненадання ЗАМОВНИКОМ у передбачений договором строк вихідних
        даних, якщо їх несвоєчасне ненадання унеможливлює закінчення виконання
        робіт ПІДРЯДНИКОМ в строк відповідно до п. 5.1. договору. В цьому
        випадку термін виконання робіт продовжується на строк затримки видання
        вихідних даних.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        5.3. У разі виникнення обставин, що не залежать від ПІДРЯДНИКА і
        перешкоджають виконанню робіт у строк зазначений договором, ПІДРЯДНИК
        може ставити перед ЗАМОВНИКОМ питання про його перегляд.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        5.4. Рішення про перегляд строку оформляється додатковою угодою до цього
        договору з обґрунтуванням обставин.
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        6. Відповідальність Сторін і вирішення спорів
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        6.1. Якщо робота виконана ПІДРЯДНИКОМ з відступами від умов договору або
        з іншими недоліками, які роблять її непридатною для використання,
        ЗАМОВНИК має право за своїм вибором вимагати від ПІДРЯДНИКА:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - безоплатного усунення недоліків в роботі у встановлений ЗАМОВНИКОМ
        строк;
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        6.2. У випадку порушення своїх зобов&apos;язань за цим Договором Сторони
        несуть відповідальність, визначену цим Договором та чинним
        законодавством України.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        6.3. Усі спори що виникли між сторонами вирішуються в господарському
        суді відповідно до вимог чинного законодавства України.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        6.4. У випадку порушення ЗАМОВНИКОМ термінів оплати згідно п. 3.4. він
        сплачує ПІДРЯДНИКУ неустойку в розмірі подвійної облікової ставки НБУ за
        кожний прострочений день.{' '}
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        7. Строк дії Договору та інші умови
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.1. Цей Договір набуває чинності з моменту його підписання і діє до 31
        грудня {contrDateStr} року, а в частині фінансових розрахунків до
        повного виконання Сторонами.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.2. Зміни в цей Договір можуть бути внесені за взаємною згодою Сторін,
        що оформляється додатковою угодою до цього Договору і які є його
        невід&apos;ємною частиною і мають юридичну силу у разі, якщо вони
        викладені у письмовій формі та підписані уповноваженими на те
        представниками Сторін.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.3. Кожна із сторін договору не має права передавати свої права по
        цьому договору третій стороні.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.4. Згідно з діючим законодавством України ЗАМОВНИК є неприбутковою
        організацією.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.5. Згідно з діючим законодавством України ПІДРЯДНИК є платником
        єдиного податку за ставкою 5%, не є платником ПДВ.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.6. У разі змін статусу платника податку та зміни адреси, сторони
        зобов&apos;язуються письмово сповіщати один одного протягом 3-х
        календарних днів, наступних за днем, в якому відбулася така зміна.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.7. Усі правовідносини, що виникають у зв&apos;язку з виконанням умов
        цього Договору і не врегульовані ним, регламентуються нормами чинного в
        Україні законодавства.
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        7.8.Цей Договір складений українською мовою, в 2-х примірниках, які
        мають однакову юридичну силу.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        8. Додатки до договору
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        Невід&apos;ємною частиною цього Договору є:
      </Typography>
      <Typography
        variant='body2'
        className={classes['jkh-proectn-avt-paragraph']}
      >
        - кошторис на здійснення авторського нагляду і виконання проектних робіт
        (додаток №1)
      </Typography>

      <Typography
        variant='body1'
        className={classes['jkh-proectn-avt-chapter']}
        align='center'
      >
        9. Місцезнаходження та банківські реквізити сторін
      </Typography>
      <TableContainer id='table-jkh-proectn-avt-sign'>
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
                paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                  align='center'
                >
                  ПІДРЯДНИК
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
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
                  className={classes['jkh-proectn-avt-text']}
                >
                  ФОП «Пастушок Л.І.»
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  Адреса: 69050 м.Запоріжжя, Вул.Радгоспна, б.59А, кв.14
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  ЄДРПОУ/ДРФО 2197219469
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  IBAN: UA433133990000026007055749691, у АТ КБ
                  &ldquo;ПРИВАТБАНК&rdquo;, МФО 313399
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                  mb={2}
                >
                  Фізична особа-підприємець
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
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
                      className={classes['jkh-proectn-avt-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      Любов ПАСТУШОК
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
                      className={classes['jkh-proectn-avt-text']}
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
                  className={classes['jkh-proectn-avt-text']}
                  align='left'
                >
                  Б/П
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-proectn-avt-text']}
                  align='left'
                >
                  М.П
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
