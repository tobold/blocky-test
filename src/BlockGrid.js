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

    this.constructGrid(this.grid, this.width, this.height);
  }

  render() {
    this.removeAllChildElements(this.gridEl);
    this.sortAndUpdateBlocks();
    this.renderColumns(this.width);
  }

  renderColumns(numberOfColumns) {
    for (let x = 0; x < numberOfColumns; x++) {
      const colEl = document.createElement('div');
      colEl.id = 'col_' + x;
      colEl.className = 'col';
      this.gridEl.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.exists ? block.colour : 'transparent';
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  blockClicked(e, block) {
    block.destroy();
    this.recursivelyDestroyTouchingBlocks(block);
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

  sortAndUpdateBlocks() {
    this.sortColumns(this.grid);
    this.updateBlockCoords(this.grid, this.width, this.height);
  }

  removeAllChildElements(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  sortColumns(grid) {
    grid.forEach(column => {
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
  }

  updateBlockCoords(grid, width, height) {
    for (let x = 0; x < width; x++) {
      for (let y = height - 1; y >= 0; y--) {
        const block = grid[x][y];
        block.updateCoords(x, y);
      }
    }
  }

  constructGrid(grid, width, height) {
    for (let x = 0; x < width; x++) {
      const col = [];
      for (let y = 0; y < height; y++) {
        col.push(new Block(x, y));
      }

      grid.push(col);
    }
  }
}

export default BlockGrid;
