<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Client } from 'boardgame.io/client';
import type { Ctx } from "boardgame.io";
import { MyGame, type MyGameState } from "@/game";

let bgio: { G: MyGameState | null, ctx: Ctx | null } = { G: null, ctx: null };
const myGameState = ref(bgio);

class TicTacToeClient {
  client: any;
  constructor() {
    this.client = Client({ game: MyGame });
    this.client.start();
  }
}

const bgioApp = new TicTacToeClient();

bgioApp.client.subscribe((state: any) => {
  myGameState.value.G = state.G;
  myGameState.value.ctx = state.ctx;
});

function onCellClick(cellId: number) {
  bgioApp.client.moves.clickCell(cellId);
}
</script>

<template>
  <main>
    <h1>Vue3 + Typescript + Boardgame.io</h1>
    <h3>Tic Tac Toe example</h3>
    <div>
      <table id="board">
        <tbody>
          <tr v-for="i in [0, 1, 2]">
            <td v-for="j in [0, 1, 2]" @click="onCellClick(i * 3 + j)">
              {{ myGameState.G?.cells[i * 3 + j] }}
            </td>
          </tr>
        </tbody>
      </table>
      <p>Current turn: Player {{ myGameState.ctx?.currentPlayer }}</p>
      <p v-if="myGameState.ctx?.gameover?.winner">Player {{ myGameState.ctx.gameover.winner }} wins!</p>
      <p v-if="myGameState.ctx?.gameover?.draw">Draw!</p>
    </div>
  </main>
</template>
