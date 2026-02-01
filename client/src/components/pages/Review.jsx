import { MdOutlineRateReview, MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useAppContext } from "../ContextApi";
import { useState } from "react";

const Review = () => {
  const { auth, registerUsers, Googleuser } = useAppContext();

  const usersList = registerUsers || [];
  const currentUser = auth?.user || Googleuser?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [create, setCreate] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setCreate(user.review || "");
    setRating(user.rating || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    setLoading(true);

    // API call here
    console.log("Review:", create);
    console.log("Rating:", rating);

    setTimeout(() => {
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <>
      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usersList.map((user, i) => (
          <div
            key={user._id || i}
            className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-900
                       shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              “{user.review || "No review"}”
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                — <span className="font-medium">{user.name || "Anonymous"}</span>
                {user.role && <span>, {user.role}</span>}
              </div>

              {currentUser && currentUser._id === user._id && (
                <div className="flex gap-3">
                  <MdOutlineRateReview
                    onClick={() => openModal(user)}
                    className="cursor-pointer hover:text-blue-500"
                    title="View"
                  />
                  <FiEdit
                    onClick={() => openModal(user)}
                    className="cursor-pointer hover:text-green-500"
                    title="Edit"
                  />
                  <MdDeleteForever
                    onClick={() => openModal(user)}
                    className="cursor-pointer hover:text-red-500"
                    title="Delete"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Review</h3>

            <input
              type="text"
              value={create}
              onChange={(e) => setCreate(e.target.value)}
              placeholder="Enter review"
              className="w-full mb-3 rounded-md border px-3 py-2 text-sm text-black"
            />

            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating"
              className="w-full mb-4 rounded-md border px-3 py-2 text-sm text-black"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
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
