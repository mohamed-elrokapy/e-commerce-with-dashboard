import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

//  جلب مستند واحد
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("📛 لا يوجد مستند بهذا الـ ID");
      return null;
    }
  } catch (error) {
    console.error("❌ خطأ في getDocument:", error);
    throw error;
  }
};

//  إضافة مستند جديد بـ ID مخصص
export const setDocument = async (collectionName, docId, data) => {
  try {
    await setDoc(doc(db, collectionName, docId), data);
    console.log("✅ تم إنشاء المستند بنجاح");
  } catch (error) {
    console.error("❌ خطأ في setDocument:", error);
    throw error;
  }
};

//  إضافة مستند بـ ID تلقائي
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("✅ تم إنشاء المستند بـ ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ خطأ في addDocument:", error);
    throw error;
  }
};

//  تحديث مستند (Patch)
export const updateDocument = async (collectionName, docId, updatedData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("✅ تم التحديث بنجاح");
  } catch (error) {
    console.error("❌ خطأ في updateDocument:", error);
    throw error;
  }
};

// حذف مستند
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("✅ تم الحذف بنجاح");
  } catch (error) {
    console.error("❌ خطأ في deleteDocument:", error);
    throw error;
  }
};

//  الاشتراك في مستند لحظيًا (Realtime)
export const listenToDocument = (collectionName, docId, callback) => {
  const docRef = doc(db, collectionName, docId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });
};

// //////////////////////////////////////////////////////////////////////////////////////
import { getDocs, query, where, orderBy, limit } from "firebase/firestore";

//  جلب كل المستندات من كوليكشن
export const getAllDocuments = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);

    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return results;
  } catch (error) {
    console.error("❌ خطأ في getAllDocuments:", error);
    throw error;
  }
};

//  البحث في كوليكشن باستخدام شروط (Query)
export const queryDocuments = async ({
  collectionName,
  conditions = [],
  sortBy,
  sortDirection = "asc",
  maxResults,
}) => {
  try {
    let q = collection(db, collectionName);

    if (conditions.length) {
      conditions.forEach(([field, op, value]) => {
        q = query(q, where(field, op, value));
      });
    }

    if (sortBy) {
      q = query(q, orderBy(sortBy, sortDirection));
    }

    if (maxResults) {
      q = query(q, limit(maxResults));
    }

    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return results;
  } catch (error) {
    console.error("❌ خطأ في queryDocuments:", error);
    throw error;
  }
};
