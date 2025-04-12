import React from "react";

const DeleteModal = ({ eventTitle, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Event</h3>
        <p>Are you sure you want to delete "{eventTitle}"?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
