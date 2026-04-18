import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Table = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [index, setIndex] = useState(1);
  const auth = "Bearer " + localStorage.getItem("token");
  const url = "http://localhost:8080/jobs/users/getjobs";

  async function loadJobs() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      const data = await response.json();
      setUserJobs(data);
    } catch (e) {
      console.log("Error ", e);
    }
  }

  useEffect(() => {
    loadJobs();
  } , []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Company</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Role</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {userJobs.map((job , i) => (
              <tr>
                <th>{i+1}</th>
                <td>{job.company}</td>
                <td>{job.status}</td>
                <td>{job.appliedOn}</td>
                <td>{job.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
