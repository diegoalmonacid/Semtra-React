
import PropTypes from 'prop-types';

export const WhiteCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
      {children}
    </div>
  );
};

WhiteCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
