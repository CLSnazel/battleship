const {assert} = require('chai');
const {battleBoard} = require('../mvp/battleBoard');

describe('board validateMove():', () => {
  it('should return coordinates on valid tiles', () => {
    assert.deepEqual(battleBoard.validateMove("B3"), [2,1]);
  }); 
  it('should return coordinates on valid tiles', () => {
    assert.deepEqual(battleBoard.validateMove("A10"), [9,0]);
  }); 
  it('should return undefined on invalid tiles', () => {
    assert.strictEqual(battleBoard.validateMove("K3"), undefined);
  }); 
  it('should return undefined on invalid tiles', () => {
    assert.strictEqual(battleBoard.validateMove("something bad"), undefined);
  }); 
  it('should return undefined on invalid tiles', () => {
    assert.strictEqual(battleBoard.validateMove("1B"), undefined);
  }); 
});

