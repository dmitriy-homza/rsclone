/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import isNode from 'detect-node'

import plan from '../../images/canvas/floorPlan.png'
import save from '../../images/canvas/save.png';
import remove from '../../images/canvas/delete.png';


const AdminTableRender = ({ 
    bgImage
  }) => {

  // const [answer, setData] = useState(0);
  const [loadedTables, loadTables] = useState(0);
  const ref = useRef(null);
  let currentContainer;
  let currentTable;

  useEffect(() => {
    const load = async () => {
      const result = await firebase.database().ref('saved-tables').once('value').then((snapshot) => snapshot.val());
      loadTables(result);
    };
    load();
  }, []);

  function createCanvas() {
    let PIXI
    if (!isNode) {
      PIXI = require('pixi.js')
    }
    localStorage.setItem('currentMode', JSON.stringify({mode: "cursor"}))
    document.getElementById('0').checked = true

    

    function removeChild() {
      if (currentContainer) {
        app.stage.removeChild(currentContainer)
        currentContainer = undefined
        removeButton.alpha = 0;
      }
    }

    function updateIndex() {
      app.stage.children.map((el, ind) => {
        if (el.type = 'container') {
          let temp = el;
          temp.children.map(underEl => {
            if (underEl.type = 'text') {
              underEl.text = ind
            }
            if (underEl.type = 'table') {
              underEl.index = ind
            }
          })
        }
      })
    }

    function writeNewAdditions(tables) {
      firebase.database().ref('saved-tables').set(tables);
    }

    function saveStage() {
      const items = app.stage.children.filter((el) => el.type === 'container');
  
      const arr = [];

      items.forEach(el => {
        el.children.forEach(underEl => {
          if (underEl.id) {
            const obj = {}
            obj.index = underEl.index;
            obj.x = el.x;
            obj.y = el.y;
            obj.scaleX = underEl.scale.x;
            obj.scaleY = underEl.scale.y;
            obj.rotation = underEl.transform.rotation;
            obj.texture = underEl._texture.textureCacheIds[0];
            obj.uniqueId = underEl.uniqueId;
            obj.id = underEl.id;
            arr.push(obj)
          }
        })
      })

      writeNewAdditions(arr)
    }
    const app = new PIXI.Application({
      width: 1000,
      height: 620,
      backgroundColor: 0xf8f9fa,
    });

    const backgroundImage = PIXI.Texture.from(plan);
    const background = new PIXI.Sprite(backgroundImage);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    ref.current.appendChild(app.view)

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

    if (loadedTables !== null) {
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

        table.anchor.set(0.5);
        table.scale.x = el.scaleX;
        table.scale.y = el.scaleY;
        table.rotation = el.rotation;
        table.index = el.index;
        table.info = el.info;
        table.id = el.id
        table.uniqueId = el.uniqueId;

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
            }
          });
        container.addChild(table)

        container
          .on('pointerover', () => {
            if (currentContainer != container) {
              table.tint = 0x828272;
            }
          })
          .on('pointerout', () => {
            if (currentContainer != container) {
              table.tint = 0xFFFFFF;
            }
          })
          .on('pointerdown', (event) => {
            container.data = event.data;
            container.alpha = 0.5;
            container.dragging = true;
          })
          .on('pointerup', () => {
            container.alpha = 1;
            container.dragging = false;
            container.data = null;
          })
          .on('pointerupoutside', () => {
            container.alpha = 1;
            container.dragging = false;
            container.data = null;
          })
          .on('pointermove', () => {
            if (container.dragging) {
              const newPosition = container.data.getLocalPosition(container.parent);
              container.x = newPosition.x;
              container.y = newPosition.y;
            }
          })
          .on('pointertap', (ev) => {
            if (currentTable) {
              currentTable.tint = 0xFFFFFF;
            }
            currentContainer = ev.target.parent;
            currentTable = ev.target;
            currentTable.tint = 0xFF0000;
            removeButton.alpha = 1;
          });

        const text = new PIXI.Text(table.index,
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

    const saveButton = new PIXI.Sprite.from(save)
    saveButton.interactive = true;
    saveButton.buttonMode = true;
    saveButton.type = 'button';
    saveButton.anchor.set(0.5);
    saveButton.width = 64
    saveButton.height = 64
    saveButton.x = app.screen.width - 44
    saveButton.y = 40
    saveButton
      .on('pointertap', () => {
        saveStage();
      });
    app.stage.addChild(saveButton);
    const removeButton = new PIXI.Sprite.from(remove)
    removeButton.alpha = 0;
    removeButton.interactive = true;
    removeButton.buttonMode = true;
    removeButton.type = 'button';
    removeButton.anchor.set(0.5);
    removeButton.width = 64
    removeButton.height = 64
    removeButton.x = app.screen.width - 108
    removeButton.y = 40
    removeButton
      .on('pointertap', () => {
        removeChild();
        updateIndex()
      });
    app.stage.addChild(removeButton);

    app.view.onclick = (ev) => {
      const currentMode = JSON.parse(localStorage.getItem('currentMode'))
        mousePosition.set(ev.layerX, ev.layerY);
        const found = app.renderer.plugins.interaction.hitTest(
          mousePosition,
          app.stage,
        );
        if (!found) {
          if (currentMode && currentMode.mode === 'cursor') {
            if (currentTable) {
              currentTable.tint = 0xFFFFFF;
              removeButton.alpha = 0;
            }
            currentContainer = null;
            currentTable = null;
          }
          if (currentMode && currentMode.mode === 'create') {
            removeButton.alpha = 0;
          const container = new PIXI.Container();
          container.type = 'container';
          container.interactive = true;
          container.buttonMode = true;

          container.x = ev.layerX;
          container.y = ev.layerY;

          const texture = PIXI.Texture.from(currentMode.image)
          const table = new PIXI.Sprite(texture);
          table.type = 'table';
          table.id = currentMode.id
          table.uniqueId = Date.now()

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
              } 
            });

          table.index = app.stage.children.length - 2;
          container.addChild(table);

          container
            .on('pointerover', () => {
              if (currentContainer != container) {
                table.tint = 0x828272;
              }
            })
            .on('pointerout', () => {
              if (currentContainer != container) {
                table.tint = 0xFFFFFF;
              }
            })
            .on('pointerdown', (event) => {
              container.data = event.data;
              container.alpha = 0.5;
              container.dragging = true;
            })
            .on('pointerup', () => {
              container.alpha = 1;
              container.dragging = false;
              container.data = null;
            })
            .on('pointerupoutside', () => {
              container.alpha = 1;
              container.dragging = false;
              container.data = null;
            })
            .on('pointermove', () => {
              if (container.dragging) {
                const newPosition = container.data.getLocalPosition(container.parent);
                container.x = newPosition.x;
                container.y = newPosition.y;
              }
            })
            .on('pointertap', (ev) => {
              if (currentTable) {
                currentTable.tint = 0xFFFFFF;
              }
              currentContainer = ev.target.parent;
              currentTable = ev.target;
              currentTable.tint = 0xFF0000;
              removeButton.alpha = 1;
            });

          

          const text = new PIXI.Text(table.index,
            {
              font: '2rem',
              fill: 0x000000,
              align: 'center',
              cacheAsBitmap: true,
            });
          text.type = 'text';
          text.anchor.set(0.5);
          container.addChild(text);

          app.stage.addChild(container);

          if (!localStorage.getItem('state')){
            ReactDOM.render(canvas, document.getElementById('canvasWrapper'))
          }
        }
      }
    };
  }

  if ( loadedTables !== 0) {
      createCanvas()
      localStorage.setItem('state','loaded')
    } 

  return <>
    <div ref={ref}></div>
  </>;
}

export default AdminTableRender