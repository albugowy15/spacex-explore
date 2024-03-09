import { LaunchCard } from "@/components/launch-card";
import { getClient } from "@/lib/graphql";
import { gql } from "@apollo/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpaceX Explorer",
  description: "SpaceX Launch Schedule Explorer",
};

export type Launch = {
  id: string;
  launch_date_utc: string;
  launch_year: string;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
};

type Launches = {
  launchNext: Launch;
  launchesUpcoming: Launch[];
};

const LaunchQuery = gql`
  query LaunchesQuery {
    launchNext {
      id
      launch_date_utc
      launch_year
      mission_name
      rocket {
        rocket_name
      }
    }
    launchesUpcoming {
      id
      launch_date_utc
      launch_year
      mission_name
      rocket {
        rocket_name
      }
    }
  }
`;

export default async function Home() {
  const { data }: { data: Launches } = await getClient().query({
    query: LaunchQuery,
  });
  return (
    <main className="flex justify-center items-center flex-col gap-8 p-5">
      <div>
        <h2 className="text-2xl font-bold text-center pb-2">Next Launch</h2>
        <LaunchCard data={data.launchNext} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center pb-2">
          Upcoming Launches
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {data.launchesUpcoming.map((item) => (
            <LaunchCard data={item} key={item.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
