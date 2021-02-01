/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import * as PIXI from 'pixi.js';

const userTableRender = ({ 
   bgImage, fbData
}) => { 
   const [answer, setData] = useState(0);
   const [loadedTables, loadTables] = useState(0);

   useEffect(() => {
      const fetchData = async () => {
         const storage = firebase.storage();
         const storageRef = storage.ref();
         const imgURL = storageRef.child(`${bgImage}`);
         // Get the download URL
         imgURL.getDownloadURL().then((result) => {
            setData(result);
         });
      };
      const load = async () => {
         const result = await firebase.database().ref('saved-tables').once('value').then((snapshot) => snapshot.val());
         loadTables(result);
      };
      fetchData();
      load();
   }, []);

   function createCanvas() {
      const canvas = document.getElementById('canvasWrapper')

      const app = new PIXI.Application({
         width: 1000,
         height: 620,
         backgroundColor: 0x5BBA6F,
      });

      canvas.innerHTML = '';
      canvas.appendChild(app.view);

      const backgroundImage = PIXI.Texture.from(answer);
      const background = new PIXI.Sprite(backgroundImage);
      app.stage.addChild(background);
      background.width = app.screen.width;
      background.height = app.screen.height;

      if (loadedTables !== null) {
         let activeTable;

         loadedTables.map(el => {
            const container = new PIXI.Container();
            container.type = 'container'
            container.interactive = true;
            container.buttonMode = true;

            container.x = el.x;
            container.y = el.y;

            const texture = PIXI.Texture.from(el.texture)
            const table = new PIXI.Sprite(texture);
            table.type = 'table'
            table.index = el.index;
            table.id = el.id
            table.uniqueId = el.uniqueId
            table.info = el.info;

            table.anchor.set(0.5);
            table.scale.x = el.scaleX;
            table.scale.y = el.scaleY;
            table.rotation = el.rotation;

            table.buttonMode = true;
            table.interactive = true;

            table.tint = 0x808080;
            table.alpha = 0.7;

            container.addChild(table)

            table
               .on('pointertap', (ev) => {
                  if (activeTable) {
                     activeTable.tint = 0x808080;
                     activeTable.alpha = 0.7;
                  }

                  activeTable = ev.target;
                  activeTable.tint = 0xFFFFFF;
                  activeTable.alpha = 1;

                  fbData.forEach(el => {
                     if (table.id === el.id) {
                        console.log('description', el.description)
                        console.log('price', el.price)
                     }
                  })

               });

            const text = new PIXI.Text(el.index,
               {
                  font: '2rem',
                  fill: 0x000000,
                  align: 'center',
                  cacheAsBitmap: true,
               });
            text.type = 'text'
            text.anchor.set(0.5);
            container.addChild(text);

            app.stage.addChild(container)
         })
      } else {
         const errorMessage = new PIXI.Text('Sorry, it is not possible to book a table at the moment. \nPlease contact the administrator',
            {
               font: '2rem',
               fill: 0xFFFFFF,
               align: 'center',
               cacheAsBitmap: true,
            });
         errorMessage.width = 800;
         errorMessage.height = 150;
         errorMessage.type = 'text'
         errorMessage.anchor.set(0.5);
         errorMessage.x = app.screen.width / 2;
         errorMessage.y = app.screen.height / 2;

         background.tint = 0x979797;

         background.addChild(errorMessage)
      }



      if (!localStorage.getItem('state')) {
         ReactDOM.render(canvas, document.getElementById('canvasWrapper'))
      }
   }

   


   if (answer !== 0 && loadedTables !== 0) {
      createCanvas()
      localStorage.setItem('state', 'loaded')
   }

   return <>
   </>;

};

export default userTableRender;
