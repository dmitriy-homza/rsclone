/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import buttonItem from './buttonItem'
import AdminTableRender from './AdminTableRender';
import cursor from './cursor.png';
import firebase from 'firebase/app';
import 'firebase/database';


// const samples = {
//   roomPlan: 'plan.jpg',
//   cursorImage: cursor,
//   tables: [
//     {
//       image: 'https://img.icons8.com/ios/452/shopping-cart-with-money.png',
//       info: 'столик на двоих',
//       price: '50$',
//     },
//     {
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSb6zfFfgGxaflv3S6UfdYfVK-bphjhRPgNw&usqp=CAU',
//       info: 'столик на четверых',
//       price: '100$',
//     },
//     {
//       image: 'https://s1.iconbird.com/ico/2013/8/429/w128h1281377939682185078emailmailstreamline3.png',
//       info: 'Кот который любит тыгдыкать',
//       price: '2$',
//     },
//     {
//       image: 'https://image.flaticon.com/icons/png/128/181/181546.png',
//       info: 'Кот который молча тебя осуждает',
//       price: '4$',
//     },
//   ],
// };
// localStorage.setItem('firstRender', JSON.stringify(true))

const AdminPanelTableRender = () => {
  // const [data, setData] = useState({
  //     image: 'https://image.flaticon.com/icons/png/128/181/181546.png',
  //     texture: PIXI.Texture.from('https://image.flaticon.com/icons/png/128/181/181546.png'),
  //     info: 'столик на двоих',
  //     price: '50$',
  // });

  const [fbData, setfbData] = useState(0)
  // const [bgImage, setBGImage] = useState('https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg');

  // const [tables, updateTables] = useState([])

  // const ref = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase.database().ref('CanvasPreset').once('value').then((snapshot) => snapshot.val());
      setfbData(result);
      console.log('async over',result)
    };
    fetchData()
    // .then(
    //   () => {
    //     console.log(fbData)
    //     let activeButton;
    //     samples.tables.forEach((el, ind) => {
    //       const label = document.createElement('label');
    //       const radio = document.createElement('input');

    //       label.setAttribute('for', `${el.image}`);
    //       label.index = ind;
    //       const button = document.createElement('div');
    //       button.classList.add('chooseModeButton');
    //       button.style.backgroundImage = `url(${el.image})`;
    //       label.appendChild(button);

    //       radio.type = 'radio';
    //       radio.name = 'chooseMode';
    //       radio.value = el.image;
    //       radio.id = el.image;
    //       radio.info = el.info;
    //       radio.price = el.price;

    //       // radio.style.display = 'none';
    //       radio.onchange = () => {
    //         if (activeButton) {
    //           activeButton.classList.remove('buttonChecked');
    //         }
    //         activeButton = button;
    //         activeButton.classList.add('buttonChecked');
    //         localStorage.setItem('image', radio.value)
    //         const obj = {
    //           image: radio.value,
    //           texture: PIXI.Texture.from(`${radio.value}`),
    //           info: radio.info,
    //           price: radio.price,
    //         };
    //         // localStorage.setItem('firstRender', JSON.stringify(true))
    //         setData(obj);
    //       };

    //       ref.current.appendChild(radio);

    //       ref.current.appendChild(label);
    //     });
    //   }
    // )
  }, []);

  return (
    <>
      <div>
        {fbData ? Object.keys(fbData.tables).map((key) => (Array.from(fbData.tables[key])
          .map((item) => (
            console.log(item)
            // <buttonItem
            //   key={`key${item.id}`}
            //   image={item.image}
            // />
          ))
        )) : console.log('false')}
      </div>
      {/* <AdminTableRender data={data} bgImage={bgImage} tables={tables} updateTables={updateTables}/> */}
    </>
  );
}

export default AdminPanelTableRender