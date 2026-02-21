const AddPlayerCard = ({ onClick }) => {
  return (
    <div className="playerCard add-card" onClick={onClick}>
      <div className="plus-icon">+</div>
      <p>Click to Add New Player</p>
    </div>
  );
};

export default AddPlayerCard;