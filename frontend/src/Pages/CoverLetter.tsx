import { useState } from "react";
import { useResumeData } from "../context/ResumeContext";

const CoverLetter = () => {
  const { generateCoverLetter, coverLetterLoading } = useResumeData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    recipientName: "",
    companyName: "",
    companyAddress: "",
    keywords: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    try {
      await generateCoverLetter(formData);
    } catch (error: any) {
      if (error.message === "NOT_PRO") {
        alert("Please activate Pro mode to generate cover letter");
        return;
      }
      if (error.message === "UNAUTHORIZED") {
        alert("Session expired. Please login again.");
        return;
      }
      alert("Failed to generate cover letter");
    }
  };

  // Modern UI Styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "32px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      marginBottom: "24px",
      borderBottom: "1px solid #eee",
      paddingBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "6px",
    },
    label: {
      fontSize: "14px",
      fontWeight: 600,
      color: "#444",
    },
    input: {
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "15px",
      minHeight: "120px",
      resize: "vertical" as const,
    },
    button: {
      marginTop: "24px",
      padding: "12px 24px",
      background: coverLetterLoading ? "#666" : "#0070f3",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: coverLetterLoading ? "not-allowed" : "pointer",
      width: "100%",
      transition: "background 0.2s",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ margin: 0, fontSize: "24px", color: "#111" }}>Generate Cover Letter</h2>
        <p style={{ color: "#666", marginTop: "4px" }}>Fill in the details below to create a tailored cover letter.</p>
      </div>

      <div style={styles.grid}>
        {/* Personal Details Section */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Your Name</label>
          <input name="name" placeholder="John Doe" onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input name="email" type="email" placeholder="john@example.com" onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone Number</label>
          <input name="phone" placeholder="+1 (555) 000-0000" onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Your Address</label>
          <input name="address" placeholder="City, State, Zip" onChange={handleChange} style={styles.input} />
        </div>

        {/* Company Details Section */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Hiring Manager</label>
          <input name="recipientName" placeholder="Jane Smith" onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Company Name</label>
          <input name="companyName" placeholder="Tech Corp" onChange={handleChange} style={styles.input} />
        </div>
      </div>

      <div style={{ ...styles.inputGroup, marginBottom: "16px", gridColumn: "span 2" }}>
        <label style={styles.label}>Company Address</label>
        <input name="companyAddress" placeholder="123 Business Way, Suite 100" onChange={handleChange} style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Focus Keywords / Job Description Highlights</label>
        <textarea
          name="keywords"
          placeholder="Mention my experience with React, my leadership in the last project, etc."
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={coverLetterLoading}
        style={styles.button}
      >
        {coverLetterLoading ? "Creating your masterpiece..." : "Generate Cover Letter"}
      </button>
    </div>
  );
};

export default CoverLetter;