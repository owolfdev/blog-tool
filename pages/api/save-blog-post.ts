// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeBlogPostToSupabase } from "../../utils/supabase/sb-utils";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  writeBlogPostToSupabase(req.body);
  res.status(200).json({ message: "Blog Post Saved" });
}
