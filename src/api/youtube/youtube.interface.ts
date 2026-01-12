export interface IYouTubeVideo {
  id: string;
  url: string;
  title: string;
  publishedAt: Date;
  thumbnail: string;
  description: string;
  privacy: "public" | "private" | "unlisted";
}

export interface IYtVideosPaginated {
  nextPageToken?: string;
  videos: IYouTubeVideo[];
}
