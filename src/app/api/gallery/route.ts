import { NextResponse } from "next/server";

// Maps whatever category label/slug the user submitted → our internal slug
const CATEGORY_MAP: Record<string, string> = {
  "software dev":       "software-dev",
  "software-dev":       "software-dev",
  "content strategy":   "content-strategy",
  "content-strategy":   "content-strategy",
  "creative design":    "creative-design",
  "creative-design":    "creative-design",
  "data & analytics":   "data-analytics",
  "data analytics":     "data-analytics",
  "data-analytics":     "data-analytics",
  "marketing":          "marketing",
  "education":          "education",
  "business":           "business",
  "research":           "research",
  "writing & editing":  "writing",
  "writing":            "writing",
};

function mapCategory(cat?: string): string {
  if (!cat) return "other";
  return CATEGORY_MAP[cat.toLowerCase().trim()] ?? "other";
}

export async function GET() {
  try {
    const base  = process.env.AIRTABLE_BASE_ID;
    const table = process.env.AIRTABLE_TABLE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!base || !table || !token) {
      return NextResponse.json({ prompts: [] });
    }

    const params = new URLSearchParams({
      filterByFormula:      `{Status}="approved"`,
      "sort[0][field]":     "Title",
      "sort[0][direction]": "asc",
    });

    const res = await fetch(
      `https://api.airtable.com/v0/${base}/${table}?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("[gallery] Airtable fetch failed:", res.status);
      return NextResponse.json({ prompts: [] });
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prompts = (data.records ?? []).map((record: any) => {
      const f = record.fields ?? {};

      // Description → use dedicated field; fall back to first 130 chars of prompt
      const rawPrompt:    string = f.Prompt      ?? "";
      const description:  string = f.Description ?? "";
      const snippet = description
        ? description
        : rawPrompt.slice(0, 130).trimEnd() + (rawPrompt.length > 130 ? "…" : "");

      // Tags → split comma-separated string into array; default to ["Community"]
      const rawTags: string = f.Tags ?? "";
      const tags = rawTags
        ? rawTags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["Community"];

      return {
        id:            record.id,
        title:         f.Title        ?? "Untitled",
        category:      mapCategory(f.Category),
        categoryLabel: f.Category     ?? "Other",
        snippet,
        tags,
        author:        f.Author       ?? "Anonymous",
        fullPrompt:    rawPrompt,
        isCommunity:   true,
      };
    });

    return NextResponse.json({ prompts });
  } catch (err) {
    console.error("[gallery] Unexpected error:", err);
    return NextResponse.json({ prompts: [] });
  }
}
