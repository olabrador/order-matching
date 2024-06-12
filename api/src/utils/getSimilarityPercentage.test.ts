import getSimilarityPercentage from './getSimilarityPercentage';

describe('getSimilarityPercentage', () => {
  it('should return 100% since strings are identical', () => {
    const str1 = 'hello';
    const str2 = 'Hello';
    const expected = 100; // 100% similarity as both strings are identical

    const result = getSimilarityPercentage(str1, str2);
    expect(result).toBe(expected);
  });

  it('should return high similarity since the words are very similar', () => {
    const str1 = 'Brian';
    const str2 = 'Bryan';
    const expected = 80;

    const result = getSimilarityPercentage(str1, str2);
    expect(result).toBeGreaterThanOrEqual(expected);
  });

  it('should return good match even when multiple spacing an extra letters', () => {
    const str1 = 'Americ        Elm fhhy';
    const str2 = 'American Elm';
    const expected = 70;

    const result = getSimilarityPercentage(str1, str2);
    expect(result).toBeGreaterThanOrEqual(expected);
  });

  it('should return somewhat similar', () => {
    const str1 = '12OB-1';
    const str2 = 'L2OB-I';
    const expected = 60;

    const result = getSimilarityPercentage(str1, str2);
    expect(result).toBeGreaterThanOrEqual(expected);
  });

  it('should return low similarity since the words are different', () => {
    const str1 = 'hello';
    const str2 = 'world';
    const expected = 30;

    const result = getSimilarityPercentage(str1, str2);
    expect(result).toBeLessThanOrEqual(expected);
  });

  it('should return almost 0 for completely different words', () => {
    const str1 = 'dsfsdf';
    const str2 = 'pqow5';
    const expected = 0; // 0% similarity as both strings are completely different

    const result = getSimilarityPercentage(str1, str2);
    expect(result).toBe(expected);
  });
});
