import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-content bg-white rounded-lg p-6 shadow-md z-10 w-[600px]">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-gris text-white px-4 py-2 rounded-md font-primary"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
