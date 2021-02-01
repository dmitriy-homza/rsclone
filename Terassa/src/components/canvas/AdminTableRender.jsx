/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import * as PIXI from 'pixi.js';



const AdminTableRender = ({ 
    bgImage
  }) => {

  const [answer, setData] = useState(0);
  const [loadedTables, loadTables] = useState(0);
  let currentContainer;
  let currentTable;

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
    console.log(loadedTables)
    function removeChild() {
      if (currentContainer) {
        app.stage.removeChild(currentContainer)
        currentContainer = undefined
      }
      
    }
    function writeNewAdditions(tables) {
      firebase.database().ref('saved-tables').set(tables);
    }

    function saveStage() {
      const items = app.stage.children.filter((el) => el.type === 'container');

      const arr = [];

      items.map(el => {
        el.children.map(underEl => {
          if (underEl.type === 'table') {
            console.log(underEl)
            const obj = {}
            obj.index = underEl.index;
            obj.x = el.x;
            obj.y = el.y;
            obj.scaleX = underEl.scale.x;
            obj.scaleY = underEl.scale.y;
            obj.rotation = underEl.transform.rotation;
            obj.texture = underEl._texture.textureCacheIds[0];
            obj.unqueId = underEl.uniqueId;
            obj.id = underEl.id;
            arr.push(obj)
          }
        })
      })

      localStorage.setItem('tables', JSON.stringify(arr));
      localStorage.setItem('bgImage', answer);
      writeNewAdditions(arr)
    }
    const app = new PIXI.Application({
      width: 1000,
      height: 620,
      backgroundColor: 0x5BBA6F,
    });

    const canvas = document.getElementById('canvasWrapper')

    const backgroundImage = PIXI.Texture.from(answer);
    const background = new PIXI.Sprite(backgroundImage);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    canvas.innerHTML = ''
    canvas.appendChild(app.view)

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
            table.tint = 0x828272;
          })
          .on('pointerout', () => {
            table.tint = 0xFFFFFF;
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
            currentContainer = ev.target.parent;
            currentTable = ev.target;
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

    const saveButton = new PIXI.Text('Save',
      {
        font: '4rem',
        fill: 0x000000,
        align: 'center',
        cacheAsBitmap: true,
      });
    saveButton.interactive = true;
    saveButton.buttonMode = true;
    saveButton.type = 'button';
    saveButton.anchor.set(0.5);
    saveButton.x = 40
    saveButton.y = 20
    saveButton
      .on('pointertap', () => {
        saveStage();
      });
    app.stage.addChild(saveButton);
    const removeButton = new PIXI.Text('Remove',
      {
        font: '4rem',
        fill: 0x000000,
        align: 'center',
        cacheAsBitmap: true,
      });
    removeButton.interactive = true;
    removeButton.buttonMode = true;
    removeButton.type = 'button';
    removeButton.anchor.set(0.5);
    removeButton.x = 40
    removeButton.y = 50
    removeButton
      .on('pointertap', () => {
        removeChild();
      });
    app.stage.addChild(removeButton);

    app.view.onclick = (ev) => {
      const currentMode = JSON.parse(localStorage.getItem('currentMode'))
      if (currentMode && currentMode.mode === 'create') {
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
              table.tint = 0x828272;
            })
            .on('pointerout', () => {
              table.tint = 0xFFFFFF;
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
              currentContainer = ev.target.parent;
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

  if (answer !== 0 && loadedTables !== 0) {
      createCanvas()
      localStorage.setItem('state','loaded')
    } 

  return <>
  </>;
}

export default AdminTableRender