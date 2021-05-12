import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { LaunchCard } from "../components/LaunchCard";
import styles from "../styles/Home.module.css";

export const config = { amp: "hybrid" };

export default function Home({ data }) {
  const [filter, setFilter] = useState(false);
  const [year, setYear] = useState("");
  const [launchSuccess, setLaunchSuccess] = useState("");
  const [landSuccess, setLandSuccess] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const makeRequest = async (year, landSuccess, launchSuccess) => {
    setLaunchSuccess(launchSuccess);
    setLandSuccess(landSuccess);
    setYear(year);
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?limit=100&launch_year=${year}&land_success=${landSuccess}&launch_success=${launchSuccess}`
    );
    const data = await response.json();

    if (year === "" && launchSuccess === "" && landSuccess === "")
      setFilter(false);
    else setFilter(true);
    setFilteredData(data);
  };

  const validate = (e, str) => {
    let yr;
    if (str === "year") yr = year;
    else if (str === "launch") yr = launchSuccess;
    else yr = landSuccess;
    if (yr !== e.target.value) yr = e.target.value;
    else yr = "";
    return yr;
  };

  let yearArray = [];
  for (let i = 2010; i <= 2020; i++) {
    yearArray.push(i);
  }
  return (
    <div className={styles.enclosing_div}>
      <Head>
        <title>SpaceX Launch Programs</title>
        <meta
          name="description"
          content="This website shows the data of SpaceX launch programs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>SpaceX Launch Programs</h1>

      <div className={styles.container}>
        <div className={styles.filter_container}>
          <h3>Filters</h3>
          <div className={styles.filter_controls}>
            <span className={styles.filter_heading}>Launch Year</span>
            <div className={styles.filter_yearBtn}>
              {yearArray.map((entry) => {
                return (
                  <button
                    className={` ${styles.filter_btn} ${
                      year === entry.toString() ? styles.active_btn : ""
                    }`}
                    value={entry}
                    onClick={(e) =>
                      makeRequest(
                        validate(e, "year"),
                        landSuccess,
                        launchSuccess
                      )
                    }
                  >
                    {entry}
                  </button>
                );
              })}
            </div>
            <span className={styles.filter_heading}>Successful Launch</span>
            <div className={styles.filter_yearBtn}>
              <button
                className={`${styles.filter_btn} ${
                  launchSuccess === ""
                    ? ""
                    : launchSuccess === "true"
                    ? styles.active_btn
                    : ""
                }`}
                value="true"
                onClick={(e) =>
                  makeRequest(year, landSuccess, validate(e, "launch"))
                }
              >
                True
              </button>
              <button
                className={`${styles.filter_btn} ${
                  launchSuccess === ""
                    ? ""
                    : launchSuccess === "false"
                    ? styles.active_btn
                    : ""
                }`}
                value="false"
                onClick={(e) =>
                  makeRequest(year, landSuccess, validate(e, "launch"))
                }
              >
                False
              </button>
            </div>
            <span className={styles.filter_heading}>Successful Landing</span>
            <div className={styles.filter_yearBtn}>
              <button
                className={`${styles.filter_btn} ${
                  landSuccess === ""
                    ? ""
                    : landSuccess === "true"
                    ? styles.active_btn
                    : ""
                }`}
                value="true"
                onClick={(e) =>
                  makeRequest(year, validate(e, "landing"), launchSuccess)
                }
              >
                True
              </button>
              <button
                className={`${styles.filter_btn} ${
                  landSuccess === ""
                    ? ""
                    : landSuccess === "false"
                    ? styles.active_btn
                    : ""
                }`}
                value="false"
                onClick={(e) =>
                  makeRequest(year, validate(e, "landing"), launchSuccess)
                }
              >
                False
              </button>
            </div>
          </div>
        </div>
        <div className={styles.card_container}>
          {filter
            ? filteredData.map((entry, ind) => (
                <LaunchCard key={ind} info={entry} />
              ))
            : data.map((entry, ind) => <LaunchCard key={ind} info={entry} />)}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const response = await fetch(
    `https://api.spacexdata.com/v3/launches?limit=100`
  );
  const data = await response.json();
  return {
    props: { data },
  };
}
