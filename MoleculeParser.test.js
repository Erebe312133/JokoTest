const { MoleculeParser } = require('./MoleculeParser');

describe('MoleculeParser', () => {
  describe('#determineAtom', () => {
    test('Should parse basic molecule', () => {
      expect(MoleculeParser.parse('H2O')).toEqual({
        'H': 2,
        'O': 1,
      });
    });
    test('Should parse molecule with round bracket', () => {
      expect(MoleculeParser.parse('C(OH)2')).toEqual({
        'C': 1,
        'O': 2,
        'H': 2,
      });
    });
    test('Should parse molecule with square bracket', () => {
      expect(MoleculeParser.parse('C[OH]2')).toEqual({
        'C': 1,
        'O': 2,
        'H': 2,
      });
    });
    test('Should parse molecule with curly bracket', () => {
      expect(MoleculeParser.parse('C{OH}2')).toEqual({
        'C': 1,
        'O': 2,
        'H': 2,
      });
    });
    test('Should parse molecule with bracket', () => {
      expect(MoleculeParser.parse('C(OH)2')).toEqual({
        'C': 1,
        'O': 2,
        'H': 2,
      });
    });
    test('Should parse molecule with two characters atom', () => {
      expect(MoleculeParser.parse('Mg2OH')).toEqual({
        'Mg': 2,
        'O': 1,
        'H': 1,
      });
    });
    test('Should parse molecule with recursive bracket', () => {
      expect(MoleculeParser.parse('K4[ON(SO3)2]2')).toEqual({
        'K': 4,
        'O': 14,
        'N': 2,
        'S': 4,
      });
    });
  });
});