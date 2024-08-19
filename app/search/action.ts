"use server";

import db from "@/lib/db";
import { Tweet } from "@prisma/client";
import { z } from "zod";

async function getTweetByKeyword(keyword: string) {
  const tweets = db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweets;
}

const formScheme = z.string().trim();

export async function SearchAction(prevState: Tweet[], formData: FormData) {
  const data = formData.get("keyword");
  const result = formScheme.parse(data);
  const tweets = await getTweetByKeyword(result);
  return [...tweets];
}
