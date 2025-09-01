interface FetchProps {
  url: string;
  method: string;
  body?: object;
  onFailure: () => void;
  onSuccess: (response: Response) => void;
}

export default function useFetch() {
  const fetchdata = async ({
    url,
    method,
    body,
    onSuccess,
    onFailure,
  }: FetchProps) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        onSuccess(response);
      } else {
        onFailure();
      }
    } catch (error) {
      console.log("Data submission failed:", error);
    }
  };

  return { fetchdata };
}
