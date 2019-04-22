import HandsContainer from './HandsContainer.js'

const flush = ['2H', '3H', '4H', '8H', 'KH']


test('isFlush should return true if each card in a hand has the same suit', () => {
  expect(isFlush(flush)).toBe(true);
});
