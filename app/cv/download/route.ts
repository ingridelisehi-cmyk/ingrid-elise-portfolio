import {readFile} from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Ingrid-Elise-CV.pdf");
  const fileBuffer = await readFile(filePath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ingrid-Elise-CV.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
