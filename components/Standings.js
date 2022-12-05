import { Paper, Table } from "@mantine/core";
import { useEffect, useState } from "react";

function Standings({ standingsData }) {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    setStandings(standingsData.standings);
  }, [standingsData]);

  return (
    <div className="standings flex justify-center flex-wrap gap-4">
      {standings.map((standing) => {
        return <GroupStanding key={standing.group} standing={standing} />;
      })}
    </div>
  );
}

function GroupStanding({ standing }) {
  return (
    <Paper
      radius="md"
      shadow="md"
      className="bg-white border pt-4 border-forth h-full overflow-auto  w-full max-w-2xl "
    >
      <h3 className="text-center">{standing.group.replace("_", " ")}</h3>
      <TableStanding table={standing.table} />
    </Paper>
  );
}

function TableStanding({ table }) {
  const rows = table
    .sort((prev, next) => prev.position - next.position)
    .map((team) => (
      <tr key={team.team.id}>
        <td>{team.team.name}</td>
        <td>{team.won}</td>
        <td>{team.draw}</td>
        <td>{team.lost}</td>
        <td>{team.goalsFor}</td>
        <td>{team.goalsAgainst}</td>
        <td>{team.points}</td>
      </tr>
    ));

  return (
    <Table horizontalSpacing="xs" verticalSpacing="sm" fontSize="sm">
      <thead>
        <tr>
          <th>Team</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>goals</th>
          <th>goals against</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Standings;
