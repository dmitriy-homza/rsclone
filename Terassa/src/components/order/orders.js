// import React from 'react'

export default function Orders() {
  const arr = [
    {
      nomber: '',
      name: 'Ведите номер закза',
      time: '',
      table: {

      },
      option: [],
      menu: [],
    },
    {
      nomber: 23,
      name: 'Nick',
      time: 'time',
      table: {
        persons: '3 person',
        number: 12,
      },
      option:
        [
          {
            flovers: 'roses',
            hookah: 'aple-limon',
            special: 'за счет заведения',
          },
          {
            flovers: 'хуезы',
            hookah: 'хуельян',
            special: 'пойти нихер',
          },
        ],
      menu:
        [
          {
            name: 'Сковородка Сельская с деревенскими колбасками',
            weight: '416',
            cost: '13.4',
            time: ['17:00'],
            quantity: 1,
            id: '0',
          },
          {
            name: 'Котлеты по-киевски',
            weight: '455',
            cost: '12.5',
            time: ['17:40', '17:50'],
            quantity: 2,
            id: '1',
          },
          {
            name: 'Сковородка с куриными бедрышками и сердечками',
            weight: '485',
            cost: '14.2',
            time: ['18:40', '18:40', '18:40', '18:40', '18:40'],
            quantity: 5,
            id: '2',
          },
        ],
    },
  ];

  return arr;
}
