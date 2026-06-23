"use client";
import React, { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const generatePdf = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("/api/resume/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `http://localhost:3000/resume/${id}/print`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();

      const pdfUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `resume-${id}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        disabled={loading}
        onClick={generatePdf}
        className="px-4 py-2 bg-black text-red-400 rounded"
      >
        {loading ? "Generating" : "Download PDF"}
      </button>
      ;
    </div>
  );
};

export default Page;
