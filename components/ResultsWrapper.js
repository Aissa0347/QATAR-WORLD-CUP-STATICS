import { Paper, Accordion, Badge } from "@mantine/core";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

//* ------------------------------ Import Assets ----------------------------- */
import flag from "../assets/spain.webp";

function ResultsWrapper({ matches }) {
  const [groupStages, setGroupStages] = useState([]);
  const [last16, setLast16] = useState([]);
  const [quarterFinals, setQuarterFinals] = useState([]);
  const [semiFinals, setSemiFinals] = useState([]);
  const [thirdPlace, setThirdPlace] = useState([]);
  const [final, setFinal] = useState([]);

  useEffect(() => {
    setGroupStages(
      matches.filter(
        (match) =>
          match.stage === "GROUP_STAGE" &&
          match.homeTeam.name !== "Denmark" &&
          match.awayTeam.name !== "Denmark"
      )
    );
    setLast16(matches.filter((match) => match.stage === "LAST_16"));
    setQuarterFinals(
      matches.filter((match) => match.stage === "QUARTER_FINALS")
    );
    setSemiFinals(matches.filter((match) => match.stage === "SEMI_FINALS"));
    setThirdPlace(matches.filter((match) => match.stage === "THIRD_PLACE"));
    setFinal(matches.filter((match) => match.stage === "FINAL"));
  }, [matches]);

  return (
    <div className="w-full flex flex-col gap-12 justify-center">
      {final.every(
        (match) => match.homeTeam.name !== null || match.awayTeam.name !== null
      ) ? (
        <div className="stages-container">
          <h3 className="stage-header text-forth">FINAL</h3>
          <div className="stages-wrapper">
            {final.map((match) => (
              <SmallResultBox key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : null}

      {thirdPlace.every(
        (match) => match.homeTeam.name !== null || match.awayTeam.name !== null
      ) ? (
        <div className="stages-container">
          <h3 className="stage-header text-forth">THIRD PLACE</h3>
          <div className="stages-wrapper">
            {thirdPlace.map((match) => (
              <SmallResultBox key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : null}

      {semiFinals.every(
        (match) => match.homeTeam.name !== null || match.awayTeam.name !== null
      ) ? (
        <div className="stages-container">
          <h3 className="stage-header text-forth">SEMI FINALS</h3>
          <div className="stages-wrapper">
            {semiFinals.map((match) => (
              <SmallResultBox key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : null}

      {quarterFinals.every(
        (match) => match.homeTeam.name !== null || match.awayTeam.name !== null
      ) ? (
        <div className="stages-container">
          <h3 className="stage-header text-forth">QUARTER FINALS</h3>
          <div className="stages-wrapper">
            {quarterFinals.map((match) => (
              <SmallResultBox key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : null}

      {last16.every(
        (match) => match.homeTeam.name !== null || match.awayTeam.name !== null
      ) ? (
        <div className="stages-container">
          <h3 className="stage-header text-forth">LAST 16</h3>
          <div className="stages-wrapper">
            {last16.map((match) => (
              <SmallResultBox key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : null}

      {groupStages.every(
        (match) => match.homeTeam.name !== null || match.awayTeam.name !== null
      ) ? (
        <div className="stages-container">
          <h3 className="stage-header text-forth">GROUP STAGES</h3>
          <div className="stages-wrapper">
            {groupStages.map((match) => (
              <SmallResultBox key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SmallResultBox({ match }) {
  let matchDate = moment.utc(match.utcDate).local();
  let isPassed = match.status === "IN_PLAY";

  return (
    <>
      <Paper
        radius="md"
        shadow="sm"
        className="max-w-lg w-full border border-forth bg-white/40"
      >
        <div className="flex w-full px-4 gap-2 items-center  h-28">
          <div>
            <Image
              className="flex-1"
              src={match.homeTeam.crest || flag}
              width={100}
              height={70}
              objectFit="contain"
            />
            <h4 className="whitespace-nowrap">{match.homeTeam.name}</h4>
          </div>
          {match.status === "TIMED" ? (
            <div className="flex-1 ">
              <Badge mb="sm" size="lg">
                {"TIMED " + " / " + matchDate.format("DD MMM HH:mm")}
              </Badge>
              <div className="flex flex-1 gap-4 justify-center text-center w-full">
                <h3>VS</h3>
              </div>
            </div>
          ) : (
            <div className="flex-1 ">
              <Badge
                mb="sm"
                size="lg"
                variant={isPassed ? "dot" : "light"}
                color={isPassed ? "green" : "orange"}
              >
                {isPassed
                  ? "LIVE "
                  : match.status + " / " + matchDate.format("DD MMM")}
              </Badge>
              <div className="flex flex-1 gap-4 justify-center text-center">
                <h3>{match.score.fullTime.home}</h3>
                <h3>:</h3>
                <h3>{match.score.fullTime.away}</h3>
              </div>
              <div className="flex flex-1 gap-4 justify-center text-center">
                <h5>
                  {match.score.halfTime.home || match.score.fullTime.home}
                </h5>
                <h5>:</h5>
                <h5>
                  {match.score.halfTime.away || match.score.fullTime.away}
                </h5>
              </div>
            </div>
          )}
          <div>
            <Image
              className="flex-1"
              src={match.awayTeam.crest || flag}
              width={100}
              height={70}
              objectFit="contain"
            />
            <h4 className="whitespace-nowrap">{match.awayTeam.name}</h4>
          </div>
        </div>
        {/* <Accordion variant="contained" chevronPosition="left" radius="none">
          <Accordion.Item value="more details">
            <Accordion.Control className="h-10 py-0  text-forth hover:underline no-underline text-center">
              see details
            </Accordion.Control>
            <Accordion.Panel>here is the details</Accordion.Panel>
          </Accordion.Item>
        </Accordion> */}
      </Paper>
    </>
  );
}

export default ResultsWrapper;
