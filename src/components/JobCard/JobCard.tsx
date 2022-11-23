import React, {FC} from 'react';
import './JobCard.scss';
import locationIcon from '../../assets/icons/location-icon.svg';
import starBlue from '../../assets/icons/star-blue.svg';
import bookmark from '../../assets/icons/bookmark-contour.svg';
import getDaysSinceCreation from "../../utils/getDaysSinceCreation";


interface JobCardProps {
  job: Job;
  pageId: string | undefined;
}

const JobCard: FC<JobCardProps> = ({job, pageId}) => {
  const sincePostCreation = getDaysSinceCreation(job.createdAt);

  return (
      <div className="job-card w-full h-[206px] lg:h-[164px] flex gap-[19px] px-4 py-[13px] bg-[#EFF0F5] rounded-lg">
        <div className="job-card__img-container flex-[0_0_66px] mt-11 lg:m-0">
          <img
              className="job-card__image w-[66px] h-[66px] rounded-full"
              src={job.pictures[0]}
              alt="our location"
          />
        </div>
        <div className="job-card__main flex flex-col gap-[17px] grow lg:flex-row-reverse lg:justify-between">
          <div className="job-card__top flex justify-between items-end lg:gap-[32px]">
            <div className="job-card__stars flex h-2.5 lg:self-center">
              <img src={starBlue} alt="star"/>
              <img src={starBlue} alt="star"/>
              <img src={starBlue} alt="star"/>
              <img src={starBlue} alt="star"/>
              <img src={starBlue} alt="star"/>
            </div>
            <div className="job-card__container lg:flex lg:flex-col lg:h-full lg:justify-between lg:items-end">
              <div className="job-card__bookmark hidden lg:block">
                <img
                    src={bookmark}
                    alt="make a bookmark"
                    className="job-card__bookmark-img"
                />
              </div>
              <p className="job-card__date text-sm">{`Posted ${sincePostCreation} days ago`}</p>
            </div>
          </div>
          <div className="description-container flex flex-col gap-[5px] max-w-[500px]">
            <h3 className="job-card__position">
              <a href={`#/${pageId}/${job.id}`}>
                {job.name}
              </a>
            </h3>
            <p className="job-card__company-name">{job.title}</p>
            <div className="job-card__location flex">
              <img src={locationIcon} alt="pin icon" className="job-card__map-pin"/>
              <span className="job-card__location-text">{job.address}</span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default JobCard;
