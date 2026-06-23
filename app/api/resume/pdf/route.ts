import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json(
        { success: false, message: "URL is required" },
        { status: 400 },
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20",
        right: "0",
        bottom: "20",
        left: "0",
      },
    });

    await browser.close();

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to generate PDF",
      },
      { status: 500 },
    );
  }
}
