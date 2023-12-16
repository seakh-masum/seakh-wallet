import SkeletonLine from "./SkeletonLine";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-neutral-900 p-4 rounded-lg mb-3 h-20">
      <SkeletonLine width={30} className={'mb-3'} />
      <SkeletonLine width={75} />
    </div>
  );
};

export default SkeletonCard;
