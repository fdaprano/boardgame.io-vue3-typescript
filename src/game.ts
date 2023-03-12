import type { Game } from "boardgame.io";
import { clickCell } from "./game-logic/moves/click-cell";

export interface MyGameState {
    cells: Array<String | null>;
}

export const MyGame: Game<MyGameState> = {
    setup: ({ G, random, events }) => ({
        cells: Array(9).fill(null)
    }),
    moves: { clickCell },
    turn: {
        minMoves: 1,
        maxMoves: 1
    },
    endIf: ({ G, ctx }) => {
        if (IsVictory(G.cells)) {
            return { winner: ctx.currentPlayer };
        }
        if (G.cells.filter((c) => c === null).length == 0) {
            return { draw: true };
        }
    },
    ai: {
        enumerate: (G) => {
            let r = [];
            for (let i = 0; i < 9; i++) {
                if (G.cells[i] === null) {
                    r.push({ move: 'clickCell', args: [i] });
                }
            }
            return r;
        },
    },
}

function IsVictory(cells: Array<String | null>) {
    const positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const isRowComplete = (row: Array<number>) => {
        const symbols = row.map((i) => cells[i]);
        return symbols.every((i) => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some((i) => i === true);
}
