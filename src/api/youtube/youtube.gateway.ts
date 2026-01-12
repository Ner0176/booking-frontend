import { axiosInstance } from "../axios-instance";

export const youtubeApi = {
  connect: async () => {
    const response = await axiosInstance.post("/youtube/connect");
    window.location.href = response.data;
  },
  getVideos: async (nextPageToken?: string) => {
    const params = new URLSearchParams();

    if (!!nextPageToken) {
      params.set("nextPageToken", nextPageToken);
    }

    const response = await axiosInstance.get("/youtube/videos", { params });
    return response.data;
  },
};
