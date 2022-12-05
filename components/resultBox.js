import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import moment from "moment";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "@mantine/hooks";
//* ------------------------------ Import Assets ----------------------------- */
import { useEffect, useRef, useState } from "react";
import { Badge } from "@mantine/core";

function ResultBox({ matches }) {
  const [heroMatches, setHeroMatches] = useState([]);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const isLarger = useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    function getCurrentMatches(matches) {
      let today = moment();
      let nextDay = moment().add(1, "days");
      return matches.filter((match) => {
        let formatPattern = "DD MM YY";
        let matchDate = moment(match.utcDate).format(formatPattern);
        return (
          matchDate === today.format(formatPattern) ||
          matchDate === nextDay.format(formatPattern)
        );
      });
    }
    setHeroMatches(getCurrentMatches(matches).reverse());
  }, [matches]);

  return (
    <>
      <Carousel
        sx={{ maxWidth: "100%" }}
        mx="auto"
        withIndicators
        controlsOffset={-36}
        height="100%"
        controlSize={36}
        plugins={[autoplay.current]}
        className="py-8 sm:py-8 md:py-16"
      >
        {heroMatches.map((heroMatch) => {
          return (
            <Carousel.Slide key={heroMatch.id}>
              <div className="flex gap-4 items-center h-full">
                <Team team={heroMatch.homeTeam} />
                <div className="flex h-full flex-col gap-4 items-center justify-around flex-1">
                  {heroMatch.status === "TIMED" ? (
                    <div className="flex flex-col h-full gap-4 justify-center items-center">
                      <Badge size={isLarger ? "lg" : "sm"} color="indigo">
                        {heroMatch.status}{" "}
                        {moment
                          .utc(heroMatch.utcDate)
                          .local()
                          .format("HH:mm DD/MM")}
                      </Badge>
                      <Timer heroMatch={heroMatch} />
                      <div className="text-center">
                        <h4>{heroMatch.stage.replace("_", " ")}</h4>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full">
                      <Badge
                        size={isLarger ? "lg" : "sm"}
                        color={
                          heroMatch.status === "IN_PLAY" ? "green" : "indigo"
                        }
                        variant={
                          heroMatch.status === "IN_PLAY" ? "dot" : "light"
                        }
                      >
                        {heroMatch.status === "IN_PLAY"
                          ? "IN PLAY"
                          : "FINISHED" +
                            " " +
                            moment
                              .utc(heroMatch.utcDate)
                              .local()
                              .format("DD/MM")}
                      </Badge>
                      <div className="result flex text-center w-full hero mt-4 justify-evenly">
                        <h2>{heroMatch?.score?.fullTime?.home}</h2>
                        <h2>:</h2>
                        <h2>{heroMatch?.score?.fullTime?.away}</h2>
                      </div>
                      <div className="result text-center text-gray-200 mb-2 flex w-full justify-evenly">
                        <h3>
                          {heroMatch?.score?.halfTime?.home ||
                            heroMatch?.score?.fullTime?.home}
                        </h3>
                        <h3>:</h3>
                        <h3>
                          {heroMatch?.score?.halfTime?.away ||
                            heroMatch?.score?.fullTime?.away}
                        </h3>
                      </div>
                      <h4>{heroMatch.stage.replace("_", " ")}</h4>
                    </div>
                  )}
                </div>
                <Team team={heroMatch.awayTeam} />
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </>
  );
}

export function Timer({ heroMatch }) {
  const [time, setTime] = useState(moment().format("HH:mm:ss"));

  useEffect(() => {
    let timeUntil = 0;
    setInterval(() => {
      timeUntil = moment.duration(moment(heroMatch.utcDate).local() - moment());
      setTime(
        `${Math.floor(timeUntil.asHours())}:${Math.floor(
          timeUntil.minutes()
        )}:${Math.floor(timeUntil.seconds())}`
      );
    }, 1000);
  }, [heroMatch]);

  return (
    <div className="result justify-center flex w-full">
      <h2>{time}</h2>
    </div>
  );
}

function Team({ team }) {
  return (
    <div className="flex-1 text-center">
      <Image src={team.crest} objectFit="contain" width={250} height={150} />
      <h3>{team.name}</h3>
    </div>
  );
}

export default ResultBox;
