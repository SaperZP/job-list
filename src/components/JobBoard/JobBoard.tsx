import React, {FC, useEffect, useState} from 'react';
import './JobBoard.scss';
import JobCard from "../JobCard/JobCard";
import Pagination from "../Pagination/Pagination";
import {useNavigate, useParams} from "react-router";

interface JobBoardProps {
  jobsFromServer: Job[]
}

const JobBoard: FC<JobBoardProps> = ({jobsFromServer}) => {
  const {pageId} = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsAmountPerPage = 3;
  const pageCount = Math.ceil(jobsFromServer.length / jobsAmountPerPage);
  const endPostIndex = currentPage * jobsAmountPerPage;
  const startPostIndex = endPostIndex - jobsAmountPerPage;
  const jobsToShow: Job[] = jobsFromServer.slice(startPostIndex, endPostIndex);

  console.log(pageId)

  useEffect(() => {
    if (pageId && typeof +pageId === "number" && +pageId <= pageCount) {
      setCurrentPage(+pageId)
    } else if (pageId !== undefined) {
      navigate('/page_not_found')
    }

  }, [pageId])

  return (
      <div
          className="job-board max-w-[1200px] min-w-[400px] h-[100vh] m-auto flex flex-col gap-12 p-[9px] bg-[#E6E9F2] items-center">
        <div className="job-board__cards flex flex-col gap-2">
          {jobsToShow.map((job) =>
              <JobCard key={job.id} job={job} pageId={pageId}/>)
          }
        </div>
        <Pagination pageCount={pageCount} currentPage={currentPage}/>
      </div>
  );
}

export default JobBoard;
