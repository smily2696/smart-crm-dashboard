import Skeleton from
"react-loading-skeleton";

import
"react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = () => {

  return (

    <div className="space-y-4">

      {Array(5).fill(0).map((_, i) => (

        <Skeleton
          key={i}
          height={50}
          borderRadius={12}
        />

      ))}

    </div>
  );
};

export default TableSkeleton;