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
   * @param {Array} query example: [['uid', 'in', ['a', 'b']]]
   */
  async lists(query) {
    try {
      let snapshot = null;
      if (query) {
        snapshot = this.collection;
        query.forEach((item) => {
          snapshot = snapshot.where(...item);
        });
        snapshot = await snapshot.get();
      } else {
        snapshot = await this.collection.get();
      }
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
        return {};
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

  async add(payload) {
    try {
      const { FieldValue } = admin.firestore;
      const data = {
        ...payload,
        timestamp: FieldValue.serverTimestamp(),
      };
      const response = await this.collection.add(data);
      const result = await this.get(response.id);
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
