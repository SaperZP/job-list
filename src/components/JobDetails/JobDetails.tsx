import React, {FC} from 'react';
import './JobDetails.scss';
import {useParams} from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import JobDetailsRenderer from "../JobDetailsRenderer/JobDetailsRenderer";

interface JobDetailsProps {
  jobsFromServer: Job[]
}

const JobDetails: FC<JobDetailsProps> = ({jobsFromServer}) => {
  // const navigate = useNavigate()
  const {jobId} = useParams();
  const job = jobsFromServer.find((item) => item.id === jobId) as Job;

  return (
      job ? <JobDetailsRenderer job={job}/>
          : <PageNotFound/>
  );
}

export default JobDetails;
