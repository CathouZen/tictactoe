import {
    scoreGame,
    startingBoard,
    nextMove,
    advanceGame,
    GameBoard,
    printBoard
} from '../src/tictactoe';

describe('Test scoreGame function', () => {
    it('Corectly handles initial game state', () => {
        expect(scoreGame(startingBoard)).toBe(' ');
    });

    it('Can find horizontal win', () => {
        expect(
            scoreGame([
                ['X', ' ', ' '],
                ['X', 'O', 'X'],
                ['O', 'O', 'O']
            ])
        ).toBe('O');
    });

    it('Can find vertical win', () => {
        expect(
            scoreGame([
                ['X', ' ', ' '],
                ['X', 'O', 'X'],
                ['X', 'O', 'O']
            ])
        ).toBe('X');
    });

    it('Can find diagonal win', () => {
        expect(
            scoreGame([
                ['X', ' ', 'X'],
                [' ', 'X', 'O'],
                ['X', 'O', 'O']
            ])
        ).toBe('X');

        expect(
            scoreGame([
                ['X', ' ', 'O'],
                [' ', 'X', 'O'],
                ['X', 'O', 'X']
            ])
        ).toBe('X');
    });

    it('Finds Draw games', () => {
        expect(
            scoreGame([
                ['X', 'O', 'X'],
                ['X', 'O', 'X'],
                ['O', 'X', 'O']
            ])
        ).toBe('-');
    });

    it('Finds continuing games', () => {
        expect(
            scoreGame([
                ['X', 'O', ' '],
                ['X', 'O', 'X'],
                ['O', 'X', 'O']
            ])
        ).toBe(' ');
    });
});

describe('Test nextMove()', () => {
    it('Finds a move in reasonable time', () => {
        nextMove('X', [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]);
    });

    it('has no more legal move', () => {
        expect(() => {
            nextMove('O', [
                ['X', 'O', 'X'],
                ['X', 'O', 'O'],
                ['O', 'X', 'X']
            ]);
        }).toThrow();
    });

    it('Finds easy solutions', () => {
        const boards = [
            {
                board: [
                    [' ', ' ', 'O'],
                    [' ', 'X', 'O'],
                    [' ', ' ', 'X']
                ],
                solution: [0, 0]
            },
            {
                board: [
                    [' ', ' ', 'O'],
                    [' ', ' ', 'O'],
                    [' ', 'X', 'X']
                ],
                solution: [2, 0]
            },
            {
                board: [
                    [' ', 'O', ' '],
                    [' ', 'X', 'O'],
                    ['X', 'X', 'O']
                ],
                solution: [0, 2]
            }
        ];

        expect(nextMove('X', boards[0].board as GameBoard)).toEqual(
            boards[0].solution
        );
        expect(nextMove('X', boards[1].board as GameBoard)).toEqual(
            boards[1].solution
        );
        expect(nextMove('X', boards[2].board as GameBoard)).toEqual(
            boards[2].solution
        );
    });

    it('Finds solution two moves ahead', () => {
        expect([
            [1, 0],
            [2, 0],
            [0, 2]
        ]).toContainEqual(
            nextMove('O', [
                ['O', 'X', ' '],
                [' ', 'O', ' '],
                [' ', ' ', 'X']
            ] as GameBoard)
        );
    });
});

describe('Test advanceGame()', () => {
    it('updates the board', () => {
        expect(
            advanceGame(
                'O',
                [1, 1],
                [
                    ['X', ' ', 'X'],
                    [' ', ' ', 'O'],
                    ['X', 'O', 'O']
                ]
            )
        ).toEqual([
            ['X', ' ', 'X'],
            [' ', 'O', 'O'],
            ['X', 'O', 'O']
        ]);
    });
    it('checks if board position is empty', () => {
        expect(() =>
            advanceGame(
                'O',
                [1, 1],
                [
                    ['X', ' ', 'X'],
                    [' ', 'O', 'O'],
                    ['X', 'O', 'O']
                ]
            )
        ).toThrow();
    });
    it('does not alter original board', () => {
        const board: GameBoard = [
            ['X', ' ', 'X'],
            [' ', ' ', 'O'],
            ['X', 'O', 'O']
        ];
        advanceGame('O', [1, 1], board);
        expect(board).toEqual([
            ['X', ' ', 'X'],
            [' ', ' ', 'O'],
            ['X', 'O', 'O']
        ]);
    });
});

describe('Test printBoard', () => {
    it('outputs to the console', () => {
        const spyLog = jest.spyOn(console, 'log');

        printBoard(startingBoard);

        expect(spyLog).toHaveBeenCalled();
    });
});
