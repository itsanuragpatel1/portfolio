import React from 'react';

const Image = ({ src, alt, ...props }) => {
  // next/image props might include layout, objectFit, etc.
  // We can just strip or pass them along
  return (
    <img src={src} alt={alt} {...props} />
  );
};

export default Image;
