import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
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
    const grid = new BlockGrid(2, 2);
    const block = grid.grid[0][0];

    const gridEl = document.createElement('div');
    document.body.appendChild(gridEl);
    grid.render(gridEl);

    const clickEvent = new Event('click');
    const blockElement = document.getElementById('block_0x0');

    blockElement.dispatchEvent(clickEvent);

    expect(block.exists).toBe(false);
  });
});
