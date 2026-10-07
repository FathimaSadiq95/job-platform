import { useState } from "react";
import axios from "axios";
import { normalizeImageUrl } from "../../utils/imageUtils";
import API_URL from "../../api";
import "./Search.css";

const Search = ({ mode = "job" }) => {
  const isCandidateSearch = mode === "candidate";

  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("Anywhere");
  const [jobType, setJobType] = useState("Any");

  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint = isCandidateSearch
        ? "/api/search-candidates"
        : "/api/search-jobs";

      const response = await axios.get(`${API_URL}${endpoint}`, {
        params: {
          keyword,
          region,
          jobType
        }
      });
      console.log("Search results:", response.data.data);
      setResults(response.data.data || []);
      setShowResults(true);

    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setShowResults(true);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Search Form */}
      <form
        method="post"
        className="search-jobs-form"
        onSubmit={handleSearch}
      >
        <div className="row mb-5">

          {/* Keyword */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={
                isCandidateSearch
                  ? "Qualification, Skills..."
                  : "Job title, Company..."
              }
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Region */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <select
              className="selectpicker"
              data-style="btn-white btn-lg"
              data-width="100%"
              data-live-search="true"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="Anywhere">Anywhere</option>
              <option value="Kannur">Kannur</option>
              <option value="Kochi">Kochi</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Thiruvananthapuram">
                Thiruvananthapuram
              </option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {/* Job Type */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <select
              className="selectpicker"
              data-style="btn-white btn-lg"
              data-width="100%"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block text-white btn-search"
            >
              <span className="icon-search icon mr-2"></span>
              {isCandidateSearch ? "Search Candidates" : "Search Job"}
            </button>
          </div>

        </div>
      </form>

      {/* Search Results Popup */}
      {showResults && (
        <div className="search-results-overlay">

          <div className="search-results-modal">

            <button
              className="search-results-close"
              onClick={() => setShowResults(false)}
            >
              &times;
            </button>

            <h2>
              {isCandidateSearch
                ? "Candidate Search Results"
                : "Search Results"}
            </h2>

            <p className="search-summary">
              {keyword || (isCandidateSearch ? "All Candidates" : "All Jobs")}
              &nbsp; | &nbsp;
              {region} &nbsp; | &nbsp;
              {jobType}
            </p>

            {loading ? (
              <p className="text-center">
                {isCandidateSearch
                  ? "Searching candidates..."
                  : "Searching jobs..."}
              </p>
            ) : results.length === 0 ? (
              <div className="text-center">
                <h4>
                  {isCandidateSearch
                    ? "No candidates found"
                    : "No jobs found"}
                </h4>

                <p>
                  Try changing your search criteria.
                </p>
              </div>
            ) : isCandidateSearch ? (

              /* Candidate Results */
              
              <ul className="job-listings search-results-list">

                {results.map((candidate, index) => (
                  <li
                    key={candidate._id || index}
                    className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                  >

                    <div className="job-listing-logo">
                      <img
                        src={normalizeImageUrl(candidate.profilephoto)}
                        alt={candidate.name || "Candidate"}
                        className="img-fluid"
                      />
                    </div>

                    <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">

                      <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                        <h2>{candidate.name}</h2>

                        <strong>
                          {candidate.qualification}
                        </strong>

                        <p className="mb-1">
                          <strong>Skills:</strong>{" "}
                          {candidate.skills || "Not specified"}
                        </p>

                        <p className="mb-0">
                          <strong>Experience:</strong>{" "}
                          {candidate.experience || "Fresher"}
                        </p>
                      </div>

                      <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                        <span className="icon-room"></span>{" "}
                        {candidate.location || "Not specified"}
                      </div>

                      <div className="job-listing-type custom-width w-25">
                        <span className="badge badge-primary">
                          {candidate.jobtype || "Any"}
                        </span>
                      </div>

                    </div>

                  </li>
                ))}

              </ul>

            ) : (

              /* Job Results */
              <ul className="job-listings search-results-list">

                {results.map((job, index) => (
                  <li
                    key={job._id || index}
                    className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                  >

                    <div className="job-listing-logo">
                      <img
                        src={normalizeImageUrl(job.jobdata?.images)}
                        alt={job.jobdata?.organisation || "Company"}
                        className="img-fluid"
                      />
                    </div>

                    <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">

                      <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                        <h2>{job.post}</h2>

                        <strong>
                          {job.jobdata?.organisation}
                        </strong>
                      </div>

                      <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                        <span className="icon-room"></span>{" "}
                        {job.jobdata?.location}
                      </div>

                      <div className="job-listing-type custom-width w-25">
                        <span className="badge badge-primary">
                          {job.job_type}
                        </span>
                      </div>

                    </div>

                  </li>
                ))}

              </ul>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Search;