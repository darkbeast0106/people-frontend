function NavItem(props) {
  const { href, displayText } = props;
  return (
    <li className="nav-item">
      <a className="nav-link" href={href}>
        {displayText}
      </a>
    </li>
  );
}

export default NavItem;
