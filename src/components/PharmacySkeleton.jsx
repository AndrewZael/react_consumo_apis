import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PharmacySkeleton = () => {
  return (
    <div className="px-3 py-3 rounded bg-white border shadow-sm mb-2">
      <Skeleton width={"50%"} height={24} />
      <ul className="mt-3 list-unstyled">
        {[0, 1, 2].map((item) => (
          <li className="mb-1" key={item}>
            <Skeleton />
          </li>
        ))}
      </ul>
      <div className="mt-3 text-end">
        <Skeleton height={38} width={"30%"} />
      </div>
    </div>
  );
};

export default PharmacySkeleton;
