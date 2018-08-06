import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  it('should destroy any block clicked on', () => {
    const gridEl = document.createElement('div');
    const grid = new BlockGrid(2, 2, gridEl);

    const block = grid.grid[0][0];
    document.body.appendChild(gridEl);
    grid.render();

    const clickEvent = new Event('click');
    const blockElement = document.getElementById('block_0x0');

    blockElement.dispatchEvent(clickEvent);

    expect(block.exists).toBe(false);
  });

  it('should also destroy any touching block of the same colour as the block clicked on', () => {
    const gridEl = document.createElement('div');
    const grid = new BlockGrid(2, 2, gridEl);
    grid.grid.forEach(column => {
      column.forEach(block => {
        block.colour = 'blue';
      });
    });

    document.body.appendChild(gridEl);
    grid.render(gridEl);

    const clickEvent = new Event('click');
    const blockElement = document.getElementById('block_0x0');

    blockElement.dispatchEvent(clickEvent);

    grid.grid.forEach(column => {
      column.forEach(block => {
        expect(block.exists).toBe(false);
      });
    });
  });

  it('should sort blocks before rendering, so destroyed ones are at the top of a column (last in the array)', () => {
    const gridEl = document.createElement('div');
    const grid = new BlockGrid(5, 5, gridEl);

    const block = grid.grid[2][2];

    block.destroy();
    grid.sortAndUpdateBlocks();

    expect(block.x).toBe(2);
    expect(block.y).toBe(4);
  });
});
