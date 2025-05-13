import axios from "axios";

export async function getPresignedURL(fileName: string) {
  const { data } = await axios.post<{ signedUrl: string }>(
    "https://3ahxujnpyig3pgzuupyf7tpdye0yngzz.lambda-url.us-east-1.on.aws/",
    { fileName }
  );

  return data.signedUrl;
}
