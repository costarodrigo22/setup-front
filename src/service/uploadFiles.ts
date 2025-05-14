import axios from "axios";

export async function uploadFiles(url: string, file: File) {
  await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
}
