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

export default function RemsContractPotochnPrint({
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
  const aktSumString = aktSum.toFixed(2).split('.');
  const contrDateStr = new Date(
    currentContract?.contractDate!
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  const endWorkRemservis = new Date(
    currentContract?.endWorkRemservis ?? ''
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const contractDescription = currentContract.contractDescription;

  const clientJobTitleRod = currentClient.jobTitle_rodit;
  const clientJobTitleimen = currentClient.jobTitle;
  const clientFIORodit = `${currentClient.lastName_rodit} ${currentClient.firstName_rodit} ${currentClient.patronymic_rodit}`;
  const clientFIOImen = `${
    currentClient.firstName_imen
  } ${currentClient.lastName_imen?.toLocaleUpperCase()}`;

  const clientActsOn = currentClient.whichActsOnTheBasis;
  const clientAddres = `${currentClient.postIndex}, ${currentClient.address}`;

  const clientIBAN = currentClient.iban;
  const clientEDRPO = `ЄДРПОУ: ${currentClient.edrpou}`;
  //@ts-ignore
  const executorTypeLong = currentOurFirm.firmType?.firmTypeLongName;
  //@ts-ignore
  const executorTypeShort = currentOurFirm.firmType?.firmTypeShortName;
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
  const executorAddres = `${currentOurFirm.postIndex}, ${currentOurFirm.address}`;
  const executorIBAN = currentOurFirm.iban;
  const executorEDRPO = `ЄДРПОУ: ${currentOurFirm.edrpou}`;
  return (
    <div className={classes.page} id='page'>
      <div id='pageFooter'> </div>
      <TableContainer id='table-rems-contract-potochn-header'>
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
                  ДОГОВІР № ________________
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
                  на надання послуг поточного ремонту
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
                  м. Запоріжжя
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['base-contr-paragraph']}
                  align='right'
                >
                  _______________{contrDateStr} року.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Typography variant='h6' align='center'>
        ДОГОВІР № ________________
      </Typography>
      <Typography variant='body2' align='center'>
        на надання послуг поточного ремонту
      </Typography> */}
      {/* <Grid
        container
        direction={`row`}
        justifyContent={`space-between`}
        alignItems={`center`}
        mb={2}
      >
        <Grid item>
          <Typography variant='body2'>м. Запоріжжя</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'>
            _______________{contrDateStr} року.
          </Typography>
        </Grid>
      </Grid> */}
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        <strong>
          Комунальне підприємство «Запоріжремсервіс» Запорізької міської ради,
        </strong>
        &nbsp;іменоване надалі Замовник в особі {clientJobTitleRod}{' '}
        {clientFIORodit}, що діє на підставі {clientActsOn} підприємства, з
        одного боку
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        <strong>{executorTypeLong}</strong> <strong>«{executorName}»</strong>{' '}
        іменоване надалі Підрядник ., в особі {executorJobTitleRod}{' '}
        {executorFIORodit}, який(ка) діє на підставі
        {executorActsOn} підприємства, з другої сторони, уклали даний Договір
        про наступне:
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        1.1. Замовник доручає, а Підрядник приймає на себе зобов’язання на свій
        ризик надати в порядку і на умовах цього Договору власними та залученими
        силами і засобами (в тому числі, але не виключно, з використанням
        наданих Замовником матеріалів), послуги{` `}
        <strong>код ДК 021:2015 45450000-6 інші завершальні</strong>
        {` `}
        <strong>будівельні роботи (Послуги на виконання)</strong>
        {` `}
        <strong>«{contractDescription}»</strong>
        {` `}в обумовлений цим Договором термін та з належною якістю в межах
        узгодженої Договірної ціни, з дотриманням вимог техніки безпеки, охорони
        праці та здати об’єкт в експлуатацію
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        1.2. Сторони допускають, залучення Підрядником спеціалізованих
        підприємств (організацій) (далі - «Субпідрядників») для виконання
        окремих обсягів (етапів, видів) Послуг на виконання цього Договору. При
        цьому відповідальність за неналежне виконання і / або порушення
        Підрядником і Субпідрядниками умов цього Договору перед Замовником, несе
        Підрядник
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        1.3. Сторони домовились щодо розміщення інформації про умови даного
        Договору на сайті Запорізької міської ради в розділі «Міське
        господарство. Реєстр укладених Договорів закупівлі» по формі та змісту,
        зазначених на сайті.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        2. ЦІНА ДОГОВОРУ
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        2.1. Ціна Послуг за цим Договором складає{' '}
        <strong>
          {' '}
          {aktSumString[0]} грн {aktSumString[1]} коп ({totalSumPropis}), без
          ПДВ
        </strong>
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        Ціна Послуг визначається розрахунком Договірної ціни за обсягами
        (етапами,видами) робіт
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        2.2. При формуванні договірної ціни застосовувати ресурсні елементні
        кошторисні норми України
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        2.3. У разі підвищення Підрядником Договірної ціни у випадках не
        передбачених цим Договором, всі пов’язані з цим витрати, якщо інше не
        встановлене законом, несе Підрядник
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        2.4. Підрядник не може вимагати уточнення Договірної ціни у зв’язку із
        зростанням цін на ресурси, що використовуються для виконання робіт, у
        разі, коли строки виконання цих робіт порушені з вини Підрядника. У
        таких випадках ціни на ресурси визначаються відповідно до цін, що діяли
        на зазначену в Договорі дату закінчення робіт. Додаткові витрати на
        виконання робіт, пов’язані із зростанням цін на ресурси після зазначеної
        дати, компенсуються Підрядником
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        2.5. Підрядник несе відповідальність за можливі збитки, які можуть бути
        нанесені Замовнику внаслідок неправильності вибору і/або застосування
        методики розрахунку вартості робіт на підставі вихідних даних, переданих
        йому Замовником і перевірених та уточнених Підрядником, а також
        внаслідок недостовірності даних Договірної ціни
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        3. СТРОКИ НАДАННЯ ПОСЛУГ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        3.1. Терміни надання послуг за цим Договором до {endWorkRemservis}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        3.2. Замовник може приймати рішення про уповільнення термінів надання
        послуг, їх зупинення або прискорення, з обов’язковим укладанням
        додаткової угоди
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        3.3. У разі виникнення обставин, що не залежать від Підрядника і
        перешкоджають наданню послуг у строки, зазначені Договором, Підрядник
        може ставити перед Замовником питання про їх перегляд. Рішення про
        перегляд строків оформляється додатковою угодою до цього Договору з
        обґрунтуванням обставин.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        4. ЗДАЧА Й ПРИЙМАННЯ РЕЗУЛЬТАТІВ НАДАННЯ ПОСЛУГ ТА ПОРЯДОК РОЗРАХУНКІВ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.1. Здача-приймання результатів надання послуг після їх закінчення
        здійснюється згідно з чинним порядком і оформлюється актом прийняття
        об’єкту в експлуатацію – актом виконаних робіт форми КБ-2в. Належним
        чином оформлені оригінали Актів КБ-2в з додатками і довідок КБ-3,
        передаються Замовнику в двох примірниках, після підписання та скріплення
        печаткою кожного їх примірника Підрядником, із зазначенням в адресній
        частині реквізитів цього Договору.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        Оплата наданих послуг здійснюється на підставі підписаних Замовником
        довідок, актів про вартість виконаних підрядних робіт за формою КБ-3,
        КБ-2в та податкових накладних протягом 60 (шести десяти) календарних
        днів після підписання вищезгаданих форм КБ-3, КБ-2в. Розрахунок вартості
        виконаних робіт за формою КБ-3, КБ-2в виконується Підрядником згідно з
        вимогами державних стандартів України
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.2. Замовник перевіряє і в шестиденний термін згідно з чинним порядком
        приймає надані Підрядником Послуги по акту приймання-здачі, та підписує
        зі свого боку примірники оригіналів Актів КБ-2в з додатками і довідками
        КБ-3та один підписаний примірник повертає Підряднику
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.3. Якщо під час приймання Послуг, будуть виявлені недоліки, що виникли
        з вини Підрядника (в т.ч. в частині кількості, якості і норми витрат
        матеріалів), Сторонами оформлюється та підписується дефектний акт.
        Дефектний акт складається Замовником, який вказує перелік недоліків у
        виконаних роботах і терміни їх усунення. Підрядник зобов&apos;язаний
        протягом трьох днів, з моменту отримання дефектного акту підписати його
        і направити Замовнику. Сторони визначили, що не підписання, не
        направлення або несвоєчасне направлення Підрядником дефектного акту
        прирівнюється до безумовної згоди Підрядника з вмістом дефектного акту,
        складеним Замовником
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        Замовник не підписує Акт КБ-2в, затримує оплату неякісно наданих послуг
        Підряднику до усунення дефектів, а також має право вимагати повернення
        раніше сплачених Підряднику сум, які Підрядник зобов&apos;язаний
        повернути / компенсувати протягом трьох банківських днів з моменту
        отримання вимоги Замовника. Усунення неякісно виконаних робіт
        проводиться Підрядником за свій рахунок, в терміни і на умовах
        обумовлених Сторонами в дефектному акті
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.4. У разі не усунення Підрядником в обумовлені терміни дефектів,
        Замовник має право в односторонньому порядку притягнути для цього третіх
        осіб з компенсацією витрат за рахунок Підрядника, у тому числі шляхом
        утримання сум витрат, понесених ним у зв&apos;язку з виконанням робіт
        третіми особами, з сум, що підлягають оплаті Підряднику за виконані
        роботи та поставлені матеріали.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.5. Оплата Замовником виконаних Підрядником Послуг проводиться в
        національній валюті України шляхом перерахування грошових коштів на
        поточний рахунок Підрядника.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.6. Підрядник зобов&apos;язаний перерахувати грошові кошти, зайво
        отримані від Замовника, на поточний рахунок Замовника негайно, але не
        пізніше трьох банківських днів з моменту отримання відповідної вимоги
        Замовника.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.7. Зарахування зустрічних однорідних вимог можливе тільки за взаємною
        згодою Сторін.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.8. У разі необхідності, але не рідше одного разу на квартал, Сторони
        проводять звірку взаємних розрахунків з подальшим оформленням акту.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        4.9. У разі виникнення додаткових робіт, що виникли в результаті
        проведення робіт, Підрядник складає кошторис з внесенням змін, узгоджує
        з Замовником в установленому порядку з обов’язковим укладанням
        додаткової угоди, та після їх виконання, складає акт у формі КБ-2в та
        КБ-3 для подальшого пред’явлення Замовнику.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        5. ПРАВА ТА ОБОВ&apos;ЯЗКИ СТОРІН.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-italic']}>
        5.1. Підрядник зобов&apos;язаний
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.1. Надавати послуги відповідно до Договірної ціни, будівельних норм
        і правил (ТУ, ДСТУ, БНіП , ДБН, КНУ «Настанова з визначення вартості
        будівництва» тощо), графіків виконання робіт, вимог техніки безпеки та
        охорони праці;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.2. Виконувати роботи з матеріалів, конструкцій, обладнання і
        засобами Підрядника, або з матеріалів Замовника у разі їх наявності;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.3. Надавати Замовнику рахунки-фактури, Акти КБ-2в з додатком
        документів, що підтверджують вартість і якість використаних матеріалів,
        довідки КБ-3 протягом 3-х робочих днів з моменту закінчення робіт; а
        також податкові накладні на всю суму податкових зобов&apos;язань, які
        утворилися у Підрядника, в день виникнення податкових зобов&apos;язань з
        ПДВ (документи передаються з «рук в руки», про що робиться відповідна
        відмітка в реєстрі передачі документів; висилаються рекомендованим
        листом або іншим узгодженим Сторонами способом). Останній термін подання
        актів КБ-2в в облік з боку Замовника не пізніше 25 числа звітного
        місяця;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.4. Усувати виявлені Замовником недоліки при наданні послуг;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.5. При наданні послуг у межах цього Договору використовувати власні
        засоби виробництва і за свій рахунок оплатити видаткові матеріали, а
        також послуги зв&apos;язку та інші витрати, необхідні для надання послуг
        за цим Договором;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.6. Інформувати Замовника про хід виконання поточного ремонту;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.7. Забезпечити Замовнику можливість вільного доступу до об&apos;єкта
        поточного ремонту для здійснення контролю за наданням послуг;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.8. Виконувати вимоги осіб, уповноважених здійснювати
        інженерно-технічний нагляд Замовника за наданням послуг, а також осіб,
        які здійснюють контроль (нагляд, перевірку) за дотриманням працівниками
        Підрядника і залучених Підрядником Субпідрядників діючих нормативних
        актів з охорони праці;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.9. Виконувати отримані в ході виконання поточного ремонту вказівки
        Замовника, якщо такі вказівки не суперечать умовам цього Договору і не
        являють собою втручання в оперативно-господарську діяльність Підрядника;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.1.10. забезпечити:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        - дотримання та контроль щодо дотримання працівниками Підрядника і
        залучених Підрядником Субпідрядників діючих нормативних актів з охорони
        праці;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        - проведення інструктажу та навчання з питань охорони праці працівників
        Підрядника і залучених Підрядником Субпідрядників;{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        - наявність у працівників Підрядника і залучених Підрядником
        Субпідрядників належного спецодягу та засобів індивідуального захисту;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        - допуск до виконання робіт підвищеної небезпеки керівників,
        професіоналів, фахівців та робітників, спеціально навчених даному виду
        робіт і пройшли перевірку знань, які мають посвідчення на право
        виконання робіт підвищеної небезпеки, які вміють користуватися засобами
        індивідуального захисту, які знають способи надання першої
        (долікарської) допомоги, які пройшли медичний огляд і професійний відбір
        для виконання робіт підвищеної небезпеки;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        - організацію і виконання робіт підвищеної небезпеки відповідно до вимог
        законодавчих, нормативно-правових актів з охорони праці;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        - відповідність використовуваних при проведенні поточного ремонту
        інструменту і пристосувань характеру виконуваної роботи.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-italic']}>
        5.2. Підрядник має право:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.2.1. Отримувати оплату за надані Послуги в розмірах і в строки,
        обумовлені в цьому Договорі та додатках до нього.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.2.2. Залучати Субпідрядників для виконання окремих обсягів (етапів,
        видів) робіт , організовувати та контролювати їх дії , для забезпечення
        умов цього Договору.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-italic']}>
        5.3. Замовник зобов&apos;язаний:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.3.1. У разі звернення Підрядника з інформацією про вірогідність
        припинення або сповільнення у наданні послуг через незалежні від нього
        обставини, сприяти Підряднику в межах своєї компетенції у наданні послуг
        в обсягах і в порядку, встановленими цим Договором;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.3.2. Оплатити вартість виконаних робіт у визначені цим Договором
        терміни.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4. Замовник має право:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.1. Здійснювати контроль і нагляд за ходом і якістю виконуваних
        робіт, дотриманням термінів їх виконання, використанням Підрядником
        матеріалів і обладнання відповідної якості, а також станом охорони
        праці, не втручаючись при цьому в оперативно-господарську діяльність
        Підрядника та/або залученого ним Субпідрядника;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.2. Відмовитись від прийняття закінчених послуг по об&apos;єкту у
        разі виявлення недоліків, які виключають можливість його використання
        відповідно до мети, зазначеної у кошторисній документації та цьому
        Договорі, і не можуть бути усунені Підрядником, Замовником або третьою
        особою;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.3. Вимагати безоплатного виправлення недоліків, що виникли внаслідок
        допущених Підрядником порушень, або виправити їх своїми силами, якщо
        інше не передбачено цим Договором. У такому разі збитки, завдані
        Замовнику, відшкодовуються Підрядником, у тому числі за рахунок
        відповідного зниження Договірної ціни;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.4. Відмовитися від цього Договору та вимагати відшкодування збитків,
        якщо Підрядник не розпочав надання послуг або виконує настільки
        повільно, що закінчення їх у строк, визначений цим Договором, стає
        неможливим;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.5. Відмовитися від цього Договору в будь-який час до закінчення
        виконання робіт по об’єкту, оплативши Підряднику частину наданих послуг
        з відшкодуванням збитків, завданих такою відмовою;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.6. Ініціювати внесення змін у цей Договір, вимагати розірвання
        Договору та відшкодування збитків за наявності істотних порушень
        Підрядником умов Договору;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.7. Вносити в процесі виконання поточного ремонту зміни і доповнення
        в кошторисну і технічну документацію;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.8. Перевіряти правильність ведення Підрядником всієї виконавчої
        документації, яка передбачена діючими нормами і правилами, вимагати її
        своєчасного та якісного заповнення;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.9. В будь-який час перевіряти стан охорони праці при виконанні робіт
        Підрядником (Субпідрядником).
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        Виявлені під час перевірок відступи від законодавчих,
        нормативно-правових актів з охорони праці підлягають усуненню.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.4.10. Отримувати від Підрядника інформацію про хід виконання поточного
        ремонту;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.5. У разі передачі Замовником матеріалів для виконання робіт,
        зазначена передача проводиться шляхом складання акту приймання –
        передачі. В акті приймання – передачі вказується назва, кількість та
        призначення переданих матеріалів.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.6. Ризик випадкової загибелі, втрати та пошкодження матеріалів,
        наданих Замовником несе Підрядник з моменту підписання акту приймання -
        передачі.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        5.7. У разі використання матеріалів, наданих Замовником, не за
        призначенням визначеним Замовником, Підрядник сплачує вартість
        матеріалів і штраф у розмірі 10 % від вартості матеріалів.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        6. ЗМІНИ КОШТОРИСНОЇ ДОКУМЕНТАЦІЇ І ОБСЯГІВ НАДАННЯ ПОСЛУГ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        6.1. Замовник має право вносити у процесі виконання поточного ремонту по
        об’єкту зміни та доповнення до кошторисної документації та обсягів
        виконання поточного ремонту. Підрядник зобов’язаний враховувати ці
        зміни, якщо вони внесені за десять днів до початку виконання робіт, до
        яких вносяться зміни.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        6.2. Рішення Замовника про зміни та доповнення робіт приймаються
        Підрядником до виконання (власними або залученими силами) при умові
        внесення їх до кошторисної документації, а також, у разі потреби
        перегляду строків виконання робіт або Договірної ціни. Такі зміни
        оформлюються додатковою угодою до Договору.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        6.3. Додаткові послуги, які виконані Підрядником без узгодження з
        Замовником, а також послуги, при виконанні яких допущено відхилення від
        кошторису, не оплачуються і на вимогу Замовника, в установлені ним
        строки усуваються Підрядником і приводяться у відповідність із
        документацією.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        7. ВЕДЕННЯ ВИКОНАВЧОЇ ДОКУМЕНТАЦІЇ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        7.1. Підрядник забезпечує повне, якісне і своєчасне ведення виконавчої
        документації, що передбачена діючим порядком і цим Договором, визначає
        осіб, відповідальних за її ведення
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        8. ГАРАНТІЙНІ СТРОКИ ЕКСПЛУАТАЦІЇ ОБ’ЄКТА.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        8.1 Підрядник гарантує надійність і якість наданих послуг протягом трьох
        років після підписання акту здачі-приймання наданих послуг форми КБ-2в.
        Строк гарантії збільшується на період, протягом якого роботи по усуненню
        недоліків заважали нормальній експлуатації об’єкту.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        8.2. Підрядник зобов’язаний усунути за письмовою вимогою за свій рахунок
        недоліки, що виникають протягом строку гарантії і обумовлені виконанням
        робіт з порушенням діючих норм і правил, умов цього Договору, тільки
        після повної сплати суми виконаних робіт по даному Договору. Перелік
        недоліків оформлюється дефектним актом, який складається сторонами. В
        дефектному акті фіксується дата виявлення недоліків і терміни їх
        усунення. У разі відмови Підрядника приймати участь у складанні
        дефектного акта, він може бути складений із залученням фахівців
        незацікавлених органів.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        8.3. При відмові Підрядника усунути недоліки, виявлені протягом
        гарантійного строку, Замовник має право залучити до цієї роботи іншого
        виконавця із відшкодуванням його витрат за рахунок Підрядника.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        9. ВІДПОВІДАЛЬНІСТЬ СТОРІН.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.1. За невиконання або неналежне виконання умов цього Договору Сторони
        несуть відповідальність відповідно до чинного законодавства України.
        Сплата неустойки не звільняє Сторони від виконання прийнятих на себе
        зобов&apos;язань в натурі.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.2. Підрядник несе відповідальність:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.2.1. За збереження виконаних робіт, наслідки їх пошкодження або
        знищення на період ведення робіт, в т.ч. по роботам виконаним
        Субпідрядними організаціями.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.2.2. За шкоду, яка заподіяна під час виконання робіт майну або життю
        третіх осіб
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.2.3. За збереження матеріалів, конструкцій та обладнання Підрядника,
        за якість матеріалів Підрядника і забезпечує контроль якості матеріалів,
        які застосовуються при виконанні поточного ремонту, згідно ДСТУ
        сертифікатам, технічним паспортам та іншим документам, які засвідчують
        їх якість;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.2.4. За неналежне використання, втрату, знищення або пошкодження
        (псування) з його вини переданих йому (в разі такої передачі) Замовником
        матеріальних ресурсів.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.3. У випадку порушення Підрядником термінів виконання робіт,
        обумовлених графіком, він сплачує Замовнику неустойку в розмірі 0,1% від
        суми несвоєчасно виконаних робіт за кожний прострочений день. Неустойка
        нараховується за весь період прострочення
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.4. У випадку порушення Замовником термінів оплати виконаних робіт
        згідно п. 4.1, він сплачує Підряднику пеню в розмірі 0,05% від суми
        заборгованості, але не більше подвійної облікової ставки НБУ, що діяла
        на момент прострочення зобов’язань.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.5. Усі майнові претензії Сторони зобов’язуються вирішувати за взаємною
        згодою. Претензії, які не вирішені за взаємною згодою Сторін,
        передаються в порядку, встановленому чинним законодавством України, на
        розгляд до відповідного суду.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.6. Замовник не несе відповідальність за збереження матеріалів,
        конструкцій, обладнання Підрядника.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        9.7. Іншу відповідальність сторони цього Договору несуть згідно з діючим
        законодавством.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        10. ФОРС-МАЖОР
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        10.1. При настанні стихійних явищ природного характеру (землетруси,
        повені, урагани, руйнування в результаті блискавки тощо), лиха
        техногенного та антропогенного походження (вибухи, пожежі, тощо),
        обставин соціального, політичного і міжнародного походження (військові
        дії, громадські хвилювання, епідемії, страйки, бойкоти, блокади,
        ембарго, інші міжнародні санкції або дії державних органів), які є
        обставинами неможливості частково або в повній мірі виконання
        зобов&apos;язань за цим Договором, Сторони звільняються від
        відповідальності за невиконання своїх зобов&apos;язань відповідно до
        часу дії форс-мажорних обставин
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        10.2. Сторона, для якої наступили форс-мажорні обставини,
        зобов&apos;язана протягом не більше, ніж п&apos;яти календарних днів з
        часу їх настання або припинення повідомити у письмовій формі іншу
        Сторону. Факти, викладені в повідомленні, повинні бути підтверджені
        Торгово-промисловою палатою
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        10.3. У разі якщо форс-мажорні обставини тривають понад шістдесят
        календарних днів, Сторони можуть виступити з ініціативою про розірвання
        Договору.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        10.4. Настання форс-мажорних обставин не є підставою для невиконання
        Сторонами зобов&apos;язань, термін виконання яких настав до дати
        виникнення таких обставин, а також для звільнення Сторін від
        відповідальності за таке невиконання.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        11. ПРИЗУПИНЕННЯ ТА РОЗІРВАННЯ ДОГОВОРУ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.1. Замовник має право достроково розірвати або зупинити дію цього
        Договору у випадках:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.1.1. Відсутності коштів для фінансування робіт передбачених цим
        Договором;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.1.2. Виявлення недоцільності фінансування та подальшого ведення
        виконуваних робіт, а також появи обставин непереборної сили, неякісності
        проекту тощо;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.1.3. Банкрутства Підрядника;
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.1.4. Неодноразового та грубого порушення Підрядником будівельних норм
        та правил, відхилення при виконанні робіт від проектних рішень
        (кошторисної документації, ТУ, ДСТУ, КНУ «Настанова з визначення
        вартості будівництва» тощо), порушення термінів надання послуг, тощо.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.2. Сторона за цим Договором, яка прийняла рішення про зупинення робіт
        або розірвання Договору, зобов’язана письмово, з обґрунтуванням причин,
        попередити іншу Сторону не менш як за п&apos;ятнадцять днів до дати
        прийняття такого рішення. Зупинення робіт проводиться на термін до трьох
        місяців та, коли протягом цього терміну{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        обставини, які обумовили прийняття такого рішення, не будуть усунені,
        Сторона, яка зупинила роботи, має право розірвати цей Договір.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        11.3. У випадку дострокового розірвання Договору Підрядник зобов’язаний
        передати Замовнику устаткування, матеріальні ресурси, які передані
        Замовником (в разі такої передачі), та виконавчу документацію.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        12. ЗМІНИ УМОВ ДОГОВОРУ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        12.1 Умови цього Договору мають однакову обов’язкову для Сторін силу і
        можуть бути змінені за взаємною згодою Сторін з обов’язковим оформленням
        додаткової угоди.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        12.2. Кожна із сторін Договору не має права передавати свої права по
        цьому Договору третій стороні
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        13. ТЕРМІН ДІЇ ДОГОВОРУ, ДОДАТКИ ДО ДОГОВОРУ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        13.1 Цей Договір набуває чинності з моменту підписання його сторонами і
        діє до 31.12.{contrDateStr} року, а в частині виконання фінансових
        зобов’язань – до повного їх виконання. Закінчення строку дії цього
        Договору не звільняє Сторони від виконання прийнятих на себе
        зобов&apos;язань (в тому числі гарантійних) за цим Договором.
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        align='center'
      >
        14. ІНШІ УМОВИ.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.1. Замовник є платником податку на додану вартість та податку на
        прибуток на загальних умовах.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.2. Підрядник {executorTaxationType}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.3. У разі зміни статусу платника податку на прибуток, зазначених у
        п.п. 14.1, 14.2 цього Договору, Сторони зобов’язуються письмово
        сповіщати один одного протягом трьох календарних днів, наступних за
        днем, в якому відбулася зміна статусу платника податку на прибуток
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        У разі зміни свого найменування, організаційно-правової форми, статусу
        платника податків, юридичної або фактичної адреси, банківських або інших
        реквізитів Сторона повинна повідомити іншу Сторону в письмовій формі (в
        тому числі з використанням засобів факсимільного зв&apos;язку) протягом
        п&apos;яти календарних днів з моменту настання відповідних змін, але не
        пізніше останнього робочого дня звітного місяця, в якому відбулися
        зміни, сповістити про це іншу Сторону в письмовій формі з
        обов&apos;язковим наданням копій документів про зміни зазначених
        реквізитів
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        У разі недотримання Підрядником зазначених термінів, заміна Замовником
        раніше виданих документів (податкових накладних, рахунків - фактур і т.
        д.) не виконується.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        Всі збитки, завдані Замовнику несвоєчасним повідомленням змінених
        реквізитів, а також додаткові витрати Замовника в зв&apos;язку з цим,
        Підрядник зобов&apos;язується відшкодовувати Замовнику за його першою
        вимогою протягом 3-х календарних днів.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.4. Сторони несуть відповідальність за реєстрацію ПДВ відповідно до
        ст. 201 ПКУ:
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        – Згідно 201.10 абз. XIV Реєстрація податкових накладних та/або
        розрахунків коригування до податкових накладних у Єдиному реєстрі
        податкових накладних має бути здійснена протягом 15 календарних днів,
        наступних за датою виникнення податкових зобов’язань, відображених у
        відповідних податкових накладних та/або розрахунках коригування. У разі
        порушення цього терміну застосовуються штрафні санкції згідно з цим
        Кодексом.{' '}
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        – Згідно 201.10 абз.I При здійсненні операцій з постачання
        товарів/послуг платник податку - продавець товарів/послуг зобов’язаний в
        установлені терміни скласти податкову накладну, зареєструвати її в
        Єдиному реєстрі податкових накладних та надати покупцю за його вимогою.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        – Згідно 201.10 абз. ХXI Відсутність факту реєстрації платником податку
        податкових накладних в ЄРПН не дає права покупцю на включення сум
        податку на додану вартість до податкового кредиту.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        – Згідно 201.10 абз. XХIII У разі допущення продавцем товарів/послуг
        помилок при зазначенні обов’язкових реквізитів податкової накладної,
        передбачених пунктом 201.1 статті 201 цього Кодексу, та/або порушення
        продавцем/покупцем граничних термінів реєстрації в ЄРПН податкової
        накладної та/або розрахунку коригування покупець/продавець таких
        товарів/послуг має право додати до податкової декларації за звітний
        податковий період заяву із скаргою на такого продавця/покупця.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        – За відсутність реєстрації податкової накладної складеної в електронній
        формі з дотриманням умов щодо реєстрації у порядку, визначеному
        законодавством, електронного підпису уповноваженої платником особи
        продавець несе матеріальну відповідальність, а саме відшкодовує покупцю
        збитки, що виникли з його вини у розмірі суми ПДВ у вищезгаданих
        податкових накладних.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.5. Замовник для документообігу з контрагентами користується
        ліцензійною актуальною версією «M.E.Doc IS».
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.6. Все листування, пересилання документів, повідомлень, заяв і
        претензій, пов&apos;язаних з виконанням цього Договору або випливають з
        нього, повинні спрямовуватися Сторонами безпосередньо на адреси один
        одного, зазначені в цьому Договорі, відповідно до термінів і порядку,
        установлених чинним законодавством і цим Договором.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.7. Електроенергія, споживана машинами та інструментами Підрядника, та
        вода, що використовуються при виконанні робіт, є власністю Замовника і
        Підрядником до оплати не пред&apos;являються. Використання
        електроенергії та води здійснюється за погодженням із Замовником.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.8. У випадках, не передбачених цим Договором, Сторони керуються
        чинним законодавством України.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.9. Цей Договір укладений у 2-х ідентичних примірниках, які мають
        однакову юридичну силу, по одному для кожної із сторін.
      </Typography>
      <Typography variant='body2' className={classes['rems-potochn-paragraph']}>
        14.10. Не є порушенням умов цього Договору надання будь – якою Стороною
        інформації державним органам та установам, що мають відповідні
        повноваження на витребування такої інформації відповідно до чинного
        законодавства України, так саме як і розміщення інформації щодо умов
        даного Договору на офіційному сайті Запорізької міської ради в розділі
        Міське господарство. Реєстр укладених Договорів закупівель та сайті
        Комунального підприємства “Запоріжремсервіс” ЗМР у розділі Реєстр
        укладених Договорів “ відповідно до форми , яка наведена на сайті :
        https://www.meria.zp.ua{' '}
      </Typography>
      <Typography
        variant='body1'
        className={classes['rems-potochn-chapter']}
        mb={1}
        align='center'
      >
        15. ЮРИДИЧНІ АДРЕСИ ТА БАНКІВСЬКІ РЕКВІЗИТИ СТОРІН.
      </Typography>
      <TableContainer id='table-rems-contract-potochn-sign'>
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
                // paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  pb={2}
                  sx={{
                    borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  15.1. Замовник:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  pb={2}
                  sx={{
                    borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    borderLeft: '1px solid transparent',
                  }}
                >
                  15.2. Підрядник
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  <strong>КП «Запоріжремсервіс» ЗМР</strong>{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    // borderLeft: '1px solid black',
                  }}
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
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  {clientAddres}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    // borderLeft: '1px solid black',
                  }}
                >
                  {executorAddres}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  {' '}
                  {clientIBAN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    // borderLeft: '1px solid black',
                  }}
                >
                  {executorIBAN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  {clientEDRPO}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-text']}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    // borderBottom: '1px solid black',
                    // borderLeft: '1px solid black',
                  }}
                >
                  {executorEDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                  }}
                >
                  <Grid item>
                    <Typography
                      variant='body2'
                      className={classes['rems-potochn-text']}
                    >
                      {clientJobTitleimen}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-potochn-text']}
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
                  sx={{
                    // borderTop: '1px solid black',
                    borderRight: '1px solid black',
                    borderBottom: '1px solid black',
                    // borderLeft: '1px solid black',
                  }}
                >
                  <Grid item>
                    <Typography
                      variant='body2'
                      className={classes['rems-potochn-text']}
                    >
                      {executorJobTitleimen}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid item>
                    <Typography
                      variant='body2'
                      pr={1}
                      className={classes['rems-potochn-text']}
                    >
                      {executorFIOImen}{' '}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* //////////////////////////////// */}

      {/* <Grid
        container
        direction={`row`}
        spacing={1}
        sx={{
          borderLeft: '1px solid black',
          borderTop: '1px solid black',
          borderRight: '1px solid black',
          // borderBottom: '1px solid black',
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            // borderLeft: '1px solid black',
            // borderTop: '1px solid black',
            borderRight: '1px solid black',
            // borderBottom: '1px solid black',
          }}
        >
          <Typography variant='body2' pb={2}>
            15.1. Замовник:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2' pb={2}>
            15.2. Підрядник
          </Typography>
        </Grid>
      </Grid> */}
      {/* //////////////////////////////// */}
      {/* <Grid
        container
        direction={`row`}
        spacing={1}
        sx={{
          borderLeft: '1px solid black',
          borderTop: '1px solid black',
          borderRight: '1px solid black',
          // borderBottom: '1px solid black',
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            // borderLeft: '1px solid black',
            // borderTop: '1px solid black',
            borderRight: '1px solid black',
            // borderBottom: '1px solid black',
          }}
        >
          <Grid container direction={`column`}>
            <Grid item xs={12}>
              <Typography variant='body2'>
                <strong>КП «Запоріжремсервіс» ЗМР</strong>{' '}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>{clientAddres}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'> {clientIBAN}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>{clientEDRPO}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Typography variant='body2'>
              <strong>
                {executorTypeShort} «{executorName}»
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>{executorAddres}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>{executorIBAN}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>{executorEDRPO}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction={`row`}
        spacing={1}
        pt={1}
        sx={{
          borderLeft: '1px solid black',
          // borderTop: '1px solid black',
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
        }}
      >
        <Grid
          item
          xs={6}
          pr={1}
          pb={1}
          sx={{
            // borderLeft: '1px solid black',
            // borderTop: '1px solid black',
            borderRight: '1px solid black',
            // borderBottom: '1px solid black',
          }}
        >
          <Grid item xs={12}>
            <Grid container direction={`row`}>
              <Grid item>
                <Typography variant='body2'>{clientJobTitleimen}</Typography>
              </Grid>
              <Grid
                item
                sx={{ flex: 1, borderBottom: '1px solid black' }}
              ></Grid>
              <Grid item>
                <Typography variant='body2'>{clientFIOImen}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} pr={1} pb={1}>
          <Grid item xs={12}>
            <Grid container direction={`row`}>
              <Grid item>
                <Typography variant='body2'>{executorJobTitleimen}</Typography>
              </Grid>
              <Grid
                item
                sx={{ flex: 1, borderBottom: '1px solid black' }}
              ></Grid>
              <Grid item>
                <Typography variant='body2'>{executorFIOImen} </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}

      {/* //////////////////////////////// */}
    </div>
  );
}
