import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, author, tags, prompt } = body;

    if (!title?.trim() || !description?.trim() || !prompt?.trim()) {
      return NextResponse.json(
        { error: "Title and prompt are required" },
        { status: 400 }
      );
    }

    const base  = process.env.AIRTABLE_BASE_ID;
    const table = process.env.AIRTABLE_TABLE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!base || !table || !token) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const res = await fetch(`https://api.airtable.com/v0/${base}/${table}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Title:       title.trim(),
          Description: description.trim(),
          Category:    category  || "Other",
          Author:      author?.trim() || "Anonymous",
          Tags:        tags?.trim() || "",
          Prompt:      prompt.trim(),
          Status:      "pending",
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[submit] Airtable error:", err);
      return NextResponse.json({ error: "Submission failed" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("[submit] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
