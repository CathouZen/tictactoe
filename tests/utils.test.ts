import { areAllTheSame, randomPick } from '../src/utils';

describe('randomPick()', () => {
    it('Returns a value from the array', () => {
        expect(randomPick([])).toBe(undefined);
        expect(randomPick([1])).toBe(1);

        const rndMock = jest.spyOn(Math, 'random').mockImplementation();

        rndMock.mockReturnValue(0.2);
        expect(randomPick([1, 2, 3, 4, 5])).toBe(2);
        expect(rndMock).toHaveBeenCalledTimes(1);

        rndMock.mockRestore();
    });
});

describe('areAlltheSame()', () => {
    it('Considers empty list as all the same', () => {
        expect(areAllTheSame([])).toBe(true);
    });

    it('Works for numbers', () => {
        expect(areAllTheSame([3, 3, 3])).toBe(true);
        expect(areAllTheSame([3, 1, 2])).toBe(false);
    });

    it('Works for strings', () => {
        expect(areAllTheSame(['a', 'a', 'a'])).toBe(true);
        expect(areAllTheSame(['a', 'b', 'c'])).toBe(false);
    });

    it('Does not get confused by mixed types', () => {
        expect(areAllTheSame(['1', 1])).toBe(false);
        expect(areAllTheSame([undefined, null])).toBe(false);
    });

    it('Considers objects by identity', () => {
        const obj1 = { a: 13 };
        const obj2 = { a: 13 };

        expect(areAllTheSame([obj1, obj1, obj1])).toBe(true);
        expect(areAllTheSame([obj1, obj2])).toBe(false);
    });
});
