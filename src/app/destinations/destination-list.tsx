import {
  DestinationExplorer,
  type Destination,
} from "@/components/destination-explorer";

export async function DestinationList() {
  const res = await fetch("http://localhost:5000/destinations");
  const data: Destination[] = await res.json();

  return <DestinationExplorer destinations={data} />;
}
