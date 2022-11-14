import React, {FC} from 'react';
import './Preloader.scss';

interface PreloaderProps {
  fetchError?: string;
  getFallBackJobs?: () => void;
}

const Preloader: FC<PreloaderProps> = ({fetchError, getFallBackJobs}) => {
  return (
      <div className="container">
        <div className="preloader"></div>

        {fetchError && getFallBackJobs &&
            <>
              <div className="preloader__error">
                {fetchError}
              </div>
              <button
                  className="preloader__button"
                  onClick={() => getFallBackJobs()}
              >
                Want to use fallback jobs?
              </button>
            </>

        }
      </div>
  );
};

export default Preloader;
