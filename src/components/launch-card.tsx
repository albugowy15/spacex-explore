import { Launch } from "@/app/page";
import Link from "next/link";
import { parseISO, format } from "date-fns";

interface LaunchCardProps extends React.ComponentPropsWithoutRef<"div"> {
  data: Launch;
}

const LaunchCard = ({ data }: LaunchCardProps) => {
  return (
    <div className="p-5 rounded-md border border-zinc-800 w-fit flex flex-col gap-2">
      <h3 className="font-semibold text-xl">
        {data.mission_name} - {data.launch_year}
      </h3>
      <div>
        <p>
          Date (UTC):{" "}
          <strong>{parseISO(data.launch_date_utc).toUTCString()}</strong>
        </p>
        <p>
          Rocket: <strong>{data.rocket.rocket_name}</strong>
        </p>
      </div>

      <div className="flex justify-between">
        <Link
          href={`/${data.id}`}
          className="text-sm font-semibold bg-blue-600 py-2 px-4 rounded-md "
        >
          Detail
        </Link>
        <Link
          href={`/${data.id}/add-note`}
          className="text-sm font-semibold bg-orange-600 py-2 px-4 rounded-md "
        >
          Add Note
        </Link>
      </div>
    </div>
  );
};

export { LaunchCard };
