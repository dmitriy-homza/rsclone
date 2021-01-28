// import React from 'react'

export default function Orders() {
  // eslint-disable-next-line no-unused-vars
  const unicID = {
    orders: {
      'Sun Mar 07 2021 20:40:00 GMT+0300': {
        table: {},
        additions: {
          dishes: [{
            name: 'Сковородка Сельская с деревенскими колбасками', weight: '416', cost: '13.4', time: ['17:00'], quantity: 1, id: '0',
          }, {
            name: 'Котлеты по-киевски', weight: '455', cost: '12.5', time: ['17:40', '17:50'], quantity: 2, id: '1',
          }, {
            name: 'Сковородка с куриными бедрышками и сердечками', weight: '485', cost: '14.2', time: ['18:40', '18:40', '18:40', '18:40', '18:40'], quantity: 5, id: '2',
          }],
          services: [{}],
        },
      },
    },
  };

  const arr = [
    {
      nomber: '',
      name: 'Ведите номер закза',

    },
    {
      nomber: 123,
      name: 'Nick',
      time: 'time',
      table: {
        persons: '3 person',
        number: 12,
      },
      option: 'none',
      dishes: {
        fist: 'soup',
        second: 'potato',
        drink: 'vodka',
      },
    },
    {
      nomber: 12,
      name: 'Roman',
      time: 'time',
      table: {
        persons: '3 person',
        number: 12,
      },
      option: 'none',
      dishes: {
        fist: 'soup',
        second: 'potato',
        drink: 'vodka',
      },
    },
    {
      nomber: 3,
      name: 'AbraKadabra',
      time: 'time',
      table: {
        persons: '3 person',
        number: 12,
      },
      option: 'none',
      dishes: {
        fist: 'soup',
        second: 'potato',
        drink: 'vodka',
      },
    },
    {
      nomber: 23,
      name: 'Nick',
      time: 'time',
      table: {
        persons: '3 person',
        number: 12,
      },
      option: 'none',
      dishes: {
        fist: 'soup',
        second: 'potato',
        drink: 'vodka',
      },
    },
    {
      nomber: 1,
      name: 'Nick',
      time: 'time',
      table: {
        persons: '3 person',
        number: 12,
      },
      option: 'none',
      dishes: {
        fist: 'soup',
        second: 'potato',
        drink: 'vodka',
      },
    },
  ];

  return arr;
}
