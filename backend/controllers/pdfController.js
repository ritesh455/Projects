const puppeteer = require("puppeteer");

exports.generatePdf = async (req, res) => {
  const html = req.body.html; // resume HTML from frontend

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

/* 🔹 ADD THIS BLOCK (VERY IMPORTANT) */
await page.addStyleTag({
  content: `
    @page {
      size: A4;
      margin: 20mm;
    }

    body {
      font-size: 11pt;
      line-height: 1.4;
      font-family: Arial, Helvetica, sans-serif;
      color: #000;
    }

    section {
      page-break-inside: avoid;
      margin-bottom: 12px;
    }

    /* ===== EDUCATION TABLE FIX ===== */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }

    thead {
      background-color: #f2f2f2;
    }

    th, td {
      border: 1px solid #000;
      padding: 6px 8px;
      text-align: left;
      font-size: 10.5pt;
    }

    th {
      font-weight: bold;
    }

    /* Prevent row breaking across pages */
    tr {
      page-break-inside: avoid;
    }
  `,
});


const pdfBuffer = await page.pdf({
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: "20mm",
    bottom: "20mm",
    left: "20mm",
    right: "20mm",
  },
  scale: 1,
});


  // const pdfBuffer = await page.pdf({
  //   format: "A4",
  //   printBackground: true,
  // });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf",
  });

  res.send(pdfBuffer);
};
