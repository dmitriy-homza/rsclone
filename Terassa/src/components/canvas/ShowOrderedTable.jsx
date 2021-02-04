/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import isNode from 'detect-node'
import plan from '../../images/canvas/floorPlan.png'

const userTableRender = ({
   tables

}) => {
   const [loadedTables, loadTables] = useState(0);
   const ref = useRef(null)
   const state = 'Unactive'

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

      const app = new PIXI.Application({
         width: 1000,
         height: 620,
         backgroundColor: 0xf8f9fa,
      });

      ref.current.appendChild(app.view);

      const backgroundImage = PIXI.Texture.from(plan);
      const background = new PIXI.Sprite(backgroundImage);
      app.stage.addChild(background);
      background.width = app.screen.width;
      background.height = app.screen.height;
      console.log(tables)

      if (loadedTables !== null ) {

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


            if (`${table.uniqueId}` === tables) {
               table.tint = 0xFFFFFF;
               table.alpha = 1;
               state = 'Active'
            } else {
               table.tint = 0xcccccc;
               table.alpha = 0.2;
            }

            container.addChild(table)

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
      } 
      if (state === 'Unactive' ) {
         const errorMessage = new PIXI.Text('Sorry, we can\'t show your table. \n Please contact with Administrator',
            {
               font: '2rem',
               fill: 0xFFFFFF,
               align: 'center',
               cacheAsBitmap: true,
            });
         errorMessage.width = 600;
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
