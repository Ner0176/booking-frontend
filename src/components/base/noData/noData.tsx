import { CSSProperties } from "react";

export const EmptyData = ({
  image,
  title,
  textSize,
  imageSize,
  customStyles,
}: Readonly<{
  image: string;
  title: string;
  textSize?: number;
  imageSize?: number;
  customStyles?: CSSProperties;
}>) => {
  return (
    <div
      style={customStyles}
      className="flex flex-col gap-3 items-center justify-center w-full"
    >
      <img
        src={image}
        draggable={false}
        alt="No data icon"
        className="size-40 sm:size-48"
        style={{ width: imageSize }}
      />
      <span
        style={{ fontSize: textSize }}
        className="font-semibold text-base sm:text-lg select-none text-center"
      >
        {title}
      </span>
    </div>
  );
};
