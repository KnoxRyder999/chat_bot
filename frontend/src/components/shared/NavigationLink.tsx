import { FC } from 'react';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  to,
  text,
  bg,
  textColor,
  onClick,
}) => {
  return (
    <Link
      onClick={onClick}
      className='nav-link'
      to={to}
      style={{ color: textColor, background: bg }}
    >
      {text}
    </Link>
  );
};
