const Sidebar  = (() => {
    return (
        <div className="nav-left-sidebar sidebar-dark">
        <div className="menu-list">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="d-xl-none d-lg-none" href="#">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav flex-column">
                        <li className="nav-divider">
                            Menu
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link active" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">
                                <i className="fa fa-fw fa-user-circle"></i>Feature List <span className="badge badge-success">6</span>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link active" href="https://library.optimizely.com/" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">
                                <i className="fa fa-fw fa-user-circle"></i>Rest API Documentation <span className="badge badge-success">6</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    </div>
    )
})

export default Sidebar
