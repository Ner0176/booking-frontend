import { useMutation, useQuery } from "@tanstack/react-query";
import { youtubeApi } from "./youtube.gateway";
import { IYtVideosPaginated } from "./youtube.interface";

export function useConnect() {
  return useMutation({
    mutationFn: () => youtubeApi.connect(),
  });
}

export function useGetYtVideos(nextPageToken?: string) {
  return useQuery<IYtVideosPaginated>({
    queryKey: ["getYtVideos", nextPageToken],
    queryFn: () => youtubeApi.getVideos(nextPageToken),
  });
}
