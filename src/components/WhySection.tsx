type WhySectionProps = {
  heading: string;
  subtitle: string;
  problemText: string;
  whatWeDoText: string;
  whatYouGetText: string;
};

export function WhySection({ heading, subtitle, problemText, whatWeDoText, whatYouGetText }: WhySectionProps) {
  return (
    <section className="why-section">
      <div className="why-inner">
        <h2>{heading}</h2>
        <p className="why-subtitle">{subtitle}</p>
        <div className="why-grid">
          <div className="why-card">
            <h3>The Problem</h3>
            <p>{problemText}</p>
          </div>
          <div className="why-card">
            <h3>What We Do</h3>
            <p>{whatWeDoText}</p>
          </div>
          <div className="why-card">
            <h3>What You Get</h3>
            <p>{whatYouGetText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
