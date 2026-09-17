import { pillars } from '../data/content.js';
import SeamDivider from './SeamDivider.jsx';
import { useInView } from '../hooks/useInView.js';

export default function Manifesto() {
  const [headerRef, headerInView] = useInView();

  return (
    <section id="manifesto" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto transition-all duration-700
                      ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs tracking-widest3 uppercase text-champagne">This is my story</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-bone">
            Wear your story.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [ref, inView] = useInView();
            return (
              <article
                key={pillar.title}
                ref={ref}
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`stitch-card p-8 flex flex-col gap-4 transition-all duration-700
                            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <span className="font-display italic text-champagne-muted text-sm">{pillar.mark}</span>
                <h3 className="font-display text-2xl text-bone">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-ash">{pillar.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-24 md:mt-32 px-6 md:px-10">
        <SeamDivider />
      </div>
    </section>
  );
}
