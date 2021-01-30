/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import addAdminOptions from './addAdminOptions';

export default function AdminTableRender(props) {

  const ref = useRef(null);

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x5BBA6F,
  });
  
  useEffect(() => {
    
    const bgImage = PIXI.Texture.from(`${props.bgImage}`);
    
    console.log('1 1');
    
    ref.current.appendChild(app.view);
    app.start();

    const background = new PIXI.Sprite(bgImage); 
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;


    const mousePosition = new PIXI.Point();
    
    app.view.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
    }, false);
    
    app.rightMouse = false;
    app.view.onmousedown = (ev) => {
      if (ev.which === 3) {
        app.rightMouse = true;
      }
    };
    app.view.onmouseup = (ev) => {
      if (ev.which === 3) {
        app.rightMouse = false;
      }
    };

    app.view.onmousewheel = (ev) => {
      mousePosition.set(ev.layerX, ev.layerY);
      const found = app.renderer.plugins.interaction.hitTest(
        mousePosition,
        app.stage,
      );
      if (found) {
        found.emit('scroll', ev);
      }
    };

    app.view.onclick = (ev) => {
      const img = localStorage.getItem('image')

      mousePosition.set(ev.layerX, ev.layerY);
      const found = app.renderer.plugins.interaction.hitTest(
        mousePosition,
        app.stage,
      );
      if (!found) {
        const container = new PIXI.Container();
        container.type = 'container';
        container.interactive = true;
        container.buttonMode = true;

        container.x = ev.layerX;
        container.y = ev.layerY;

        const texture = PIXI.Texture.from(img)
        const table = new PIXI.Sprite(texture);
        table.type = 'table';

        table.anchor.set(0.5);
        table.scale.set(0.7);

        table.buttonMode = true;
        table.interactive = true;

        table
          .on('scroll', (e) => {
            if (app.rightMouse) {
              if (e.deltaY > 0) {
                table.rotation += 0.261799;
                if (table.rotation > 6.28) {
                  table.rotation = 0;
                }
              } else {
                table.rotation -= 0.261799;
                if (table.rotation < -6.28) {
                  table.rotation = 0;
                }
              }
            } else if (e.deltaY > 0) {
              table.scale.x *= 1.1;
              table.scale.y *= 1.1;
            } else {
              table.scale.y /= 1.1;
              table.scale.x /= 1.1;
            }
          });

        table.index = app.stage.children.length;
        container.addChild(table);

        const containerWithOptions = addAdminOptions(container, table);

        const text = new PIXI.Text(table.index,
          {
            font: '2rem',
            fill: 0x000000,
            align: 'center',
            cacheAsBitmap: true,
          });
        text.type = 'text';
        text.anchor.set(0.5);
        containerWithOptions.addChild(text);

        app.stage.addChild(containerWithOptions);
      }
    };

    
      return () => {
        // localStorage.setItem('firstRender', JSON.stringify(false))
        const arr = props.tables ? props.tables : []
        app.stage.children.map((el) => {
          if (el.type === 'container') {
            arr.push(el)
          }
        })
        // if (JSON.parse(localStorage.getItem('firstRender'))) {
          props.updateTables(arr)
        // }
        app.stop();
    };
  }, []);

  return (<>
    <div ref={ref} />
  </>);
}
