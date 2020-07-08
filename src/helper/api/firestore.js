/* eslint-disable max-classes-per-file */
import admin from './admin';

const keys = {
  POSTS: 'posts',
  USERS: 'users',
};

class FirestoreEntry {
  constructor(key) {
    this.key = key;
    this.collection = admin.firestore().collection(key);
  }

  /**
   *
   * @param {Array || falsy} where Array in Array
   * example: [['uid', 'in', ['a', 'b']]], null, false, undefined
   * @param {Array || falsy} orderBy Array in Array
   * example: [['name', 'desc'], ['name']]
   * @param {number || falsy} limit example: 10
   */
  async lists({
    where,
    orderBy,
    limit,
    startAfter,
  }) {
    try {
      let snapshot = this.collection;
      if (where) {
        where.forEach((item) => {
          snapshot = snapshot.where(...item);
        });
      }
      if (orderBy) {
        orderBy.forEach((item) => {
          snapshot = snapshot.orderBy(...item);
        });
      }
      if (startAfter) {
        const ref = await this.collection.doc(startAfter).get();
        snapshot = snapshot.startAfter(ref);
      }
      if (limit) {
        snapshot = snapshot.limit(limit);
      }

      snapshot = await snapshot.get();

      let result = {};
      if (snapshot.empty) {
        return result;
      }
      snapshot.forEach((doc) => {
        result = ({
          ...result,
          [doc.id]: {
            id: doc.id,
            ...doc.data(),
          },
        });
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get(doc) {
    try {
      const snapshot = await this.collection.doc(doc).get();
      if (!snapshot.exists) {
        return null;
      }
      return {
        id: doc,
        ...snapshot.data(),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async set(doc, payload) {
    try {
      await this.collection.doc(doc).set(payload);
      return {
        id: doc,
        ...payload,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async increment(doc, key) {
    try {
      const { FieldValue } = admin.firestore;
      const snapshot = await this.collection.doc(doc).get();
      if (!snapshot.exists) {
        await this.collection.doc(doc).set({
          [key]: FieldValue.increment(1),
        });
      } else {
        await this.collection.doc(doc).update({
          [key]: FieldValue.increment(1),
        });
      }

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async decrement(doc, key) {
    try {
      const { FieldValue } = admin.firestore;
      const snapshot = await this.collection.doc(doc).get();
      if (!snapshot.exists) {
        return true;
      }
      await this.collection.doc(doc).update({
        [key]: FieldValue.increment(-1),
      });

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async add(payload) {
    try {
      const { FieldValue } = admin.firestore;
      const data = {
        ...payload,
        timestamp: FieldValue.serverTimestamp(),
      };
      const response = await this.collection.add(data);
      const result = await this.get(response.id) || {};
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

class Firestore {
  constructor() {
    this.posts = new FirestoreEntry(keys.POSTS);
    this.users = new FirestoreEntry(keys.USERS);
  }

  posts() {
    return this.posts;
  }

  users() {
    return this.users;
  }
}

export default new Firestore();
