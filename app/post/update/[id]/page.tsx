import EditForm from "@/components/edit-form";
import { getUser } from "@/utils/actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(Number(params.id));

  if (!user) {
    notFound();
  }

  return <EditForm user={user} />;
}
