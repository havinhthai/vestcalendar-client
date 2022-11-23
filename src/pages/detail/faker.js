import img1 from 'assets/images/coin/btc.png';
import img2 from 'assets/images/coin/eth.png';
import img3 from 'assets/images/coin/bnb.png';
import img4 from 'assets/images/coin/tet.png';
import img5 from 'assets/images/coin/sol.png';
import img6 from 'assets/images/coin/ada.png';
import img7 from 'assets/images/coin/avax.png';

import chart1 from 'assets/images/icon/chart-up.png';
import chart2 from 'assets/images/icon/chart-down.png';

const DETAIL_FAKER = {
  _id: 'DETAIL_FAKER_id',
  name: 'Lion',
  ticker: 'Lion',
  description: 'Lion description',
  logo: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1631/posts/40055/image-upload/Screenshot_2022_02_16_at_9_30_14_am_copy.jpg',
  categories: [
    {
      _id: '_id',
      name: 'name',
      description: 'description',
      isPublished: false,
    },
  ],
  distributionTimeLine: [
    {
      id: 1,
      timezone: 'America/Mazatlan',
      time: 'Sep 11 2022 16:00',
      description: 'Option 1 - 8.33%',
      title: 'Unlock of Coinlist round',
    },
    {
      id: 2,
      timezone: 'America/Mazatlan',
      time: 'Sep 22 2022 22:00',
      description: 'Option 1 - 8.33%',
      title: 'Unlock of Coinlist round',
    },
    {
      id: 3,
      timezone: 'America/Mazatlan',
      time: 'Oct 22 2022 8:00',
      description: 'Option 1 - 8.33%',
      title: 'Unlock of Coinlist round',
    },
    {
      id: 4,
      timezone: 'America/Mazatlan',
      time: 'Dec 22 2022 8:00',
      description: 'Option 1 - 8.33%',
      title: 'Unlock of Coinlist round',
    },
  ],
  links: [
    {
      linkType: 'twitter',
      url: 'https://twitter.com/',
    },
    {
      linkType: 'telegram',
      url: 'https://web.telegram.org/',
    },
    {
      linkType: 'discord',
      url: 'https://discord.com/',
    },
  ],
  allocations: [
    {
      id: 1,
      title: 'Operating trust',
      percent: 10,
    },
    {
      id: 2,
      title: 'Advisors',
      percent: 20,
    },
    {
      id: 3,
      title: 'Seed round',
      percent: 30,
    },
    {
      id: 4,
      title: 'Strategic round',
      percent: 30,
    },
    {
      id: 5,
      title: 'Team',
      percent: 30,
    },
  ],
  tgeSummary: [
    {
      title: 'Sale date',
      value: '8 JUL 2021',
      valueType: 'text', // text | number | % | USD
    },
    {
      title: 'Tokens sold',
      value: '32.52',
      valueType: '%', // text | number | % | USD
    },
    {
      title: 'Market cap at TGE',
      value: '15500000',
      valueType: 'USD', // text | number | % | USD
    },
    {
      title: 'Fully diluted market cap',
      value: '500000000',
      valueType: 'USD', // text | number | % | USD
    },
    {
      title: 'Token supply at TGE',
      value: '31100000',
      valueType: 'number', // text | number | % | USD
    },
    {
      title: 'Total token supply',
      value: '1000000000',
      valueType: 'number', // text | number | % | USD
    },
  ],
  vestingSchedule: [
    {
      id: 1,
      createdAt: '09/26/2022',
      isMonthCountingStart: false,
      maxPrice: 100,
      description: 'Linear vest - 12 months, daily release',
      tgeUnlock: 20, // null | number => - | tgeUnlock : number %
      tokenPrice: 10, // null | number => - - | token price: $number, roi$: maxPrice / tokenPrice
      cliffMonths: 5, // default 0,
      vestingMonths: 12, // default 1
    },
    {
      id: 2,
      createdAt: '09/26/2022',
      isMonthCountingStart: false,
      maxPrice: 100,
      description: 'Linear vest - 5 months',
      tgeUnlock: 1, // null | number => - | tgeUnlock : number %
      tokenPrice: 2, // null | number => - - | token price: $number, roi$: maxPrice / tokenPrice
      cliffMonths: 12, // default 0,
      vestingMonths: 5, // default 1
    },
    {
      id: 4,
      createdAt: '09/26/2022',
      isMonthCountingStart: false,
      maxPrice: 100,
      description: 'Linear vest - 20 months',
      tgeUnlock: 20, // null | number => - | tgeUnlock : number %
      tokenPrice: 20, // null | number => - - | token price: $number, roi$: maxPrice / tokenPrice
      cliffMonths: 13, // default 0,
      vestingMonths: 20, // default 1
    },
    {
      id: 5,
      createdAt: '09/26/2022',
      isMonthCountingStart: false,
      maxPrice: 100,
      description: 'Linear vest - 5 months',
      tgeUnlock: 20, // null | number => - | tgeUnlock : number %
      tokenPrice: 20, // null | number => - - | token price: $number, roi$: maxPrice / tokenPrice
      cliffMonths: 1, // default 0,
      vestingMonths: 5, // default 1
    },
  ],
  isPublished: false,
  createdBy: 'createdBy_id',
  createdAt: 'createdAt_date_time',
  updatedAt: 'updatedAt_date_time',

  // custom data
  id: 1,
  icon: img1,
  uint: 'BTC',
  price: '$56,623.54',
  sale: '+1.45%',
  cap: '$880,423,640,582',
  chart: chart1,
  class: 'up',

  ico: '18',
  token: 'TOKEN FIELD',
  vesting: 'VESTING FIELD',
  stage: 'STAGE FIELD',
  coming: 'COMING FIELD',
  symbol: 'AZYUSDT',

  startTime: 'Sep 2022',
};

export default DETAIL_FAKER;

export const DETAILS_FAKER = [
  {
    ...DETAIL_FAKER,
    id: 1,
    icon: img1,
  },
  {
    ...DETAIL_FAKER,
    id: 2,
    icon: img2,
    chart: chart2,
    class: 'down',
  },
  {
    ...DETAIL_FAKER,
    id: 3,
    icon: img3,
  },
  {
    ...DETAIL_FAKER,
    id: 4,
    icon: img4,
  },
  {
    ...DETAIL_FAKER,
    id: 5,
    icon: img5,
    chart: chart2,
    class: 'down',
  },
  {
    ...DETAIL_FAKER,
    id: 6,
    icon: img6,
    chart: chart2,
    class: 'down',
  },
  {
    ...DETAIL_FAKER,
    id: 7,
    icon: img7,
  },
];
