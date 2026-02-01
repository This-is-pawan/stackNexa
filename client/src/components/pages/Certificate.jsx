import React, { useRef } from "react";
import { useAppContext } from "../ContextApi";
import { certificate } from "../data";
import { GiLaurelCrown } from "react-icons/gi";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ✅ Correct relative import
import stackNexaLogo from "../../assets/stackNexaLogo.png"; 

const Certificate = () => {
  const { theme, setBar, setOpen, auth, Googleuser } = useAppContext();
  const currentUser = auth?.user || Googleuser?.user;
  const certificateData = certificate[0];
  const certificateRef = useRef(null);

  const verifyURL = `https://stacknexa.in/verify/${certificateData.certificateId}`;

  // 📄 High-Resolution PDF Download
  const downloadPDF = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, {
      scale: 4,       // high resolution
      useCORS: true,  // allow cross-origin images
      allowTaint: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${currentUser?.name || "certificate"}-StackNexa.pdf`);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
            : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
        }`}
      onClick={() => {
        setBar(false);
        setOpen(false);
      }}
    >
      {/* Download Button */}
      <div className="max-w-7xl mx-auto flex justify-end mb-4">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 text-sm sm:text-base rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Certificate */}
      <div className="max-w-7xl mx-auto flex justify-center">
        <div
          ref={certificateRef}
          className={`relative w-full max-w-6xl rounded-3xl p-6 sm:p-10 shadow-2xl border
           ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
            : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
        }`}
        >
          {/* Icon */}
          <div
            className={`absolute top-3 right-3 p-2 sm:p-3 rounded-full
              ${
                theme === "dark"
                  ? "bg-yellow-400 text-black"
                  : "bg-indigo-600 text-white"
              }`}
          >
            <GiLaurelCrown size={18} className="sm:hidden" />
            <GiLaurelCrown size={24} className="hidden sm:block" />
          </div>

          {/* Header Logo */}
          <div className="text-center mb-4 sm:mb-6">
            <img
              src={stackNexaLogo}
              alt="StackNexa"
              className="mx-auto w-36 sm:w-48 object-cover "
            />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] mt-1 opacity-80">
              SKILL • PROJECT • CAREER
            </p>
          </div>

          {/* Title */}
          <h2 className="text-center mt-4 sm:mt-6 text-lg sm:text-3xl font-semibold uppercase">
            Certificate of Completion
          </h2>

          {/* Body */}
          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-lg leading-relaxed">
            <p>This is to certify that</p>

            <h3 className="text-lg sm:text-3xl font-bold mt-2 sm:mt-3 text-yellow-300">
              {currentUser?.name || certificateData.name}
            </h3>

            <p className="mt-2 sm:mt-3">has successfully completed</p>

            <p className="mt-1 sm:mt-2 text-indigo-400 font-semibold text-sm sm:text-lg">
              {certificateData.project}
            </p>

            <p className="mt-2 sm:mt-3 max-w-3xl mx-auto text-[11px] sm:text-base">
              using <strong>{certificateData.tech}</strong>, demonstrating real-world
              experience with authentication, APIs, databases, and clean architecture.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between">
            {/* Left Info */}
            <div className="text-[10px] sm:text-sm opacity-80 text-center sm:text-left">
              <p>
                <strong>Certificate ID:</strong> {certificateData.certificateId}
              </p>
              <p>
                <strong>Issued On:</strong> {certificateData.date}
              </p>
              <p>
                Verify at{" "}
                <span className="text-indigo-400 break-all">{verifyURL}</span>
              </p>
            </div>

            {/* QR */}
            <div className="w-full sm:w-auto flex flex-col items-center justify-center">
              <QRCode value={verifyURL} size={100} />
              <p className="text-[10px] sm:text-xs mt-2 opacity-70 text-center">
                Scan via Google Lens or QR Scanner
              </p>
            </div>

            {/* Signature + Footer Logo */}
            <div className="text-center">
              <div className="border-t-2 border-yellow-400 w-36 sm:w-44 mx-auto mb-2" />
              <p className="text-xs sm:text-base font-semibold">Pawan Jalandhara</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80">
                Founder
              </p>
              <img
                src={stackNexaLogo}
                alt="StackNexa"
                className="mx-auto w-24 sm:w-32 mt-1 object-cover "
              />
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 sm:mt-8 text-[9px] sm:text-xs text-center opacity-60">
            This certificate verifies project-based skills and does not guarantee
            employment or salary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
