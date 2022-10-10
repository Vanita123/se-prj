import React from 'react';
import classNames from 'classnames';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
        <a href="https://www.linkedin.com/in/tejaswy-ghanta/" target='_blank'>Tejaswy</a>
        </li>
        <li>
        <a href="https://github.iu.edu/lghanta/SE-project" target='_blank'>Vanita</a>
        </li>
        <li>
        <a href="https://github.iu.edu/lghanta/SE-project" target='_blank'>Sahithi</a>
        </li>
        <li>
        <a href="https://github.iu.edu/lghanta/SE-project" target='_blank'>Zach</a>
        </li>
        
      </ul>
    </nav>
  );
}

export default FooterNav;