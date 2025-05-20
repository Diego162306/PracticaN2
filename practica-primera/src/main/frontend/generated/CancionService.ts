import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
import type Cancion_1 from "./practica/primera/com/base/models/Cancion.js";
import type TipoArchivoEnum_1 from "./practica/primera/com/base/models/TipoArchivoEnum.js";
async function createCancion_1(nombre: string | undefined, id_genero: number | undefined, duracion: number | undefined, url: string | undefined, tipo: TipoArchivoEnum_1 | undefined, id_album: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("CancionService", "createCancion", { nombre, id_genero, duracion, url, tipo, id_album }, init); }
async function lisAll_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CancionService", "lisAll", {}, init); }
async function lisAllCancion_1(init?: EndpointRequestInit_1): Promise<Array<Cancion_1 | undefined> | undefined> { return client_1.call("CancionService", "lisAllCancion", {}, init); }
async function listTipoArchivo_1(init?: EndpointRequestInit_1): Promise<Array<string | undefined> | undefined> { return client_1.call("CancionService", "listTipoArchivo", {}, init); }
async function listaAlbumCombo_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CancionService", "listaAlbumCombo", {}, init); }
async function listaGeneroCombo_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CancionService", "listaGeneroCombo", {}, init); }
async function updateCancion_1(id: number | undefined, nombre: string | undefined, id_genero: number | undefined, duracion: number | undefined, url: string | undefined, tipo: TipoArchivoEnum_1 | undefined, id_album: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("CancionService", "updateCancion", { id, nombre, id_genero, duracion, url, tipo, id_album }, init); }
export { createCancion_1 as createCancion, lisAll_1 as lisAll, lisAllCancion_1 as lisAllCancion, listaAlbumCombo_1 as listaAlbumCombo, listaGeneroCombo_1 as listaGeneroCombo, listTipoArchivo_1 as listTipoArchivo, updateCancion_1 as updateCancion };
