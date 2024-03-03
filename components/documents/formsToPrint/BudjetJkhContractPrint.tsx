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

export default function BudjetJkhContractPrint({
  currentContract,
  currentOurFirm,
  currentClient,
}: Readonly<{
  currentContract: I_Contract;
  currentOurFirm: I_Client;
  currentClient: I_Client;
}>) {
  const contrNumber = currentContract?.contractNumber?.slice(0, 8);
  const contrDateStr = new Date(
    currentContract?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });

  const totalSum = currentContract.dogovornayaSumBudjet;

  const totalSumPropis = FloatToSamplesInWordsUkr(totalSum);
  const contrSumString = totalSum.toFixed(2).split('.');
  const contractDescription = currentContract.contractDescription;
  const kodDkBudjet = currentContract.kodDkBudjet;
  const startMonthWorkBudjet = currentContract.startMonthWorkBudjet;
  const endMonthWorkBudjet = currentContract.endMonthWorkBudjet;
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
  const clientIBAN = currentClient.iban_budget;
  const clientEDRPO = `ЄДРПОУ: ${currentClient.edrpou}`;
  const clientAddress = `${currentClient?.postIndex} ${currentClient?.address}`;
  const clientTel = `${
    currentClient?.telNumber ? `Тел:${currentClient?.telNumber}` : ''
  }`;
  const clientEmail = `${
    currentClient?.email ? `email:${currentClient?.email}` : ''
  }`;
  //@ts-ignore
  const clientTaxationType = currentClient.taxationType?.taxationTypeName;

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
      <div id='pageFooter'> </div>
      <TableContainer id='table-jkh-budjet-header' sx={{ marginBottom: 2 }}>
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
                  className={classes['jkh-budjet-chapter']}
                  align='center'
                >
                  Договір підряду № Б.{contrNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-paragraph']}
                  align='left'
                >
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-paragraph']}
                  align='right'
                >
                  «___»_______________{contrDateStr} року.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        &nbsp;&nbsp;{clientTypeLong} « {clientName} » , в особі{' '}
        {clientJobTitleRod} {clientFIORodit} , що діє на підставі {clientActsOn}
        , надалі іменується «ЗАМОВНИК», та {executorTypeLong} «{executorName}» ,
        надалі іменується « ПІДРЯДНИК » в особі {executorJobTitleRod}{' '}
        {executorFIORodit}, що діє на підставі {executorActsOn}{' '}
        {executorTaxationType}, з іншого боку, кожна окремо - Сторона, а разом –
        Сторони уклали даний Договір про наступне:
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        1. Предмет договору
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        1.1 Замовник доручає, а Підрядник приймає на себе зобов&apos;язання
        виконати (надалі «роботи») « {contractDescription} » ({kodDkBudjet}), а
        Замовник зобов&apos;язується прийняти й оплатити виконані роботи на
        умовах даного Договору.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        1.2. Підрядник виконує роботи з використанням своїх матеріалів та
        засобів, вартість яких включена до вартості робіт згідно договірної ціни
        та локального кошторису, які є невід&apos;ємними частинами даного
        Договору.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        &nbsp;&nbsp;Якщо роботи виконуються з матеріалу Замовника, Сторони
        встановлюють норми витрат матеріалу, строки повернення його залишку та
        основних відходів шляхом укладання додаткової угоди до даного Договору
        (із складанням акта-прийому передачі матеріалів без переходу права
        власності), яка є його невід&apos;ємною частиною. При виконанні робот
        частково або в повному обсязі з матеріалу замовника, підрядник
        відповідає за неправильне використання цього матеріалу
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        2. Вартість робіт та порядок розрахунків
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        2.1. Договірна ціна робіт за цим Договором складає {contrSumString[0]}{' '}
        грн.
        {contrSumString[1]} коп. ({totalSumPropis}), без ПДВ. Договірна ціна
        додається до Договору та є його невід’ємною частиною.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        2.2. Вартість робіт в договірній ціні визначається як динамічна
        договірна ціна відповідно до ДСТУ БД.1.1-1-2013.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        2.3. Розрахунок вартості фактично виконаних робіт у формі КБ-3
        виконується Підрядником, згідно з вимогами державних будівельних норм в
        межах договірної ціни.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        2.4. Оплата по даному Договору здійснюється за закінчену роботу. Оплата
        виконаних робіт здійснюється Замовником в межах бюджетного асигнування,
        на пiдставi підписаної сторонами Довідки про вартість виконаних
        підрядних робіт та Акту виконаних робіт (форма КБ- 2В, КБ-3 та
        розрахунку), після надходження коштів на рахунок Замовника.{' '}
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        3. Строки виконання робіт{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        3.1. Початок виконання робіт: {startMonthWorkBudjet} {contrDateStr}{' '}
        року.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Закінчення
        робіт: {endMonthWorkBudjet} {contrDateStr} року.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        3.2. При виникненні обставин, незалежних від Підрядника, що
        перешкоджають виконанню робіт у встановлені строки, він може поставити
        питання перед Замовником про їх перегляд. Рішення про перегляд строків
        виконання робіт оформлюється додатковою угодою, яка є невід’ємною
        частиною даного Договору
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        3.3. Обставинами, що перешкоджають виконанню робіт у зазначені даним
        Договором строки, які не залежать від Підрядника, є обставини:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - непереборної сили;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - залежні від Замовника (відсутність фінансування, затримка у виконанні
        зобов’язань, наявність додаткових робіт).
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        Строки виконання робіт переносяться на час дії вказаних обставин, з
        врахуванням часу на відновлення робіт чи перенесення їх на більш
        сприятливіший час року.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        3.4. Роботи виконуються згідно Кошторису на виконання робіт, та графіків
        узгодженого обома Сторонами. Кошторис додається до Договору та є його
        невід’ємною частиною
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        4. Обов’язки сторін
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1. Обов’язки Підрядника:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.1. своєчасно виконувати роботи на умовах даного Договору;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.2. виконувати роботи якісно та згідно з вимогами ДБН, СНіП і ТУ на
        кожен вид виконуваних робіт, в строк, визначений будівельними нормами;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.3. якщо роботи виконуються частково або в повному обсязі з матеріалу
        Замовника надати Замовникові звіт про використання матеріалу та
        повернути його залишок;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.4. вживати усіх заходів щодо збереження майна, переданого йому
        Замовником по Актам прийому-передачі матеріалів для виконання
        ремонтно-будівельних робіт, та відповідати за втрату або пошкодження
        цього майна;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.5. дотримуватись технологічної послідовності виконання робіт,
        включно з організацією виробництва робіт;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.6. дотримуватись і нести відповідальність за правила пожежної
        безпеки, охорони праці і виробничої санітарії;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.7.своєчасно попередити Замовника:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - про недоброякісність або непридатність матеріалу, одержаного від
        Замовника;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - про те, що додержання вказівок Замовника загрожує якості або
        придатності результату робіт;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - про наявність інших обставин, що не залежать від Підрядника, які
        загрожують якості або придатності результату робіт
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.10. постійно повідомляти Замовника про готовність кожного окремого
        конструктивного елемента, належного до освідування актами про приховані
        роботи, перед його закриттям;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.11. повідомляти Замовника про готовність до прийомки виконаних
        робіт;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.12. по закінченню кожного етапу виконання робіт оформляти та
        пред’являти Замовнику акти виконаних робіт, акти огляду прихованих
        робіт, які є складовою частиною акту виконаних робіт КБ-2в;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.1.13. при наявності зауважень з боку Замовника щодо виявлених
        недоліків та дефектів в роботі усунути їх в порядку і в терміни,
        зазначені в акті про усунення недоліків, власними силами і за свій
        рахунок
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.2. Права Підрядника:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.2.1. отримувати від Замовника інформацію, необхідну для виконання
        робіт за даним Договором;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.2.2. отримувати за виконані роботи оплату в розмірах і строки,
        передбачені даним Договором;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.2.3. отримати компенсацію всіх грошових коштів, пов’язаних з
        виконанням робіт у разі необгрунтованої відмови Замовника від приймання
        виконаних робіт.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.2.4. Підрядник має право залучати до виконання робіт субпідрядників.
        Субпідрядники, що залучаються до виконання робіт, повинні відповідати
        таким вимогам:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - мати ліцензію (дозвіл) на виконання робіт, якщо така вимога
        передбачена нормативними документами;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - мати ресурси (матеріальні, технічні, фінансові), достатні для
        виконання робіт, мати досвід виконання аналогічних робіт;{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.2.5. Підрядник має право ініціювати розірвання Договору у разі якщо
        Замовник не забезпечує виконання своїх договірних зобов&apos;язань;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.3. Обов’язки Замовника:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.3.1. забезпечити готовність об’єкту до початку робіт;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.3.2. прийняти від Підрядника виконані роботи, при відсутності
        зауважень до виконаних робіт підписати акт здачі-приймання виконаних
        робіт протягом 5 (п&apos;яти) робочих днів з моменту його одержання;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.3.3. своєчасно здійснювати оплату, на умовах та в порядку, визначеному
        п.2 даного Договору;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.3.4. надати приміщення для зберігання матеріалів, інструмента.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.4. Права Замовника:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.4.1. перевіряти у будь-який час хід та якість робіт, не втручаючись у
        діяльність Підрядника;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        4.4.2. відмовитись від даного Договору та вимагати відшкодування
        збитків, якщо:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - Підрядник своєчасно не почав роботи чи виконує їх на стільки повільно,
        що своєчасне виконання робіт стає вочевидь неможливим;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - в роботі Підрядника наявні суттєві відступлення від умов даного
        Договору чи інші важливі недоліки.{' '}
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        5. Порядок прийому-здачі виконаних робіт
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        5.1. Підрядник зобов&apos;язаний протягом 5 днів після завершення
        виконання робіт (прийняття об&apos;єкта) звільнити будівельний майданчик
        від сміття, будівельних машин та механізмів,тимчасових споруд та
        приміщень. Якщо Підрядник не зробить цього у визначені строки, Замовник
        має право попередити Підрядника про вказане порушення, визначити
        необхідний строк для його усунення і у разі невжиття Підрядником заходів
        звільнити будівельний майданчик своїми силами або із залученням третіх
        осіб з компенсацією витрат, понесених Підрядником.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        5.2. Здача та приймання виконаних робіт здійснюється на підставі Актів
        форми КБ-2в та КБ-3, які є невід&apos;ємними частинами даного Договору
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        5.3. Замовник має оглянути виконані Підрядником роботи протягом 5
        (п&apos;яти) робочих днів з дати пред’явлення їх до приймання та
        підписати Акти форми КБ-2в та КБ-3 або надати обґрунтовані заперечення
        проти їх підписання.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        5.4. Якщо при прийомі робіт Замовником будуть виявлені дефекти і
        недоліки у роботах, Сторони складають протягом 5 (п&apos;яти) робочих
        днів акт про наявні дефекти та інші недоліки робіт, необхідні
        доопрацювання з вказівкою порядку і строків її усунення. Усі роботи щодо
        усунення виявлених недоліків виконуються силами і за рахунок Підрядника.
        У разі ухилення Підрядника від підписання акту про наявні дефекти та
        інші недоліки робіт, акт вважається підписаним в редакції Замовника.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        5.5. Ризик випадкового знищення чи випадкового пошкодження матеріалів до
        настання строку здачі Підрядником виконаних робіт несе Підрядник.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        6. Гарантії
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        6.1. Підрядник дає гарантію на виконану за даним Договором роботу та
        використані матеріали протягом 12 місяців з дня підпису акту
        здачі-приймання виконаних робіт.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        7. Відповідальність сторін
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.1. В разі повного або часткового невиконання чи неналежного виконання
        Підрядником договірних зобов&apos;язань Підрядник сплачує Замовнику пеню
        у розмірі 0,01% від вартості робіт, невиконаних у зазначений строк або
        неналежної якості, але не більше подвійної облікової ставки НБУ за
        кожний день прострочення виконання своїх зобов&apos;язань.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.2.Сплата неустойки не звільняє Сторони від виконання своїх
        зобов&apos;язань за даним Договором.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.3. Збитки, завдані Замовнику невиконанням або неналежним виконанням
        даного Договору, підлягають відшкодуванню Підрядником, у разі наявності
        його вини, у повному обсязі.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.4. Повну відповідальність за організацію та виконанню заходів з
        охорони праці та техніки безпеки при виконанні робіт, за відповідність
        працівників підрядника, які залучені до виконання зобов’язань за даним
        Договором, відповідній кваліфікації, за їх дії несе Підрядник.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.5. При виявлені Замовником матеріальних збитків (матеріальної шкоди),
        Замовник повинен терміново повідомити (у будь-який спосіб) про це
        відповідальну особу Підрядника. Крім того, Замовник протягом 3 (трьох)
        робочих днів зобов’язаний надіслати письмове повідомлення, в якому чітко
        зазначити:
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - які матеріальні збитки (матеріальну шкоду) він отримав;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - які співробітники Підрядника завдали цих збитків (шкоди);
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - розмір цих збитків (шкоди);
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - навести розрахунок збитків (шкоди) та обґрунтований розмір
        компенсації;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        - форму та граничний термін погашення Підрядником збитків (шкоди) та
        компенсації.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.6. Якщо Замовнику нанесені матеріальні збитки (матеріальна шкода) з
        боку працівників Підрядника, які залучені до виконання зобов’язань за
        даним Договором, Підрядник зобов’язаний повністю погасити ці збитки
        (шкоду) шляхом перерахування грошових коштів на поточний рахунок
        Замовника, або передає Замовнику матеріальні цінності, аналогічні тим,
        що були втрачені Замовником.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.7. Розмір збитків (шкоди), заподіяних працівниками Підрядника, які
        залучені до виконання зобов’язань за даним Договором, визначається
        Замовником у відповідності до законодавства України, діючого на момент
        виникнення цих збитків.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.8. Підставою для притягнення працівників Підрядника, які залучені до
        виконання зобов’язань за даним Договором, до матеріальної
        відповідальності є матеріальна шкода, заподіяна розкраданням, нестачею,
        умисним знищенням або зіпсуттям матеріальних цінностей (грошових
        коштів), а також їх знищенням або зіпсуттям через недбалість, що
        підтверджується інвентаризаційними документами.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.9. Підрядник звільняється від відшкодування матеріальних збитків
        (шкоди):
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        а) якщо буде встановлено, що збитки (шкода) заподіяні не з їх вини;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        б) якщо будуть встановлені конкретні винуватці заподіяних збитків
        (шкоди);
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        в) якщо доведе, що належне виконання даного Договору виявилося
        неможливим внаслідок дії обставин непереборної сили.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.10. Сторона не несе відповідальності за порушення даного Договору,
        якщо воно сталося не з її вини (умислу чи необережності).
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.11. Сторона вважається невинуватою і не несе відповідальності за
        порушення даного Договору, якщо вона доведе, що вжила всіх залежних від
        неї заходів щодо належного виконання даного Договору.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.12. Сторони звільняються від відповідальності за невиконання або
        неналежне виконання зобов&apos;язань за даним Договором, у разі настання
        обставин непереборної сили відповідно до ст.617 ЦК України. У разі, коли
        дія зазначених обставин триває більше ніж два місяці, кожна з Сторін має
        право на розірвання даного Договору і не несе відповідальності за таке
        розірвання за умови, що вона письмово повідомить про це іншу Сторону не
        пізніше як за 20 днів до розірвання. Не інформування або несвоєчасне
        інформування позбавляє Сторону права посилатися на обставини
        непереборної сили як на підставу, яка звільняє від відповідальності.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        7.13. У випадку встановлення факту будь-якого невиконання Підрядником
        будь-яких умов цього Договору Замовник може застосувати
        оперативно-господарську санкцію відповідно до п. 4 частини першої статті
        236 Господарського кодексу України, а саме: відмова від встановлення на
        майбутнє господарських відносин із стороною, яка порушує зобов’язання,
        про що Замовник письмово повідомляє Підрядника.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        8. Порядок вирішення спорів
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        8.1. Всі спори, що виникають з даного Договору або пов&apos;язані із
        ним, вирішуються шляхом переговорів між Сторонами. Якщо відповідний спір
        неможливо вирішити шляхом переговорів, він вирішується в судовому
        порядку за встановленою підвідомчістю та підсудністю такого спору
        відповідно до чинного в Україні законодавства.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        9. Строк дії Договору
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.1. Даний Договір набирає чинності з моменту підписання його Сторонами
        та діє до 31 грудня {contrDateStr} року включно, але в будь-якому
        випадку до повного виконання Сторонами своїх зобов’язань за даним
        Договором.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.2. Закінчення строку даного Договору не звільняє Сторони від
        відповідальності за його порушення, яке мало місце під час його дії.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.3. Даний Договір може бути достроково розірваний:{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.3.1. за взаємною згодою Сторін;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.3.2. за ініціативою Замовника у випадках, передбачених пп.4.4.2.
        даного Договору;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.3.3. за ініціативою однієї із Сторін у випадках передбачених п.4.2.5.
        даного Договору;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.3.4. за рішенням господарського суду;
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.3.5. в інших випадках, передбачених чинним законодавством України.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        9.4. Одностороння відмова Замовника виражається у письмовій формі в
        адресованому на ім&apos;я Підрядника листі. Лист має бути направлений на
        адресу Підрядника з описом вкладення та повідомленням про вручення.
        Строк, з якого даний Договір вважається розірваним, зазначається у листі
        та не може бути раніше ніж через 3 (три) дні після отримання Підрядником
        такого листа.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        10. Інші положення
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.1. Всі зміни або доповнення до даного Договору, а також його
        розірвання вважаються дійсними при умові, якщо вони вчинені у письмовій
        формі і підписані уповноваженими на те представниками обох Сторін.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.2. Всі зміни або доповнення до даного Договору, а також його
        розірвання набирають чинності з моменту належного оформлення Сторонами
        відповідної додаткової угоди до даного Договору, якщо інше не
        встановлено у самій додатковій угоді, даному Договорі або у чинному в
        Україні законодавстві.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.3. Усі правовідносини, що виникають з даного Договору або
        пов&apos;язані із ним, у тому числі пов&apos;язані із дійсністю,
        укладенням, виконанням, зміною та припиненням даного Договору,
        тлумаченням його умов, визначенням наслідків недійсності або порушення
        Договору, регламентуються даним Договором та відповідними нормами
        чинного в Україні законодавства, а також застосовними до таких
        правовідносин звичаями ділового обороту на підставі принципів
        добросовісності, розумності та справедливості.{' '}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.4. Взаємовідносини сторін, не врегульовані даним Договором,
        регулюються чинним законодавством України.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.5. Всі виправлення за текстом даного Договору мають силу та можуть
        братися до уваги виключно за умови, що вони у кожному окремому випадку
        датовані, засвідчені підписами Сторін та скріплені їх печатками.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.6. Відступлення права вимоги та (або) переведення боргу за даним
        Договором однією із Сторін до третіх осіб допускається виключно за умови
        письмового погодження цього із іншою Стороною.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.7. Замовник є резидентом України, {clientTaxationType}
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.8. Підрядник {executorTaxationType}.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.9. Сторони несуть повну відповідальність за правильність вказаних
        ними у даному Договорі реквізитів та зобов&apos;язуються протягом десяти
        днів у письмовій формі повідомляти іншу Сторону про їх зміну, в тому
        числі про зміну статусу платника податку на прибуток. У разі
        неповідомлення або несвоєчасного повідомлення Сторона, яка не
        повідомила, несе ризик настання пов&apos;язаних із цим несприятливих
        наслідків.
      </Typography>
      <Typography variant='body2' className={classes['jkh-budjet-paragraph']}>
        10.10. Даний Договір укладено в трьох примірниках українською мовою,
        кожен з яких має однакову юридичну силу, по одному для кожної із Сторін.
      </Typography>
      <Typography
        variant='body1'
        className={classes['jkh-budjet-chapter']}
        align='center'
      >
        11. Адреси та банківські реквізити Сторін
      </Typography>
      <TableContainer id='table-jkh-budjet-sign'>
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
                  className={classes['jkh-budjet-text']}
                  align='center'
                >
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                >
                  {executorTypeShort} «{executorName}»{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                >
                  {executorAddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                >
                  {executorTel}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                >
                  {executorEmail}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                  mb={2}
                >
                  {executorJobTitleimen}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
                      className={classes['jkh-budjet-text']}
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
                      className={classes['jkh-budjet-text']}
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
                  className={classes['jkh-budjet-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['jkh-budjet-text']}
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
