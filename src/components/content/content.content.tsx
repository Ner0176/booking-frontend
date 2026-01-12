import Icon from "@mdi/react";
import { IYouTubeVideo } from "../../api/youtube/youtube.interface";
import { PRIVACY_ICONS } from "./content.interface";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export const VideoItem = ({
  details,
}: Readonly<{ details: IYouTubeVideo }>) => {
  const { t } = useTranslation();

  const { id, url, title, privacy, thumbnail, description, publishedAt } =
    details;

  return (
    <a
      key={id}
      href={url}
      target="_blank"
      rel="noreferrer"
      className="grid grid-cols-6 w-full gap-3 hover:bg-neutral-50 cursor-pointer py-5 rounded-xl border-b border-neutral-200"
    >
      <div className="col-span-3 flex flex-row gap-3 w-full">
        <img
          src={thumbnail}
          alt="YouTube video thumbnail"
          className="h-[100px] w-[200px] flex-shrink-0 rounded-xl"
        />
        <div className="flex flex-col gap-3">
          <span className="font-bold">{title}</span>
          <span className="text-sm">
            {!description ? "No hay descripción" : description}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-1.5">
        <Icon className="size-3.5 mt-1" path={PRIVACY_ICONS[privacy]} />
        <span className="text-sm">{t(`Content.Privacy.${privacy}`)}</span>
      </div>
      <div className="flex justify-center">
        <span>{format(publishedAt, "dd/MM/yyyy")}</span>
      </div>
      <div className="flex justify-center">0</div>
    </a>
  );
};
