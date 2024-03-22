import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../../constants/firebaseConfig";

const storage = getStorage(app);

async function uploadFile({
  fileName,
  userID,
  file,
}: {
  fileName: string;
  userID: string;
  file: Blob | File;
}) {
  const storageRef = ref(storage, `user/${userID}/${fileName}`);
  return (await uploadBytes(storageRef, file)).ref.fullPath;
}

interface handleImageProps {
  uri: string;
  userID: string;
}

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

export default async function upload({ uri, userID }: handleImageProps) {
  const bytes = await uriToBlob(uri);
  const result = await uploadFile({
    fileName: "db.db",
    file: bytes as Blob,
    userID,
  });
  return result;
}
