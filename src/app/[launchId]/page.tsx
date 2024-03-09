import { gql } from "@apollo/client";
import { Launch } from "../page";
import { getClient } from "@/lib/graphql";
import { Note } from "./_components/note";
import { parseISO } from "date-fns";
import { Metadata } from "next";

export interface LaunchDetail extends Launch {
  mission_id: string[];
  links: {
    article_link: string;
    video_link: string;
    wikipedia: string;
  };
}

type LaunchById = {
  launch: LaunchDetail;
};

const LaunchDetailQuery = gql`
  query LauncDetailQuery($launchId: ID!) {
    launch(id: $launchId) {
      id
      launch_date_utc
      launch_year
      mission_id
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
      links {
        article_link
        video_link
        wikipedia
      }
    }
  }
`;

interface Params {
  params: {
    launchId: string;
  };
}

export const metadata: Metadata = {
  title: "Launch Detail - SpaceX Explorer",
  description: "Launch Detail - SpaceX Explorer",
};

export default async function LaunchDetailPage({ params }: Params) {
  const { data }: { data: LaunchById } = await getClient().query({
    query: LaunchDetailQuery,
    variables: { launchId: params.launchId },
  });
  return (
    <main className="flex py-6 flex-col gap-3 justify-center items-center">
      <h2 className="text-2xl font-bold">Launch id: {data.launch.id}</h2>

      <section className="flex flex-col gap-2">
        <p>
          id: <strong>{data.launch.id}</strong>
        </p>
        <p>
          mission_id: <strong>{data.launch.mission_id.join("")}</strong>
        </p>
        <p>
          mission_name: <strong>{data.launch.mission_name}</strong>
        </p>
        <p>
          date:{" "}
          <strong>{parseISO(data.launch.launch_date_utc).toUTCString()}</strong>
        </p>
        <p>
          year: <strong>{data.launch.launch_year}</strong>
        </p>
        <p>
          year: <strong>{data.launch.rocket.rocket_name}</strong>
        </p>
        <p>Links: </p>
        <ul className="list-disc ml-5">
          <li>Video: {data.launch.links.video_link}</li>
          <li>Article: {data.launch.links.article_link}</li>
          <li>Wikipedia: {data.launch.links.wikipedia}</li>
        </ul>
      </section>

      <Note launchId={params.launchId} />
    </main>
  );
}
