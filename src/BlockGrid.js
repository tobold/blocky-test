import Block from './Block';

class BlockGrid {
  constructor(
    width = 10,
    height = 10,
    gridEl = document.getElementById('gridEl')
  ) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.gridEl = gridEl;

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = this.gridEl) {
    this.sortBlocks();
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.exists ? block.colour : 'grey';
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  clearGrid(el = this.gridEl) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  blockClicked(e, block) {
    block.destroy();
    this.recursivelyDestroyTouchingBlocks(block);
    this.clearGrid();
    this.render();
  }

  recursivelyDestroyTouchingBlocks(block) {
    const colour = block.colour;

    const touchingBlocks = [
      this.grid[block.x][block.y + 1],
      this.grid[block.x][block.y - 1],
      this.grid[block.x + 1] && this.grid[block.x + 1][block.y],
      this.grid[block.x - 1] && this.grid[block.x - 1][block.y],
    ];

    touchingBlocks.forEach(block => {
      if (block && block.exists && block.colour === colour) {
        this.blockClicked(new Event('click'), block);
      }
    });
  }

  sortBlocks() {
    this.grid.forEach(column => {
      column.sort((a, b) => {
        if (a.exists && !b.exists) {
          return -1;
        } else if (!a.exists && b.exists) {
          return 1;
        } else {
          return 0;
        }
      });
    });

    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        block.updateCoods(x, y);
      }
    }
  }
}

export default BlockGrid;
