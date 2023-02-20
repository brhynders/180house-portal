import Pocketbase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new Pocketbase("https://180house.the180center.org");
export const house = writable();
