import { MdOutlineRateReview, MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppContext } from "../ContextApi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AllReviews from "./AllReviews";

// Star component using React Icons
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, idx) =>
        idx < rating ? (
          <AiFillStar key={idx} className="text-yellow-400 w-4 h-4" />
        ) : (
          <AiOutlineStar key={idx} className="text-gray-300 dark:text-gray-600 w-4 h-4" />
        )
      )}
    </div>
  );
};

const Review = () => {
  const { auth, Googleuser, review_comment, fetch_comment , AllUser_reviews} = useAppContext();
  const currentUser = auth?.user || Googleuser?.user;

  const [reviews, setReviews] = useState(review_comment || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const hasMyReview = currentUser
    ? reviews.some((r) => r.user?._id === currentUser._id)
    : false;

  const openModal = (review = null) => {
    setSelectedReview(review);
    setComment(review?.comment || "");
    setRating(review?.rating || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    setComment("");
    setRating("");
  };

  useEffect(() => {
    setReviews(review_comment || []);
  }, [review_comment]);

  const createReview = async () => {
    if (!comment || !rating) {
      toast.error("Comment and rating are required");
      return;c
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/create-reviews`,
        { comment, rating },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setReviews((prev) => [
          ...prev,
          {
            ...res.data.review,
            user: currentUser,
          },
        ]);
        toast.success("Review created");
        closeModal();
        fetch_comment();
        AllUser_reviews()
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async () => {
    if (!comment || !rating) {
      toast.error("Comment and rating are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/project/update-reviews/${selectedReview._id}`,
        { comment, rating },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === selectedReview._id ? { ...r, comment, rating } : r
          )
        );
        toast.success("Review updated");
        closeModal();
        fetch_comment();
         AllUser_reviews()
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/project/delete-reviews/${id}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        toast.success("Review deleted");
        fetch_comment();
         AllUser_reviews()
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= ADD REVIEW ================= */}
      {currentUser && !hasMyReview && (
        <div className="mb-4 flex justify-end">
          <MdOutlineRateReview
            onClick={() => openModal()}
            className="text-xl cursor-pointer hover:text-blue-500"
          />
        </div>
      )}

      {/* ================= REVIEW LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((rev) => {
            const isOwner = currentUser?._id === rev.user?._id;
            return (
              <div
                key={rev._id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-900 shadow-sm"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  “{rev.comment}”
                </p>

                {/* STAR RATING */}
                <div className="mt-2">
                  <StarRating rating={Number(rev.rating)} />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    — <span className="font-medium">{rev.user?.name}</span>
                  </div>

                  {isOwner && (
                    <div className="flex gap-3 text-lg">
                      <FiEdit
                        onClick={() => openModal(rev)}
                        className="cursor-pointer hover:text-green-500"
                      />
                      <MdDeleteForever
                        onClick={() => deleteReview(rev._id)}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <AllReviews/>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {selectedReview ? "Update Review" : "Add Review"}
            </h3>

            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter comment"
              className="w-full mb-3 rounded-md border px-3 py-2 text-sm text-black"
            />

            {/* ⭐ RATING INPUT */}
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating (1-5)"
              min={1}
              max={5}
              className="w-full mb-2 rounded-md border px-3 py-2 text-sm text-black"
            />
            {rating && <StarRating rating={Number(rating)} />}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded-md border"
              >
                Cancel
              </button>

              <button
                onClick={selectedReview ? updateReview : createReview}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
