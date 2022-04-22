import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <NavLink to="/" style={{'fontSize': '64px', 'display': 'block', 'textAlign': 'center'}}>ONLY.</NavLink>
    );
};

export default NavBar;