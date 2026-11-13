
const INDEXNOW_KEY = process.env.INDEXNOW_KEY!;
const SITE_URL = "https://skyflywithus.com";

export async function submitToIndexNow(urls: string[]) {
  if (!INDEXNOW_KEY) {
    throw new Error("INDEXNOW_KEY is missing");
  }

  if (!urls.length) return;

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: "skyflywithus.com",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok && response.status !== 202) {
    const message = await response.text();
    throw new Error(`IndexNow failed (${response.status}): ${message}`);
  }

  return {
    success: true,
    status: response.status,
  };
}
