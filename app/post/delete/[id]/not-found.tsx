import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className=" underline text-blue-500 font-semibold ">
        Return Home
      </Link>
    </div>
  );
}
