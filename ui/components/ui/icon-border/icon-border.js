import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function IconBorder({ children, size, className }) {
  return (
    <div
      className={classnames('icon-border', className)}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      {children}
    </div>
  );
}

IconBorder.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
};
