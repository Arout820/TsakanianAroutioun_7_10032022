const popup = ({ trigger, setTrigger, children }) => {
  return (
    trigger && (
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={(event) => setTrigger(false)}>
            X
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default popup;
