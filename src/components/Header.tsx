import './Header.css';
import { MdSwapCalls as IconLogo } from 'react-icons/md';

function Header() {
  return (
    <div className="Header">
      <h1><IconLogo /> Unit Converter</h1>
    </div>
  );
}

export default Header;