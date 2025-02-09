import Skeleton from "react-loading-skeleton";

const LateralSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton style={{ width: 150, height: 25 }} />
      {[...Array(4)].map((_, idx) => (
        <Skeleton
          key={idx}
          style={{ width: "100%", height: 35, borderRadius: 16 }}
        />
      ))}
    </div>
  );
};

export const ProfileLoadingSkeleton = ({
  isLoading,
}: Readonly<{ isLoading: boolean }>) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <LateralSkeleton />
      <div className="flex flex-col gap-3">
        <Skeleton style={{ width: "100%", height: 35, borderRadius: 16 }} />
        <Skeleton style={{ width: "100%", height: 500, borderRadius: 16 }} />
      </div>
      <LateralSkeleton />
    </div>
  );
};
