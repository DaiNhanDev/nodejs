import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, update, push } from 'firebase/database';

import { firebaseConfig } from "../configs/firebase";

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const createItem = (path, body) => push(ref(database, path), body);
export const updateItem = (path, body) => update(ref(database, path), body);
export const removeItem = (path) => remove(ref(database, `${path}`));

export * from 'firebase/database';