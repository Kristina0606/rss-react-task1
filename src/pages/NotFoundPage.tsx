import { FC } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pb-20">
      <img
        className="w-100"
        src="./public/error-404_7921014.png"
        alt="404-error-img"
      />
      <div className="text-xm font-light">This page is not found...</div>
    </div>
  );
};

export default NotFound;
