import PropTypes from 'prop-types';

export default function Page({ children, cool }) {
  return (
    <div>
      <h2>I am the page component</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};

// Page.propTypes = {
//   cool: PropTypes.string,
//   children: PropTypes.oneOf([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]),
// };
