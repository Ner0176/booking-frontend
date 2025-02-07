export const NoDataComponent = ({
  image,
  title,
  textSize,
  imageSize,
}: Readonly<{
  image: string;
  title: string;
  textSize?: number;
  imageSize?: number;
}>) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <img
        src={image}
        draggable={false}
        alt="No data icon"
        className="size-48"
        style={{ width: imageSize }}
      />
      <span
        style={{ fontSize: textSize }}
        className="font-semibold text-lg select-none"
      >
        {title}
      </span>
    </div>
  );
};
