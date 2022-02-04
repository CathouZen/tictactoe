import { areAllTheSame, randomPick } from './utils';

type Player = 'X' | 'O';
type Move = [number, number];
type Cell = Player | ' ';
type Row = [Cell, Cell, Cell];
export type GameBoard = [Row, Row, Row];
type GameState = Player | ' ' | '-';

/**
 * The state of the board at the start of the game
 */
export const startingBoard: GameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

/**
 * Copy current board and add a new move
 * @returns a new Board
 */
export const advanceGame = (
    whoPlaysNext: Player,
    move: Move,
    board: GameBoard
): GameBoard => {
    const [row, col] = move;

    if (board[row][col] !== ' ') {
        throw Error("There's already a move at that location");
    }

    const newBoard = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]]
    ] as GameBoard;

    newBoard[row][col] = whoPlaysNext;

    return newBoard;
};

/**
 * Cleanly outputs a game board on the console.
 * @param board The board to print
 */
export const printBoard = (board: GameBoard) => {
    const borders = ['╔═══╤═══╤═══╗', '╟───┼───┼───╢', '╚═══╧═══╧═══╝'];
    const rowString = (row: Row) => `║ ${row.join(' | ')} ║`;

    console.log(borders[0]);
    console.log(board.map(rowString).join(`\n${borders[1]}\n`));
    console.log(borders[2]);
};

/**
 * @return the winner or the state of the game.
 */
export const scoreGame = (board: GameBoard): GameState => {
    const N = 3;

    for (let row of board) {
        if (areAllTheSame(row) && row[0] !== ' ') {
            return row[0];
        }
    }

    for (let col = 0; col < N; ++col) {
        const colCells: Cell[] = [];

        for (let row = 0; row < N; ++row) {
            colCells.push(board[row][col]);
        }

        if (areAllTheSame(colCells) && colCells[0] !== ' ') {
            return colCells[0];
        }
    }

    const diagonal1: Cell[] = [board[0][0], board[1][1], board[2][2]];
    const diagonal2: Cell[] = [board[0][2], board[1][1], board[2][0]];

    if (areAllTheSame(diagonal1) && diagonal1[0] !== ' ') {
        return diagonal1[0];
    }
    if (areAllTheSame(diagonal2) && diagonal2[0] !== ' ') {
        return diagonal2[0];
    }

    if (getLegalMoves(board).length === 0) {
        return '-';
    }

    return ' ';
};

/**
 * Create a list of all the possible moves.
 * @return the list of legal moves.
 */
const getLegalMoves = (board: GameBoard): Move[] => {
    const result: Move[] = [];

    for (let rowId = 0; rowId < board.length; ++rowId) {
        const row = board[rowId];

        for (let cellId = 0; cellId < row.length; ++cellId) {
            if (row[cellId] === ' ') {
                result.push([rowId, cellId]);
            }
        }
    }
    return result;
};

/**
 * Randomly pick the next legal move from a list.
 * @return the next legal move or the end of the game.
 */
export const nextMove = (whoPlaysNext: Player, board: GameBoard): Move => {
    const legalMoves = getLegalMoves(board);
    if (legalMoves.length === 0) {
        throw Error("There's no more move possible.");
    }

    var bestMove: Move = legalMoves[0];
    let bestMoveScore = -Infinity;

    for (let m of legalMoves) {
        const postMoveBoard = advanceGame(whoPlaysNext, m, board);
        const moveScore = minimax(postMoveBoard, true, whoPlaysNext, 1);

        if (moveScore > bestMoveScore) {
            bestMove = m;
            bestMoveScore = moveScore;
        }
    }

    return bestMove as Move;
};

const minimax = (
    node: GameBoard,
    maximizingPlayer: boolean,
    whoIsPlaying: Player,
    depth: number
): number => {
    let score = scoreGame(node);
    if (score !== ' ') {
        if (score === '-') {
            return 0 + depth;
        }
        if (score === whoIsPlaying) {
            return 100 - depth;
        }
        return -100 + depth;
    }

    const moves = getLegalMoves(node);

    if (maximizingPlayer) {
        let maxVal = -Infinity;

        for (let m of moves) {
            const child = advanceGame(whoIsPlaying, m, node);
            const childVal = minimax(child, false, whoIsPlaying, depth + 1);
            if (childVal > maxVal) {
                maxVal = childVal;
            }
        }
        return maxVal;
    } else {
        let minVal = Infinity;
        for (let m of moves) {
            const child = advanceGame(
                whoIsPlaying === 'O' ? 'X' : 'O',
                m,
                node
            );
            const childVal = minimax(child, true, whoIsPlaying, depth + 1);
            if (childVal < minVal) {
                minVal = childVal;
            }
        }
        return minVal;
    }
};
