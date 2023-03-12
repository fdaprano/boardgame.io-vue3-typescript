import type { MyGameState } from "@/game";
import type { Move } from "boardgame.io";

export const clickCell: Move<MyGameState> = ({G, ctx, playerID}, id) => {
    const cells = [...G.cells];

    if (cells[id] === null) {
      cells[id] = playerID;
      return { ...G, cells };
    }    
}