const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-16"
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "600", marginBottom: "20px" }}>
        About VyaparMate
      </h1>

      <p style={{ marginBottom: "16px", lineHeight: "1.7" }}>
        <strong>VyaparMate</strong> is an AI-powered UPI payment and business
        intelligence platform built to empower India’s small businesses and MSMEs.
      </p>

      <p style={{ marginBottom: "16px", lineHeight: "1.7" }}>
        Unlike traditional payment apps, VyaparMate transforms daily UPI
        transactions into actionable insights—helping shopkeepers predict demand,
        optimize inventory, track expenses, and manage customer credit effortlessly.
      </p>

      <p style={{ lineHeight: "1.7" }}>
        With a calculator-simple interface and AI running silently in the
        background, VyaparMate bridges the gap between traditional shopkeeping and
        data-driven business growth.
      </p>
    </section>
  );
};

export default About;
