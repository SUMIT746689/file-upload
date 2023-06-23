import React, { useState } from "react";

const Authenticate = (Component) => (props) => {
  console.log({ Component });
  console.log({ props });
  if (props.loading) return <div>"loaoding...0"</div>;
  else return <Component {...props} />;
};

export default Authenticate;
