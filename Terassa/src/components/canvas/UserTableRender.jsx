/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import isNode from 'detect-node'
import plan from '../../images/canvas/floorPlan.png'

const userTableRender = ({ 
   fbData, busyTables
   
}) => { 
   const [loadedTables, loadTables] = useState(0);
   const ref = useRef(null)

   console.log('ut',busyTables)

   useEffect(() => {
      const load = async () => {
         const result = await firebase.database().ref('saved-tables').once('value').then((snapshot) => snapshot.val());
         loadTables(result);
      };
      load();
   }, []);

   function createCanvas() {
      document.getElementById('wrapper').innerHTML = ''
      let PIXI
      if (!isNode) {
         PIXI = require('pixi.js')
      }
      console.log(PIXI)

      const app = new PIXI.Application({
         width: 1000,
         height: 620,
         backgroundColor: 0x5BBA6F,
      });

      ref.current.appendChild(app.view);

      const backgroundImage = PIXI.Texture.from(plan);
      const background = new PIXI.Sprite(backgroundImage);
      app.stage.addChild(background);
      background.width = app.screen.width;
      background.height = app.screen.height;

      if (loadedTables !== null) {
         let activeTable;

         loadedTables.map(el => {
            const container = new PIXI.Container();
            container.type = 'container'

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
            

            if (Object.values(busyTables).includes(`${table.uniqueId}`)) {
               table.buttonMode = false;
               table.interactive = false;
               table.tint = 0xcccccc;
               table.alpha = 0.2;
            } else {
               table.buttonMode = true;
               table.interactive = true;
               table.tint = 0x808080;
               table.alpha = 0.7;
            }

            container.addChild(table)

            table
               .on('pointertap', (ev) => {
                  console.log(busyTables, table.uniqueId)
                  if (activeTable) {
                     activeTable.tint = 0x808080;
                     activeTable.alpha = 0.7;
                  }
                  activeTable = ev.target;
                  activeTable.tint = 0xFFFFFF;
                  activeTable.alpha = 1;

                  fbData.forEach(el => {
                     if (table.id === el.id) {
                        const discription = el.description
                        const price = el.price

                        const tableInfo = document.getElementById('tableInfo')
                        tableInfo.innerHTML = `
                           <p>Table №:${table.index}</p>
                           <p>Description:${discription}</p>
                           <p>Table price:${price}</p>
                        `;
                     }
                  })
                  localStorage.setItem('choosenTable', table.uniqueId)
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
   }

   if (loadedTables !== 0) {
      createCanvas()
   }

      return <>
         <div ref={ref} id='wrapper'></div>
      </>;
   
};

export default userTableRender;
