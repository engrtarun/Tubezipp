import React from "react";

const steps = [
  {
    no: "01",
    title: "Paste YouTube Link",
    desc: "Drop any YouTube video URL.",
  },
  {
    no: "02",
    title: "AI Processes Video",
    desc: "Tubezip extracts transcripts and understands the content.",
  },
  {
    no: "03",
    title: "Start Learning",
    desc: "Read summaries, jump using timestamps and ask questions.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
          How it Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step) => (
            <div
              key={step.no}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="text-5xl font-bold text-blue-600 mb-6">
                {step.no}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
