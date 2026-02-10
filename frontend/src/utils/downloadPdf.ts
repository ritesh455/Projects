export const triggerPdfDownload = (pdfBlob: Blob) => {
  const url = window.URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "resume.pdf";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
