/* eslint-disable */

export default function addAdminOptions(container, table) {
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
    });

  return container;
}
