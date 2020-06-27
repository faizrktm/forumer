/* eslint-disable max-classes-per-file */
import admin from './admin';

const keys = {
  POSTS: 'posts',
};

class FirestoreEntry {
  constructor(key) {
    this.key = key;
    this.collection = admin.firestore().collection(key);
  }

  async lists() {
    try {
      const snapshot = await this.collection.get();
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
  }

  posts() {
    return this.posts;
  }
}

export default new Firestore();
