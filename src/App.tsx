import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import JobBoard from "./components/JobBoard/JobBoard";
import JobDetails from "./components/JobDetails/JobDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {getJobs} from "./api";
import Preloader from "./components/Preloader/Preloader";
import response from "../src/response.json";


function App() {
  const fallBackJobs = response as unknown as Job[];
  const [jobsFromServer, setJobsFromServer] = useState<Job[]>([]);
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    getJobs()
        .then((data) => {
          setJobsFromServer(data)
        })
        .catch((error) => setFetchError(error.message))
  }, [])

  const getFallBackJobs = () => {
    setJobsFromServer(fallBackJobs)
  }

  return (
      <>
        {jobsFromServer.length > 0 ?
            <Routes>
              <Route path="/">
                <Route index element={<JobBoard jobsFromServer={jobsFromServer}/>}/>
                <Route path=":pageId" element={<JobBoard jobsFromServer={jobsFromServer}/>}/>
              </Route>
              <Route path="/:pageId/:jobId" element={<JobDetails jobsFromServer={jobsFromServer}/>}/>
              <Route path="/home" element={<Navigate to="/" replace/>}/>
              <Route path='/page_not_found' element={<PageNotFound/>}/>
            </Routes>
            : <Preloader fetchError={fetchError} getFallBackJobs={getFallBackJobs}/>
        }
      </>
  );
}

export default App;
