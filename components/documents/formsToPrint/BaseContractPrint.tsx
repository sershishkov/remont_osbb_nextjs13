import React from 'react';
import { I_Contract, I_Client } from '@/interfaces/refdata';
import classes from './styles.module.scss';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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
  return (
    <div className={classes.page} id='page'>
      <Typography variant='h6' align='center'>
        Договір № 24.01.08.10.17
      </Typography>
      <Typography variant='body2' align='center'>
        на виконання ремонтних робіт
      </Typography>
      <Grid
        container
        direction={`row`}
        justifyContent={`space-between`}
        alignItems={`center`}
      >
        <Grid item>
          <Typography variant='body2'>« 08 » січня 2024 року</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'>м. Запоріжжя</Typography>
        </Grid>
      </Grid>
      <Typography variant='body2'>
        ОБ&apos;ЄДНАННЯ СПІВВЛАСНИКІВ БАГАТОКВАРТИРНОГО БУДИНКУ « Добробут 35 »
        , в особі голови правління Троцко Олександра Олексійовича , що діє на
        підставі Статуту, надалі іменується «ЗАМОВНИК», та
      </Typography>
      <Typography variant='body2'>
        ТОВ «АЗОТЕЯ 2» , надалі іменується « ВИКОНАВЕЦЬ » в особі директора
        Ткачова Віталія Вікторовича, що діє на підставі Статуту , є платником на
        прибуток на загальних засадах (без ПДВ)., з іншого боку, кожна окремо -
        Сторона, а разом – Сторони уклали даний Договір про наступне:{' '}
      </Typography>
      <Typography variant='body1' align='center'>
        1. ПРЕДМЕТ ДОГОВОРУ
      </Typography>
      <Typography variant='body2'>
        1.1. Згідно цього договору ВИКОНАВЕЦЬ приймає на себе зобов`язання
        виконувати «Поточний ремонт міжпанельних швів та панелей будинку у
        житловому будинку за адресою: м.Запоріжжя,вул.Днiпровськi Пороги, 35 »,
        а ЗАМОВНИК зобов`язується приймати роботу та оплатити її вартість у
        строки та на умовах, що визначаються цим договором та додатками до
        нього.{' '}
      </Typography>
      <Typography variant='body2'>
        1.2. Перелік виконаних робот вказуються в Актах виконаних робіт. Акт
        виконаних робіт є невід’ємною частиною цього Договору
      </Typography>
      <Typography variant='body1' align='center'>
        2. ВАРТІСТЬ РОБІТ ТА ПОРЯДОК РОЗРАХУНКІВ
      </Typography>
      <Typography variant='body2'>
        2.1. Вартість послуг складає 16716 грн 82 коп (Шістнадцять тисяч сімсот
        шістнадцять гривень 82 копійки.), без ПДВ.
      </Typography>
      <Typography variant='body2'>
        2.2. Оплата здійснюється ЗАМОВНИКОМ шляхом перерахування на
        розрахунковий рахунок ВИКОНАВЦЯ коштів протягом 3 банківських днів після
        дати підписання акту виконаних робіт.
      </Typography>
      <Typography variant='body2'>
        2.3. Датою здійснення платежу є дата списання коштів з поточного рахунку
        ЗАМОВНИКА.
      </Typography>
      <Typography variant='body2'>
        2.4 Факт виконання договірних зобов’язань ВИКОНАВЦЯ підтверджується
        Актом виконаних робіт. Даний Акт складається і підписується сторонами
        договору.
      </Typography>
      <Typography variant='body2'>
        2.5. Вартість за виконання інших додаткових послуг погоджується
        сторонами окремо, і сплачується на підставі виставленого рахунку і
        відповідного Акту виконаних робіт.
      </Typography>
      <Typography variant='body2'>
        2.6.ЗАМОВНИК протягом двох робочих днів з моменту отримання Актів
        виконаних робіт підписує їх або направляє ЗАМОВНИКУ мотивовану відмову в
        прийманні робіт, в іншому випадку, Акти виконаних робіт вважаються
        підписаними.
      </Typography>

      <Typography variant='body1' align='center'>
        3.СТРОК ДІЇ ТА УМОВИ РОЗІРВАННЯ ДОГОВОРУ
      </Typography>
      <Typography variant='body2'>
        3.1. Даний договір починає діяти з моменту його підписання Сторонами і
        діє до повного виконання робіт по цьому договору.
      </Typography>
      <Typography variant='body2'>
        3.2. В випадку продовження строку дії даного Договору Сторони мають
        право переглянути ціни на передбачені Договором роботи.
      </Typography>
      <Typography variant='body2'>
        3.3. Будь-яка із сторін може розірвати цей Договір в односторонньому
        порядку або призупинити його виконання, якщо інша сторона:
      </Typography>
      <Typography variant='body2'>
        3.3.1.Не виконує свої зобов’язання за Договором або не виконує положення
        Договору, з письмовим повідомленням про цей факт іншій стороні за 10
        робочих днів.
      </Typography>
      <Typography variant='body2'>
        3.4.ЗАМОВНИК має право розірвати Договір у будь-який час, якщо
        ВИКОНАВЕЦЬ не буде виконувати свої обов’язки на рівні, що задовольняє
        ЗАМОВНИКА.
      </Typography>
      <Typography variant='body2'>
        3.5.У випадку розірвання Договору платежі по договору проводяться на
        дату розірвання Договору з врахуванням об’єму виконаних робіт.
      </Typography>
      <Typography variant='body1' align='center'>
        4.ОБОВ’ЯЗКИ СТОРІН
      </Typography>
      <Typography variant='body2'>4.1. Замовник зобов’язується:</Typography>
      <Typography variant='body2'>
        4.1.1.Своєчасно здійснювати оплату в строки, зазначені в даному
        Договорі.
      </Typography>
      <Typography variant='body2'>
        4.1.2.Прийняти результати робіт протягом двох робочих днів з дня
        отримання Актів виконаних робіт або направити Виконавцю мотивовану
        відмову в прийомі робіт, в іншому випадку, Акти виконаних робіт
        вважаються підписаними.
      </Typography>
      <Typography variant='body2'>
        4.1.3.Забезпечити доступ до об’єктів, а саме: в визначені приміщення в
        яких мають проводитись монтажні роботи.
      </Typography>
      <Typography variant='body2'>
        4.1.4.Відповідно до цього договору ЗАМОВНИК має право здійснювати
        контроль і технічний нагляд за відповідністю обсягу і якості виконуваних
        робіт.
      </Typography>
      <Typography variant='body2'>4.2. Виконавець зобов’язується:</Typography>
      <Typography variant='body2'>
        4.2.1.Своєчасно та якісно виконувати роботи, які є предметом цього
        договору.
      </Typography>
      <Typography variant='body2'>
        4.2.2.Своєчасно надати Акти виконаних робіт і рахунки, які підлягають
        оплаті.
      </Typography>
      <Typography variant='body2'>
        4.2.3.Усунути за свій рахунок брак та недоробки, виявлені ЗАМОВНИКОМ у
        процесі контролювання якості виконаних ВИКОНАВЦЕМ робіт згідно даного
        Договору.
      </Typography>
      <Typography variant='body2'>
        4.2.4.Відповідальність за виконання техніки безпеки при виконанні робіт
        за цим договором покладається на ВИКОНАВЦЯ.
      </Typography>
      <Typography variant='body2'>
        4.2.5.ВИКОНАВЕЦЬ несе повну відповідальність за шкоду нанесену
        обладнанню ЗАМОВНИКА, які виникли з вини ВИКОНАВЦЯ при виконані робіт за
        цим Договором.
      </Typography>
      <Typography variant='body2'>
        4.2.6. ВИКОНАВЕЦЬ зобов&apos;язується в продовж гарантійного терміну
        безкоштовно з використанням власних матеріалів і засобів ліквідовувати
        будь-які недоліки, які виникли з вини ВИКОНАВЦЯ. Гарантійний термін
        складає 12 мiсяцiв, якій починається з дати підписання Акту виконаних
        робіт.
      </Typography>
      <Typography variant='body1' align='center'>
        5.ВІДПОВІДАЛЬНІСТЬ
      </Typography>
      <Typography variant='body2'>
        5.1. В випадку порушення умов даного Договору, винна Сторона несе
        відповідальність визначену цим Договором або чинним законодавством
        України.
      </Typography>
      <Typography variant='body2'>
        5.2. За цим договором, сплата винуватою Стороною визначених даним
        договором та/або чинним законодавством України штрафних санкцій
        (неустойка, пеня, штраф) не звільняє останню від обов’язку від виконання
        обов’язків за Договором в натурі та в повному обсязі.
      </Typography>
      <Typography variant='body2'>
        5.3. В випадку безпідставної відмови будь-якої із сторін від підписання
        Акту виконаних робіт, Сторона, яка безпідставно відмовилася або
        ухиляється від підписання Акту, сплачує іншій стороні штраф в розмірі
        0,2% від суми, яка підлягає сплаті.
      </Typography>
      <Typography variant='body2'>
        5.4. За несвоєчасне перерахування коштів ЗАМОВНИК сплачує пеню в розмірі
        0,2 % від суми за кожен день несплати.
      </Typography>

      <Typography variant='body1' align='center'>
        6.ВИРІШЕННЯ СПОРІВ
      </Typography>
      <Typography variant='body2'>
        6.1. Усі спори, що виникають між Сторонами в процесі здійснення умов
        Договору, вирішуються шляхом переговорів між Сторонами.
      </Typography>
      <Typography variant='body2'>
        6.2. Якщо спір неможливо вирішити шляхом переговорів, він вирішується в
        судовому порядку, відповідно до чинного законодавства України.
      </Typography>

      <Typography variant='body1' align='center'>
        7.ФОРС-МАЖОР
      </Typography>
      <Typography variant='body2'>
        7.1. Сторони погодились, що у разі виникнення форс-мажорних обставин
        (дії непереборної сили, які не залежать від волі сторін), а саме:
        військові дії, блокада, ембарго, пожежі, повені, епідемії, землетруси,
        інші стихійні лиха і т.п.,строк виконання зобов’язань за даним договором
        переноситься на період, протягом якого будуть діяти такі обставини і
        жодна із сторін не несе відповідальності за невиконання умов Договору.
      </Typography>
      <Typography variant='body2'>
        7.2.Сторона, що не виконує свого зобов’язання внаслідок дії непереборної
        сили, повинна негайно повідомити іншу сторону про перешкоду і її вплив
        на виконання зобов’язань за даним Договором.
      </Typography>
      <Typography variant='body2'>
        7.3.Якщо форс-мажорні обставини діють більше ніж 30 календарних днів, то
        Сторона, за своїм бажанням, має розірвати Договір. В даному випадку ні
        одна із сторін не має права вимагати від іншої сторони компенсації за
        будь-які збитки, крім тих, що виникли до початку дії форс-мажорних
        обставин
      </Typography>

      <Typography variant='body1' align='center'>
        8.ІНШІ ПОЛОЖЕННЯ
      </Typography>
      <Typography variant='body2'>
        8.1. Цей Договір являє собою повне взаємопорозуміння Сторін відносно
        предмету договору, ціни договору, строку дії договору та інших умов.
      </Typography>
      <Typography variant='body2'>
        8.2. Доповнення, додатки та відмови до даного договору вважаються
        дійсними тільки в тому випадку, якщо вони надані в письмовій формі і
        підписанні Сторонами.
      </Typography>
      <Typography variant='body2'>
        8.3. Жодна із сторін не має права передавати свої права та обов’язки за
        Договором третій стороні без попередньої письмової згоди на це іншої
        сторони.
      </Typography>
      <Typography variant='body2'>
        8.4. Виконавець є резидентом України та є платником на прибуток на
        загальних засадах (без ПДВ).
      </Typography>
      <Typography variant='body2'>
        8.5. Всі повідомлення, які відносяться до виконання умов договору
        здійснюється в письмовій формі і підписуються уповноваженою особою
        сторони.
      </Typography>
      <Typography variant='body2'>
        8.6.Будь-яке повідомлення вважається отриманим якщо воно вручено
        адресату під розписку, при цьому адресат підписує копію повідомлення про
        вручення, яка повертається відправнику.
      </Typography>
      <Typography variant='body2'>
        8.7.Всі доповнення і додатки є невід’ємною частиною Договору.
      </Typography>
      <Typography variant='body1' align='center'>
        9. РЕКВІЗИТИ ТА ПІДПИСИ СТОРІН
      </Typography>
      <Grid container direction={`column`}>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2' align='center'>
                ВИКОНАВЕЦЬ
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='center'>
                ЗАМОВНИК
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>ТОВ «АЗОТЕЯ 2» </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>ОСББ « Добробут 35 » </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>
                Адреса: 69104 м. Запоріжжя, вул. Чумаченка, буд.23В, кв. 123
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
                Адреса: 69121,м.Запоріжжя,вул.Днiпровськi Пороги, 35{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>ЄДРПОУ : 44438025</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>ЄДРПОУ : 40282339</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>
                IBAN: UA 59 307770 00000 26004211129297 ПАТ Акцент-БАНК, МФО
                307770
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
                IBAN : UA 203204780000026009924440846, АБ УКРГАЗБАНК, МФО 320478
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>Тел: +38(095)168-77-48</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>email: docums2@gmail.com</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
                email: trotsko35@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2'>Директор</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>Голова правління</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Grid container direction={`row`}>
                <Grid
                  item
                  sx={{ flex: 1, borderBottom: '1px solid black' }}
                ></Grid>
                <Grid item>
                  <Typography variant='body2'>Віталій ТКАЧОВ</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction={`row`}>
                <Grid
                  item
                  sx={{ flex: 1, borderBottom: '1px solid black' }}
                ></Grid>
                <Grid item>
                  <Typography variant='body2'>Олександр ТРОЦКО</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={`row`} spacing={1}>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                м.п.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                м.п.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
