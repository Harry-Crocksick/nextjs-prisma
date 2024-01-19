"use client";
import { useRouter } from "next/navigation";
import { deletePost } from "@/utils/actions";
import Button from "@/components/Button";

export default async function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const deletePostWithId = deletePost.bind(null, Number(params.id));

  return (
    <form action={deletePostWithId}>
      <p>Are you sure to delete?</p>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <Button>Sure</Button>
    </form>
  );
}
