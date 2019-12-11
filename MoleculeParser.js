class MoleculeParser {
  static _getNumber(formula, start) {
    let number = '';
    let index = 0;

    const { groups } = /^(?<value>\d+)/.exec(formula.substr(start)) || {};

    if (groups) {
      number = groups.value;
      index = number.length;
    }

    return {
      number: parseInt(number),
      skip: index,
    };
  }

  static _determineAtom(formula, index = 0) {
    const atomHash = {};

    while (index < formula.length) {
      let hash = {};

      if (formula[index] === '(' || formula[index] === '[' || formula[index] === '{') {
        ({ atomHash: hash, index } = MoleculeParser._determineAtom(formula, index + 1));
        index += 1;
      } else if (formula[index] === ')' || formula[index] === ']' || formula[index] === '}') {
        return { atomHash, index };
      } else {
        const { groups } = /(?<atom>[A-Z][a-z]?)/.exec(formula.substr(index, 2));
        hash[groups.atom] = 1;
        index += groups.atom.length;
      }

        const { number, skip } = MoleculeParser._getNumber(formula, index);
        if (number > 0) {
          Object.keys(hash).forEach((key) => {
          hash[key] *= number;
        });
        index += skip;
      }

      Object.keys(hash).forEach((key) => {
        if (atomHash[key]) {
          atomHash[key] += hash[key];
        } else {
          atomHash[key] = hash[key];
        }
      });
    }

    return { atomHash, index };
  }

  static parse(molecule) {
    const { atomHash } = MoleculeParser._determineAtom(molecule);
    return atomHash;
  }
}

module.exports = {
  MoleculeParser,
};
