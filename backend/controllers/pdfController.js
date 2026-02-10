const puppeteer = require("puppeteer");

exports.generatePdf = async (req, res) => {
  const html = req.body.html; // resume HTML from frontend

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf",
  });

  res.send(pdfBuffer);
};
