import { Link } from "react-router-dom";
function NavItem(props) {
  const { href, displayText, attributes } = props;
  return (
    <li className="nav-item">
      <Link className="nav-link" to={href} {...attributes}>
        {displayText}
      </Link>
    </li>
  );
}

export default NavItem;
