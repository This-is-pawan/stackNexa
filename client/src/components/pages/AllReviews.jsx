import React, { useEffect } from 'react'
import { useAppContext } from '../ContextApi'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, i) =>
        i < rating ? (
          <AiFillStar key={i} className="text-yellow-400 w-4 h-4" />
        ) : (
          <AiOutlineStar key={i}ремя
 className="text-gray-300 dark:text-gray-600 w-4 h-4" />
        )
      )}
    </div>
  );
};

const AllReviews = () => {
  const {
    users_reviews,
    usersReviewsLoading,
    AllUser_reviews
  } = useAppContext();

  useEffect(() => {
    AllUser_reviews();
  }, []);

  // 🔵 LOADING STATE
  if (usersReviewsLoading) {
    return (
      <p className="text-sm text-gray-500 text-center">
        Loading reviews...
      </p>
    );
  }

 

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {users_reviews.map((e, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900 shadow-sm"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            “{e.comment}”
          </p>

          <div className="mt-2">
            <StarRating rating={Number(e.rating)} />
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            — <span className="font-medium">{e.user?.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
