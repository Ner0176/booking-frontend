import { CustomButton, DashboardSkeleton, LoadingSpinner } from "../base";
import { useConnect, useGetYtVideos } from "../../api/youtube";
import youtubeNotConnected from "../../assets/images/noData/youtube-not-connected.svg";
import { useEffect, useRef, useState } from "react";
import { IYouTubeVideo } from "../../api/youtube/youtube.interface";
import { useTranslation } from "react-i18next";
import { VideoItem } from "./content.content";

export const ContentDashboard = () => {
  const { t } = useTranslation();

  const observerRef = useRef<HTMLDivElement>(null);

  const [token, setToken] = useState<string | undefined>();
  const [showYtConnect, setShowYtConnect] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<IYouTubeVideo[]>([]);

  const { mutate } = useConnect();
  const { data, isSuccess, isLoading } = useGetYtVideos(token);

  useEffect(() => {
    if (isSuccess) {
      setShowYtConnect(false);
      if (!!data) setLoadedVideos((prev) => [...prev, ...data.videos]);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!observerRef.current || isLoading) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setToken(data?.nextPageToken);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [data, isLoading]);

  return (
    <DashboardSkeleton title={t("Content.Title")}>
      <div className="flex items-center justify-center h-full">
        {showYtConnect ? (
          <div className="flex flex-col gap-3">
            <img src={youtubeNotConnected} className="size-[300px]" alt="I" />
            <CustomButton onClick={mutate}>{t("Content.Connect")}</CustomButton>
          </div>
        ) : (
          !!loadedVideos.length && (
            <div className="flex flex-col gap-3 size-full">
              <div className="grid grid-cols-6 justify-items-center w-full border-b border-neutral-200 pb-2">
                <span className="col-span-3">{t("Content.Columns.Video")}</span>
                <span>{t("Content.Columns.Date")}</span>
                <span>{t("Content.Columns.Privacy")}</span>
                <span>{t("Content.Columns.Access")}</span>
              </div>
              <div className="flex flex-col h-full">
                {loadedVideos.map((video) => (
                  <VideoItem key={video.id} details={video} />
                ))}
                {isLoading && <LoadingSpinner size={32} color="gray" />}
                <div ref={observerRef} />
              </div>
            </div>
          )
        )}
      </div>
    </DashboardSkeleton>
  );
};
