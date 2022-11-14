import React, {FC, useMemo} from 'react';
import './JobDetails.scss';
import {useNavigate, useParams} from "react-router-dom";
import {GoogleMap, Marker, useJsApiLoader, useLoadScript} from "@react-google-maps/api";
import bookmark from '../../assets/icons/bookmark-contour.svg';
import share from '../../assets/icons/share.svg';
import arrowReturn from '../../assets/icons/Arrow return.svg';
import pin from '../../assets/icons/location-icon.svg';
import getDaysSinceCreation from "../../utils/getDaysSinceCreation";

interface JobDetailsProps {
  jobsFromServer: Job[]
}

function stringNormalizer(input: string, normalizer: string | RegExp) {
  const result: Description = {
    about: '',
    paragraphs: [],
  }
  const clearedStringArray = input
      .split(normalizer)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

  result.about = clearedStringArray[0];

  for (let i = 2; i <= clearedStringArray.length; i += 2) {
    result.paragraphs.push({
      title: clearedStringArray[i - 1],
      body: clearedStringArray[i],
    })
  }

  return result;
}

const JobDetails: FC<JobDetailsProps> = ({jobsFromServer}) => {
  const navigate = useNavigate()
  const {jobId} = useParams();
  const job = jobsFromServer.find((item) => item.id === jobId) as Job;

  const regex = /\n\t|\n/g;
  const description = stringNormalizer(job.description, regex);
  const normalizedSalary = job.salary.split('').map(i => i === 'k' ? ' 000' : i).join('');
  const sincePostCreation = getDaysSinceCreation(job.createdAt);
  const position = useMemo(() => ({lat: job.location.lat, lng: job.location.long}), []);
  const mapOptions = useMemo(() => (
      {
        disableDefaultUI: true,
        mapId: "5062ee2fd3df7af7"
      }
  ), []);
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: 'AIzaSyAaysov4bOTt6VVLQinN5NJyBLQaHt2e08',
  });

  return (
      <div className="job-details__container lg:w-[1024px] px-[15px] py-[24px] m-auto
      lg:flex lg:gap-[120px] lg:justify-center"
      >
        <div className="job-details">
          <header className="job-details__header lg:flex lg:flex-wrap lg:justify-between">
            <button
                className="job-details__return flex gap-[12px] items-center h-[25px] px-2.5 mb-2.5
                      rounded-lg bg-[#E6E9F2] hover:bg-[#5876C5] uppercase font-bold lg:hidden"
                onClick={() => navigate(-1)}
            >
              <img src={arrowReturn} alt="return arrow"/>
              Return
            </button>

            <h1 className="job-details__title font-bold text-xl lg:order-1 lg:w-max">
              Job Details
            </h1>
            <hr className="my-[12px] w-full lg:order-3"/>
            <menu className="job-details__menu flex gap-[36px] lg:w-max lg:order-2">
              <li className="job-details__menu-item">
                <button className="job-details__button flex gap-[12px] items-center">
                  <img
                      src={bookmark}
                      alt="make a bookmark"
                      className="job-details__button-img"
                  />
                  Save to my list
                </button>
              </li>
              <li className="job-details__menu-item">
                <button className="job-details__button flex gap-[12px] items-center">
                  <img
                      src={share}
                      alt="share the job"
                      className="job-details__button-img"
                  />
                  Share
                </button>
              </li>
            </menu>

            <button
                className="job-details__cta-button w-[127px] h-[52px] rounded-lg bg-[#384564] hover:bg-[#5876C5]
                  uppercase text-[#FFFFFF] hidden
                  lg:inline-block lg:order-3 lg:mt-[40px]"
            >
              Apply now
            </button>
          </header>
          <main className="job-details__main mt-[32px] flex flex-col gap-[63px] lg:mb-[100px]">
            <section className="job-details__section flex flex-col gap-4">

              <div className="job-details__general flex flex-wrap">
                <h3 className="job-details__position-name font-bold mb-[5px]">
                  {job.title}
                </h3>
                <div className="job-details__sincePostCreation grow lg:order-3 lg:w-full">
                  {`Posted ${sincePostCreation} days ago`}
                </div>
                <div className="job-details__salary grow text-end">
                  <div className="job-details__taxation">
                    Brutto, per year
                  </div>
                  <div className="job-details__amount font-bold">
                    {`\u20AC ${normalizedSalary}`}
                  </div>

                </div>
              </div>

              <div className="job-details__about">
                {description.about}
              </div>

              <div className="job-details__responsibilities">
                <h3 className="job-details__responsibilities-title  font-bold">
                  {description.paragraphs[0].title}
                </h3>
                <p className="job-details__responsibilities-text">
                  {description.paragraphs[0].body}
                </p>
              </div>
              <div className="job-details__benefits">
                <h3 className="job-details__benefits-title font-bold">
                  {description.paragraphs[1].title}
                </h3>
                <ul className="job-details__benefits-list list-[square]">
                  {description.paragraphs[1].body.split('. ').map((item) => (
                      <li
                          className="job-details__benefits-item"
                          key={Math.random().toString().slice(2, 4)}
                      >
                        {item}
                      </li>
                  ))}
                </ul>
              </div>
              <button className="job-details__cta-button w-[127px] h-[52px]
                      rounded-lg bg-[#384564] hover:bg-[#5876C5] uppercase text-[#FFFFFF]"
              >
                Apply now
              </button>
            </section>
            <section className="job-details__gallery">
              <h2 className="job-details__title font-bold text-xl">
                Attached images
              </h2>
              <hr className="my-[12px]"/>
              <div className="gallery-images  flex gap-2.5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory">

                {job.pictures.map((imageUrl) =>
                    <img
                        className="rounded-lg w-[200px] h-[115px] flex-[0_0_200px] object-cover object-center snap-start"
                        src={imageUrl}
                        alt="company pictures"
                        key={Math.random().toString().slice(2, 4)}
                    />
                )}

              </div>
            </section>
            <section className="job-details__info flex flex-col gap-2.5">
              <h2 className="job-details__info-title font-bold text-xl">
                Additional info
              </h2>
              <hr className="my-[12px]"/>
              <div className="job-details__empl-types">
                <h3 className="job-details__empl-types-title">
                  Employment type
                </h3>
                <div className=" flex gap-2.5 flex-wrap">
                  {job.employment_type.map((item) =>
                      <div
                          className="job-details__empl-type
                                w-[122px] h-[50px] flex items-center justify-center
                                font-bold rounded-lg bg-[#a1b1db51] border border-[#0000001f] border-solid
                                text-[#55699E]"
                          key={Math.random().toString().slice(2, 4)}
                      >
                        {item}
                      </div>
                  )}
                </div>
              </div>
              <div className="job-details__benefits">
                <h3 className="job-details__benefits-title">
                  Benefits
                </h3>
                <div className=" flex gap-2.5 flex-wrap">
                  {job.benefits.map((item) =>
                      <div
                          className="job-details__benefit
                                w-[122px] h-[50px] flex items-center justify-center
                                font-bold rounded-lg bg-[#FFCF00] border border-[#988B49] border-solid
                                text-[#988B49]"
                          key={Math.random().toString().slice(2, 4)}
                      >
                        {item}
                      </div>
                  )}
                </div>
              </div>
            </section>
          </main>
          <button
              className="job-details__return flex gap-[12px] items-center h-[52px] px-[23px]
                      rounded-lg bg-[#E6E9F2] hover:bg-[#5876C5] uppercase font-bold hidden lg:flex"
              onClick={() => navigate(-1)}
          >
            <img src={arrowReturn} alt="return arrow"/>
            Return to job board
          </button>
        </div>

        <section className="job-details__contacts mt-[63px] lg:mt-0">
          <h2 className="job-details__title font-bold text-xl lg:hidden">
            Contacts
          </h2>
          <hr className="my-[12px] lg:hidden"/>
          <div className="rounded-lg bg-[#2A3047]">
            <div className=" job-details__company-contacts flex flex-col gap-2.5 px-[60px] py-[30px] text-[#E7EAF0] ">
              <div className="job-details__company-name font-bold">
                {job.name}
              </div>
              <div className="job-details__company-address flex gap-[12px] ">
                <img src={pin} alt="pin"/>
                {job.address}
              </div>
              <div className="job-details__company-phone">
                {job.phone}
              </div>
              <div className="job-details__company-email">
                {job.email}
              </div>
            </div>
            <div className="map">
              {isLoaded &&
                  <GoogleMap
                      zoom={5}
                      center={position}
                      mapContainerStyle={{width: '100%', height: '218px', borderRadius: '0 0 25px 25px'}}
                      options={mapOptions}
                  >
                    <Marker position={position} icon={pin}/>
                  </GoogleMap>
              }
            </div>
          </div>
        </section>
      </div>
  );
}

export default JobDetails;
