import React, { useState, useEffect } from 'react';
import './JobPortal.css';
const JobPortal = () => {

  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    jobId: '',
    jobName: '',
    companyName: '',
    salary: ''
  });
  let jobID;
  const handleChange = (event) => {
    jobID=(event.target.value);
  };
  // Fetch all jobs from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/job/')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.log('Error occurred while fetching jobs:', error));
  }, []);

  // Function to handle input changes for the new job form
  const handleInputChange = event => {
    setNewJob({
      ...newJob,
      [event.target.name]: event.target.value
    });
  };

  // Function to add a new job to the backend
  const addJob = () => {
    fetch('http://localhost:8080/api/v1/job/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
      .then(response => response.json())
      .then(data => {
        setJobs([...jobs, data]);
        setNewJob({
          jobId: '',
          jobName: '',
          companyName: '',
          salary: ''
        });
      })
      .catch(error => console.log('Error occurred while adding job:', error));
  };

  const deleteJob = jobId => {
    fetch(`http://localhost:8080/api/v1/job/${jobId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setJobs(jobs.filter(job => job.jobId !== jobId));
        } else {
          throw new Error('Failed to delete job');
        }
      })
      .catch(error => {
        console.log('Error occurred while deleting job:', error);
      });
  };  
  

  return (
    <div>
      <h1>Job Portal</h1>
      <h2>Add a Job</h2>
      <form>
        <label>
          Job ID:
          <input
            type="text"
            name="jobId"
            value={newJob.jobId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Job Name:
          <input
            type="text"
            name="jobName"
            value={newJob.jobName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={newJob.companyName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Salary:
          <input
            type="text"
            name="salary"
            value={newJob.salary}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={addJob}>
          Add Job
        </button>
      </form>
      <h2>Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.jobId}>
            {job.jobName} at {job.companyName} (${job.salary})
          </li>
        ))}
      </ul>
      <from>
            <input
          type="number"
          name="jobID"
          value={jobID}
          onChange={handleChange}
          required />
          <button onClick={() => deleteJob(jobID)}>Delete</button>
            </from>
    </div>
  );
};
export default JobPortal;
