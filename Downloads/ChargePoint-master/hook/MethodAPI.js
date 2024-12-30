import firestore from "@react-native-firebase/firestore";

export const GETDATA = async (name, setData) => {
  const usersCollection = await firestore().collection(name).get();
  const documents = [];

  usersCollection.forEach((doc) => {
    documents.push({ id: doc.id, data: doc.data() });
  });

  return setData(documents);
};

export const POSTDATA = async (name, data) => {
  return await firestore().collection(name).add(data);
};

export const UPDATEDATA = async (name, data, id) => {
  const userDocRef = await firestore().collection(name).doc(id);
  await userDocRef.update(data);
};

export const DELETEDATA = async (name, id) => {
  return await firestore().collection(name).doc(id).delete();
};
