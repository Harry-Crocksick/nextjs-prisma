"use server";

import { prisma } from "./prisma-client";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    description?: string;
  };
  message?: string | null;
};

const FormSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required!",
    })
    .min(1),
  lastName: z
    .string({
      required_error: "Last Name is required!",
    })
    .min(1),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email({ message: "Email is not valid!" }),
  title: z
    .string({
      required_error: "Title is required!",
    })
    .min(5, { message: "Should contain minimum of 5 characters!" }),
  description: z.string().optional(),
});

export async function getUser(id: number) {
  try {
    const result = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deletePost(postId: number) {
  try {
    await prisma.post.delete({ where: { id: Number(postId) } });
    console.log("Successfully deleted post...!");
  } catch (err) {
    console.log("Failed to delete post...!");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
  redirect("/");
}

export async function updatePost(
  postId: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update post",
    };
  }

  const { firstName, lastName, email, title, description } =
    validatedFields.data;

  try {
    const result = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        firstName,
        lastName,
        email,
        title,
        description,
      },
    });
    console.log("Successfully updated...!");
    console.dir(result, { depth: null });
  } catch (err) {
    console.log("Failed to update post...!");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }

  redirect("/");
}

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create post",
    };
  }

  const { firstName, lastName, email, title, description } =
    validatedFields.data;

  try {
    const result = await prisma.post.create({
      data: {
        firstName,
        lastName,
        email,
        title,
        description,
      },
    });
    console.log("Successfully create post...!");
    console.dir(result, { depth: null });
  } catch (err) {
    console.log("Failed to create post...!");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
  redirect("/");
}
