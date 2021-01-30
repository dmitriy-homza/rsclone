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
          services: [{
            name: 'Кальян', weight: '485', cost: '14.2', time: ['18:40', '18:40', '18:40', '18:40', '18:40'], quantity: 5, id: '2',
          }],
        },
      },
    },
  };

  const arr = [
    {
      nomber: '',
      date: '',
      name: 'Ведите номер закза',
      table: {},
      additions: {
        dishes: [{}],
        services: [{}],
      },

    },
    {
      nomber: '1',
      date: 'Sun Mar 07 2021 20:40:00 GMT+0300',
      name: 'Roman',
      table: {
        number: '10',
        persons: '8',
      },
      additions: {
        dishes: [{
          name: 'Сковородка Сельская с деревенскими колбасками', weight: '416', cost: '13.4', time: ['17:00'], quantity: 1, id: '0',
        }, {
          name: 'Котлеты по-киевски', weight: '455', cost: '12.5', time: ['17:40', '17:50'], quantity: 2, id: '1',
        }, {
          name: 'Сковородка с куриными бедрышками и сердечками', weight: '485', cost: '14.2', time: ['18:40', '18:40', '18:40', '18:40', '18:40'], quantity: 5, id: '2',
        }],
        services: [{
          name: 'Кальян', weight: '485', cost: '14.2', time: ['18:40', '18:40', '18:40', '18:40', '18:40'], quantity: 5, id: '2',

        }],

      },
    },
    {
      nomber: '2',
      date: 'Sun Mar 07 2022 20:40:00 GMT+0300',
      name: 'Mike',
      table: {
        number: '5',
        persons: '3',
      },
      additions: {
        dishes: [{
          name: 'Сковородка ', weight: '46', cost: '1.4', time: ['17:00'], quantity: 1, id: '0',
        }, {
          name: 'Котлеты ', weight: '45', cost: '12.5', time: ['17:40', '17:50'], quantity: 2, id: '1',
        }, {
          name: 'Сковородка с куриными ', weight: '45', cost: '14.2', time: ['18:40', '18:40', '18:40', '18:40', '18:40'], quantity: 5, id: '2',
        }],
        services: [{
          name: 'Кальян', weight: '45', cost: '4.2', time: ['8:40', '8:40', '1:40', '1:40', '1:40'], quantity: 5, id: '2',

        }],

      },
    },

  ];

  return arr;
}
