import Head from "next/head";
import Image from "next/image";
import ResultBox from "../components/resultBox";
import ResultsWrapper from "../components/ResultsWrapper";
import Standings from "../components/Standings";
import { useEffect, useState } from "react";

//* ------------------------------ Import Assets ----------------------------- */
const logoMark = require("../assets/logoMark.png");
import tradMark from "../assets/tradMark.png";
import { ActionIcon, Paper } from "@mantine/core";
import moment from "moment";

export default function Home({ matchesData, standingsData }) {
  const [matches, setMatches] = useState([]);
  const [resultSet, setResultSet] = useState([]);

  useEffect(() => {
    setResultSet(matchesData.resultSet);
    setMatches(matchesData.matches.reverse());
  }, [matchesData]);

  return (
    <div className="bg-dark h-max max-w-[100vw] overflow-hidden ">
      <Head>
        <title>QATAR WORLD CUP</title>
        <meta
          name="description"
          content="QATAR WORLD CUP STATICS AT REALTIME, EXPLORE YOUR FAVORITE TEAM RESULT"
        />
        <meta property="og:title" content="نتائج مباريات كأس العالم" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="www.qatar2022.com" />
        <meta property="og:image" content="/image.webp" />
        <meta
          property="og:description"
          content="تابع نتائج مباريات كأس العالم فيفا قطر 2022 على المباشر"
        />
        <link rel="icon" href="/favicons.ico" />
      </Head>

      <main className="h-full relative  overflow-hidden">
        <header className="flex flex-col px-4 pb-16 w-full h-max bg-center bg-secondary bg-contain bg-no-repeat bg-[url('../assets/bg.png')]">
          <div className="flex justify-between items-center px-4 pt-8 pb-4 ">
            <Image
              width={50}
              height={50}
              objectFit="contain"
              src={logoMark}
              alt="brand"
            />
            <svg
              width="60"
              height="24"
              viewBox="0 0 86 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="header_logo__ajtTL header_blueLogo__tbSKt"
            >
              <path
                d="M0 .024V28h8.714V17.904h6.041l2.347-6.133H8.714V6.11h10.224l2.23-6.086H0zM23.818.024L23.795 28h8.62V.024h-8.597zM66.179 18.87l3.323-11.652 3.439 11.653h-6.762zM74.103.025H65.18L55.28 28h8.32l1.068-3.75h9.69L75.474 28h8.574L74.103.024zM38.341.024V28h8.714V17.904h6.041l2.37-6.133h-8.411V6.109h10.224L59.533.024H38.341zM82.212 2.996h.605c.093 0 .185 0 .278-.024.093 0 .163-.047.233-.07a.547.547 0 00.162-.166.509.509 0 00.07-.283.428.428 0 00-.07-.26c-.046-.07-.093-.117-.162-.14a.444.444 0 00-.233-.072c-.093 0-.162-.023-.255-.023h-.604v1.038h-.024zm-.697-1.58h1.371c.442 0 .79.07 1 .235.232.165.348.448.348.85 0 .306-.07.542-.256.707-.162.165-.395.26-.697.283l.976 1.628h-.697l-.953-1.604h-.395v1.604h-.697V1.415zM82.77 5.92c.349 0 .65-.071.953-.189.302-.141.558-.307.767-.542.209-.236.395-.52.534-.826.116-.33.186-.684.186-1.062 0-.377-.07-.73-.186-1.061-.14-.33-.302-.59-.534-.826-.233-.236-.465-.424-.767-.542a2.544 2.544 0 00-.953-.189c-.349 0-.65.07-.953.189-.302.141-.557.306-.766.542-.21.236-.395.52-.512.826a3.18 3.18 0 00-.186 1.061c0 .378.07.732.186 1.062.14.33.302.59.511.826.233.235.489.424.767.542.28.118.605.189.953.189zm0 .637a3.23 3.23 0 01-1.255-.26 3.076 3.076 0 01-1.022-.707 3.186 3.186 0 01-.674-1.038 3.364 3.364 0 01-.256-1.274 3.364 3.364 0 01.93-2.312A3.466 3.466 0 0181.515.26C81.91.071 82.33 0 82.77 0c.442 0 .86.07 1.255.26.395.165.72.4 1.022.707.28.307.535.637.697 1.038.163.401.256.826.256 1.274 0 .448-.093.873-.256 1.274a3.127 3.127 0 01-.697 1.038 2.859 2.859 0 01-1.022.707 3.23 3.23 0 01-1.255.26z"
                fill="#ffff"
              ></path>
            </svg>
          </div>
          <div className="w-full flex-1 items-center flex flex-col">
            <h1 className="text-white  mt-8 mb-4 md:mt-12 md:mb-8">
              WORLD CUP QATAR
            </h1>
            <div className="carousel  rounded-xl py-4  md:px-12 px-4 shadow-2xl max-w-[1000px] w-full  bg-gray-100">
              <ResultBox matches={matches} />
            </div>
          </div>
          <Paper
            className="flex gap-2 md:gap-4 flex-col-reverse  md:flex-row justify-center items-center w-fit mx-auto"
            radius="md"
            shadow="sm"
            mt={8}
            p={16}
          >
            <Image
              height={40}
              width={120}
              objectFit="contain"
              src={tradMark}
            ></Image>
            <h3 className="text-gray-600 text-lg leading-5">{`MATCH PLAYED : ${resultSet.played}/${resultSet.count}`}</h3>
            <h3 className="text-gray-600 text-lg leading-5">
              {moment(resultSet.first).format("DD MMM Y")}
              {" / "}
              {moment(resultSet.last).format("DD MMM Y")}
            </h3>
          </Paper>
        </header>
        <div className="h-full bg-gray-100 py-8 px-4">
          <h2 className="text-center my-6 h3-text">ALL MATCHES</h2>
          <ResultsWrapper matches={matches} />
        </div>
        <div className="h-max bg-gray-100 py-8 px-4">
          <h2 className="text-center my-6 h3-text">STANDINGS</h2>
          <Standings standingsData={standingsData} />
        </div>
        <ActionIcon
          className="scroll-Btn"
          size="lg"
          onClick={() =>
            window.scrollTo({ left: 0, top: 0, behavior: "smooth" })
          }
        >
          <div className="gg-chevron-up"></div>
        </ActionIcon>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="text-white text-center p-4">
      <h2>MADED BY AISSA SEMAOUI</h2>
      <p className="font-light">
        Football data provided by the Football-Data.org API
      </p>
    </div>
  );
}

export const getStaticProps = async () => {
  let matches = await fetch(
    "http://api.football-data.org/v4/competitions/2000/matches",
    {
      headers: {
        "X-Auth-Token": "73aa2b16c89a4f7e9033b065c3fd9018",
      },
    }
  );

  let standings = await fetch(
    "http://api.football-data.org/v4/competitions/2000/standings",
    {
      headers: {
        "X-Auth-Token": "73aa2b16c89a4f7e9033b065c3fd9018",
      },
    }
  );

  let matchesData = await matches.json();

  let standingsData = await standings.json();

  return {
    props: {
      matchesData,
      standingsData,
    },
    revalidate: 60,
  };
};
