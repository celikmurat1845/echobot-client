import axios from "axios";


export default function createChannel() {
  let controller;
  if (typeof window !== "undefined") controller = new AbortController();

  const request = axios.create({
    headers: {
      "Content-Type": "application/json",
      //'Accept-Language': "tr-TR"
    },
    signal: controller?.signal,
    withCredentials: true,
  });

  return { request, controller };
}
