import "../style/navbar.css";

const Navbar = ({ openSidebar, showSidebar }) => {
  return (
    <>
      <div className={openSidebar ? "navbar active" : "navbar"}>
        <div className="navbar__left">
          <button className="btn-toggle" onClick={showSidebar}>
            <i className="fas fa-bars" id="btn"></i>
          </button>
          <h2 className="navbar__left-title">Demo</h2>
        </div>
        <div>
          <button className="btn-github">
            <i className="fa-brands fa-github"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
