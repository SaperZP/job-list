import React, { FC } from 'react';
import './PageNotFound.scss';
import {Link} from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FC<PageNotFoundProps> = () => (
  <div className="PageNotFound">
    <h2>404</h2>
    <p>Page not found</p>
    <Link to='/'>Bring me back home Jinny</Link>
  </div>
);

export default PageNotFound;
