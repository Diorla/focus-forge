import dbInfo from "@/constants/db";
import app from "@/constants/firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const dbPath = dbInfo.db;

const storage = getStorage(app);

async function uploadFile({
  fileName,
  userId,
  file,
}: {
  fileName: string;
  userId: string;
  file: Blob | File;
}) {
  const storageRef = ref(storage, `user/${userId}/${fileName}`);
  return (await uploadBytes(storageRef, file)).ref.fullPath;
}

interface handleImageProps {
  uri: string;
  userId: string;
}

export const uriToBlob = (uri: string) => {
  const blob = new Blob([uri], { type: "text/plain" });
  return blob;
};

export default async function upload({ uri, userId }: handleImageProps) {
  const bytes = await uriToBlob(uri);
  const result = await uploadFile({
    fileName: dbPath,
    file: bytes,
    userId,
  });
  return result;
}
