import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
import type Album_1 from "./practica/primera/com/base/models/Album.js";
async function createAlbum_1(nombre: string | undefined, fecha: string | undefined, id_Banda: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("AlbumService", "createAlbum", { nombre, fecha, id_Banda }, init); }
async function lisAll_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("AlbumService", "lisAll", {}, init); }
async function lisAllAlbum_1(init?: EndpointRequestInit_1): Promise<Array<Album_1 | undefined> | undefined> { return client_1.call("AlbumService", "lisAllAlbum", {}, init); }
async function listaBandombo_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("AlbumService", "listaBandombo", {}, init); }
async function updateAlbum_1(id: number | undefined, nombre: string | undefined, fecha: string | undefined, id_Banda: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("AlbumService", "updateAlbum", { id, nombre, fecha, id_Banda }, init); }
export { createAlbum_1 as createAlbum, lisAll_1 as lisAll, lisAllAlbum_1 as lisAllAlbum, listaBandombo_1 as listaBandombo, updateAlbum_1 as updateAlbum };
