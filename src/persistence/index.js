import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sessions.db');

export const initSQLiteDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);',
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const insertSession = ({ email, localId, token }) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO sessions (localId,email, token) VALUES (?, ?, ?);',
        [localId, email, token], // parameters
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const getSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * from sessions',
        [], // parameters
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const truncateSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM sessions',
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};