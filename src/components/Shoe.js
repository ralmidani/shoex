import React from "react";

const Shoe = ({ shoe, handleShow }) => (
  <div className="shoe-slot" onClick={() => handleShow(shoe.id)}>
    {!!shoe.upc ? (
      <div>
        <p>
          {shoe.brand} {shoe.style}
        </p>
        <p>{shoe.upc}</p>
        <p>Size {shoe.size}</p>
      </div>
    ) : (
      <p className="empty-slot-text">Empty</p>
    )}
  </div>
);

export default Shoe;
