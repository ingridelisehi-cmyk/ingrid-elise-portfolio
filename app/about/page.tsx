import PortraitImage from "./portrait-image";

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-intro">
        <p className="eyebrow">ABOUT</p>
        <h1 className="about-title">A LITTLE MORE <span className="about-title-accent">ABOUT ME</span></h1>
      </div>

      <div className="about-grid section">
        <div className="about-portrait-wrap">
          <PortraitImage />
        </div>

        <div className="grid about-copy" style={{ gap: "1rem" }}>
          <p className="lead">
            I’ve always been interested in how an idea can go from something you
            imagine to something people can actually see, experience and engage
            with.
          </p>
          <p>
            That curiosity has taken me from studying Fashion &amp; Textiles in
            Sydney to building my own fashion brand, and later to a master’s
            degree in Marketing Management. Along the way, I’ve worked across
            concept development, visual direction, content, e-commerce, customer
            experience and launches. I’ve found that I thrive where creativity
            and commercial thinking come together.
          </p>
          <p>
            I like taking an idea and turning it into something tangible.
            Exploring a concept, finding the right visual expression, creating
            content and developing it until it feels right. I also value
            structure and momentum. <strong>What gives me the most energy is creating, developing and seeing ideas take shape.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
