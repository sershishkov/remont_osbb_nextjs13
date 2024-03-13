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

export default function TehNadzorDogToPrint({
  currentContract,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentClient: I_Client;
}>) {
  const contractDescription = currentContract?.contractDescription;
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  //@ts-ignore
  const clientTypeShort = currentClient?.firmType?.firmTypeShortName;
  //@ts-ignore

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

  const tehnadzorSumBudjet = currentContract?.tehnadzorSumBudjet;
  const podatokSum = tehnadzorSumBudjet * 0.05;

  const tehnadzorSumBudjetPropis = FloatToSamplesInWordsUkr(tehnadzorSumBudjet);

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-tehnadzor-header' sx={{ marginBottom: 2 }}>
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
                  className={classes['tehnadzor-chapter']}
                  align='center'
                >
                  ДОГОВІР № ТН___________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body1'
                  className={classes['tehnadzor-chapter']}
                  align='center'
                >
                  ПРО НАДАННЯ ПОСЛУГ З ТЕХНІЧНОГО НАГЛЯДУ
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-paragraph']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-paragraph']}
                  align='right'
                >
                  «___»_______________{contrDateStr} року.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        {clientTypeShort} « {clientName} » , в особі {clientJobTitleRod}{' '}
        {clientFIORodit} , що діє на підставі {clientActsOn}, надалі іменується
        «Замовник» з однієї сторони, і фізична особа-підприємець Сень Андрій
        Юрійович (номер запису в Єдиному державному реєстрі юридичних осіб,
        фізичних осіб-підприємців та громадських формувань про проведення
        державної реєстрації 2 556 000 0000 163221 , та кваліфікаційний
        сертифікат серії № АТ 007959),що є платником єдиного податку третьої
        групи (відповідно до п.п.3 п.291.4 ст.291 Податкового кодексу України),
        надалі - «Виконавець», з другої сторони, разом іменовані «Сторони», а
        кожна окремо «Сторона», уклали цей договір (надалі – Договір) про
        нижченаведене:
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        1.1 Предметом Договору є надання послуг, пов’язаних зі здійсненням
        технічного нагляду за виконанням будівельних робіт, який є невід’ємною
        частиною загальної вартості робіт, на об’єкті{' '}
        <strong>« {contractDescription} »</strong> (далі по тексту –
        «Об&apos;єкт»), які Виконавець у межах повноважень зобов’язується надати
        Замовнику, а Замовник зобов’язується прийняти і оплатити їх у порядку та
        на умовах, визначених Договором (надалі – «Послуги»).
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        1.2 Технічний нагляд за виконанням робіт на Об’єкті здійснюється
        відповідно до Порядку здійснення технічного нагляду під час будівництва
        об’єктів архітектури, затвердженого постановою Кабінету Міністрів
        України від 11 липня 2007 року № 903, інших нормативно-правових актів,
        що регулюють питання здійснення технічного нагляду та цього Договору.
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        2. ПРАВА ТА ОБОВ’ЯЗКИ СТОРІН
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        2.1. Виконавець зобов’язаний:
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - якісно та у встановлені Сторонами терміни виконувати дії, передбачені
        п.1.1 цього Договору;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - при організації технічного нагляду контролювати дотримання під час
        проведення робіт умов, передбачених Державними будівельними нормами,
        стандартами та іншими нормативними актами України;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - забезпечити технічний нагляд відповідно до вимог проектно-кошторисної
        документації;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - повідомляти Замовнику на його вимогу всі відомості про результати
        виконання договору;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - забезпечити контроль якості і об’ємів робіт на Об’єкті;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - складати Акт наданих послуг по технічному нагляду відповідно з
        прийняттям Замовником виконаних робіт за договором підряду на проведення
        капітального ремонту.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - мати відповідні дозволи, які дають право здійснювати технічний нагляд
        за виконанням робіт відповідно до законодавства на весь час дії даного
        Договору;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - вести перевірку наявності документів, які підтверджують якісні
        характеристики конструкцій, виробів, матеріалів та обладнання, що
        використовуються під час проведення робіт: технічні паспорти,
        сертифікати, документи, що відображають результати лабораторних
        випробувань, приладів і технологій відповідно до законодавства і
        граничних показників вартості робіт, тощо;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - брати участь в контрольних обмірах, що проводяться, в перевірках
        органами державного нагляду, відомчими інспекціями, представляти для
        цього необхідні документи, а також самостійно проводити контрольні
        обміри виконаних робіт;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - здійснювати контроль за веденням загального журналу виконання робіт
        встановленого зразка;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - брати участь спільно з Замовником та проектною організацією в розгляді
        пропозицій Підрядника та/або Замовника по підвищенню якості, зниженню
        вартості і строків виконання робіт без погіршення;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - бути присутнім на виробничих нарадах, що проводяться Замовником;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - виконувати будь-які інші дії, необхідні для виконання зобов’язань за
        цим Договором.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        2.2. Виконавець має право:
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - отримати оплату за надання Послуг згідно з умовами цього Договору;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - вимагати від залучених Замовником Підрядників за договором підряду на
        проведення капітального ремонту виконання робіт відповідно до
        проектно-кошторисної документації, інших нормативних документів відносно
        порядку виконання та приймання робіт;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - зупиняти роботи у випадках застосування матеріалів, конструкцій та
        виробів неналежної якості або які не відповідають нормативним
        документам;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - ставити питання про проведення лабораторних та експертних оцінок
        відносно відповідності застосованих матеріалів сертифікатам якості;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - зупиняти роботи до оформлення актів на приховані роботи та в разі
        виявлення місць можливого виникнення недоліків робіт.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        2.3. Замовник зобов’язаний:
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - надати Виконавцю копію підрядного договору, копію договірної ціни та
        копію проектно-кошторисної документації;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - попередити Виконавця про виконання прихованих робіт на об’єкті за два
        дні до їх виконання для їх огляду, перевірки і підписання своєчасно
        актів на приховані роботи;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - надати Виконавцю для перевірки Акти виконаних робіт за підрядним
        договором за формою КБ-2в для підтвердження об’ємів виконаних робіт та
        довідку за формою КБ-3 для ведення обліку вартості прийнятих робіт;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        2.4. Замовник має право:
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - на власний розсуд, з дотриманням вимог чинного законодавства,
        організувати процес проведення робіт;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - самостійно обирати підрядні організації, матеріали для проведення
        робіт, зовнішнього та внутрішнього оздоблення;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - контролювати хід надання Послуг Виконавцем за цим Договором
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - отримувати від Виконавця інформацію про хід проведення робіт;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - Замовник та Виконавець повинні дотримуватися конфіденційності
        інформації, отриманої однією Стороною від іншої.
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        3. ВАРТІСТЬ ПОСЛУГ І ПОРЯДОК РОЗРАХУНКІВ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        3.1. Загальна вартість наданих послуг за цим Договором за згодою Сторін
        складає {tehnadzorSumBudjet?.toFixed(2)} грн. (
        {tehnadzorSumBudjetPropis}), без ПДВ, що не перевищує 1,5% за підсумком
        витрат глав 1-9 зведеного кошторису вартості будівництва Об’єкту, в т.ч.
        єдиний податок 5%- {podatokSum?.toFixed(2)} грн
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        3.2. Розрахунки за надані послуги проводяться шляхом перерахування
        коштів на розрахунковий рахунок Виконавця, зазначений у Договорі, на
        протязі 15 банківських днів після підписання оформленого належним чином
        Акту наданих послуг, підписаного уповноваженими представниками обох
        Сторін. Бюджетні зобов’язання та платежі з бюджету здійснюються після
        отримання Замовником бюджетних призначень на підставі ст.ст. 48, 49
        Бюджетного кодексу України. У разі затримки бюджетного фінансування,
        розрахунок за надані послуги здійснюється протягом 7 банківських днів з
        дати отримання Замовником бюджетного призначення на фінансування
        предмету даного Договору на свій реєстраційний рахунок
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        3.3. Зміни та доповнення щодо зміни вартості Послуг, а також порядку
        оплати Послуг оформлюються Додатковою угодою
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        4. ПРИЙМАННЯ НАДАНИХ ПОСЛУГ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        4.1. Приймання наданих послуг відбувається шляхом підписання Сторонами
        Акту наданих послуг. Виконавець складає та направляє Замовнику належним
        чином ним завірений та підписаний Акт наданих послуг.{' '}
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        4.2. Замовник зобов’язаний протягом 3-х робочих днів з моменту отримання
        від Виконавця Акту наданих Послуг розглянути цей Акт. В разі відсутності
        зауважень (заперечень) підписати Акт наданих послуг і один примірник
        повернути Виконавцю або скласти і надіслати на адресу Виконавця
        мотивовану відмову від підписання Акту наданих послуг.
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        5. ДІЯ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        5.1. Цей Договір вважається укладеним і набирає чинності з моменту його
        підписання Сторонами та діє до 31 грудня {contrDateStr} року, але в
        частині зобов’язань та розрахунків по цьому Договору - до повного
        виконання їх Сторонами.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        5.2. Закінчення строку цього Договору не звільняє Сторони від
        відповідальності за його порушення, яке мало місце під час дії цього
        Договору.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        5.3. Якщо інше прямо не передбачено цим Договором або чинним в Україні
        законодавством, зміни у цей Договір можуть бути внесені тільки за
        домовленістю Сторін, яка оформлюється Додатковою угодою до цього
        Договору.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        5.4. Зміни внесені в цей Договір набирають чинності з моменту належного
        оформлення Сторонами відповідної Додаткової угоди до цього Договору,
        якщо інше не встановлено у самій додатковій угоді, цьому Договорі.{' '}
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        5.5. Якщо інше прямо не передбачено цим Договором або чинним в Україні
        законодавством, цей Договір може бути розірваний тільки за домовленістю
        Сторін, яка оформлюється Додатковою угодою до цього Договору
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        5.6. Цей Договір вважається розірваним з моменту належного оформлення
        Сторонами відповідної Додаткової угоди до цього Договору, якщо інше не
        встановлено у самій додатковій угоді, цьому Договорі або у чинному в
        Україні законодавстві.
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        6. ФОРС-МАЖОРНІ ОБСТАВИНИ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        6.1. Сторони звільняються від відповідальності за часткове чи повне
        невиконання або неналежне виконання зобов’язань за Договором, якщо вони
        є наслідком непереборної сили (пожежі, повені, землетрусу, стихійного
        лиха, воєнних дій і інших обставин непереборної сили), і якщо ці
        обставини безпосередньо вплинули на виконання Договору, то виконання
        продовжується відповідно на строк, протягом якого діяли ці обставини.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        6.2. Якщо форс – мажорні обставини будуть продовжуватися більше трьох
        місяців, то кожна зі Сторін буде мати право відмовитися від подальшого
        виконання зобов’язань за Договором, і в цьому випадку Договір вважається
        припиненим у випадку досягнення Сторонами згоди про правові наслідки по
        всіх умовах даного Договору.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        6.3. Сторона, яка не може виконати зобов’язання за Договором, повинна
        письмово не пізніше п’яти днів повідомити іншу Сторону про настання
        форс-мажору, припинення виконання своїх зобов’язань із проектом
        врегулювання взаємних зобов’язань.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        6.4. Наявність форс – мажорних обставин має бути підтверджена
        необхідними документами торгово-промислової палати або іншого
        уповноваженого органу України.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        6.5. Неповідомлення або несвоєчасне повідомлення про настання чи
        припинення форс-мажорних обставин позбавляє Сторону права на них
        посилатися.{' '}
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        7. ВІДПОВІДАЛЬНІСТЬ СТОРІН
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        7.1. За невиконання чи неналежне виконання зобов&apos;язань за цим
        Договором Сторони несуть відповідальність згідно з цим Договором та
        чинним законодавством України.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        7.2. У випадку невиконання Послуг, або виконання не в повному обсязі у
        строк визначений цим Договором, Виконавець сплачує Замовнику пеню в
        розмірі 0,1% від вартості наданих послуг передбачених п.3.1 Договору за
        кожен день прострочення, а за прострочення понад тридцять днів додатково
        стягується штраф у розмірі 7% вартості послуг. Сплата неустойки, штрафу
        не звільняють Виконавця від виконання прийнятих на себе зобов’язань
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        7.3. Виконавець не несе відповідальності за несвоєчасне оформлення
        дозвільної документації по Об&apos;єкту, що сталося з вини Замовника.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        7.4. Виконавець не несе відповідальності перед Замовником за перевищення
        термінів проведення робіт, визначених календарним графіком, у разі, якщо
        це сталося внаслідок:
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - невиконання (несвоєчасного виконання) робіт за договором підряду на
        проведення капітального ремонту;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        {' '}
        - невиконання Замовником умов, викладених у пунктах 3, 4 цього Договору;
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        - інших умов відповідно до діючого законодавства.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        7.5. Сплата штрафів та неустойок за порушення умов цього Договору, а
        також відшкодування завданих збитків не звільняють винну Сторону від
        виконання зобов&apos;язань за цим Договором.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        7.6. За несвоєчасну оплату послуг за Договором через дії органів
        Державного казначейства Замовник не несе відповідальність та не сплачує
        штрафні санкції.
      </Typography>
      <Typography
        variant='body1'
        className={classes['tehnadzor-chapter']}
        align='center'
      >
        8. ІНШІ ПОЛОЖЕННЯ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.1. Цей Договір може бути змінений, або доповнений за взаємною згодою
        Сторін. Усі зміни та доповнення до цього Договору повинні бути здійснені
        у письмовій формі, підписані уповноваженими представниками Сторін. Такі
        зміни та доповнення є невід&apos;ємною частиною цього Договору.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.2. При виникненні між Сторонами спорів та суперечок за цим Договором
        та у зв&apos;язку з ним, Сторони будуть робити все необхідне для
        врегулювання зазначених спорів та суперечок шляхом мирних переговорів, у
        разі недосягнення згоди, спори чи суперечки передаються на розгляд до
        господарського суду.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.3. Відносини, які виникають при укладенні та виконанні цього Договору
        та неврегульовані в ньому, регулюються чинним законодавством України.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.4. Будь–які зміни й доповнення до даного договору мають силу тільки в
        тому випадку, якщо вони оформлені в письмовій формі й підписані обома
        Сторонами.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.5. Цей Договір може бути розірваний за взаємною згодою Сторін, за
        умови повного розрахунку Сторін, або в інших випадках, передбачених
        положеннями цього Договору, або чинного законодавства України.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.6. Жодна із сторін не має права передавати права та обов’язки за цим
        Договором третій особі без отримання письмової згоди іншої сторони.
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.7. Замовник є неприбутковою організацією, Виконавець – є платником
        єдиного податку третьої групи (відповідно до п.п.3 п.291.4 ст.291
        Податкового кодексу України), що сплачує єдиний податок за ставкою 5%
        доходу (відповідно до п.п.2 п.293.3 ст.293 Податкового кодексу України)
        та не є платником ПДВ
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.8. Цей Договір складений українською мовою у двох оригінальних
        примірниках, по одному для кожної із Сторін
      </Typography>
      <Typography variant='body2' className={classes['tehnadzor-paragraph']}>
        8.9. Сторони домовилися, що всі персональні дані, які будуть надані у
        зв’язку з виконанням даного Договору, вважаються отриманими за згодою
        суб’єктів персональних даних та будуть включені у відповідну базу
        персональних даних, відповідно до Закону України «Про захист
        персональних даних». На Сторону, яка отримала персональні дані,
        покладається обов’язок здійснювати захист персональних даних відповідно
        до Закону України «Про захист персональних даних» і поширювати їх тільки
        у випадках передбачених законом
      </Typography>
      <TableContainer id='table-tehnadzor-sign'>
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
                  className={classes['tehnadzor-text']}
                  align='center'
                >
                  ВИКОНАВЕЦ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
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
                  className={classes['tehnadzor-text']}
                >
                  ФОП Сень Андрій Юрійович
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  {clientTypeShort} «{clientName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  Адреса: 65012, м. Одеса, вул. Пантелеймонівська, б. 4, кв. 8
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  {clientAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  ЄДРПОУ 2959201778
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  п/р: UA 703133990000026005030201316, в АТ КБ
                  &ldquo;ПРИВАТБАНК&rdquo; МФО 313399
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                >
                  {clientIBAN}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                  mb={2}
                >
                  Фізична особа-підприємець
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
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
                      className={classes['tehnadzor-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      Андрій СЕНЬ
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
                      className={classes['tehnadzor-text']}
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
                  pl={4}
                  variant='body2'
                  className={classes['tehnadzor-caption']}
                  align='left'
                >
                  (підпис)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  pl={4}
                  variant='body2'
                  className={classes['tehnadzor-caption']}
                  align='left'
                >
                  (підпис)
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
                  align='left'
                >
                  М.П
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['tehnadzor-text']}
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
