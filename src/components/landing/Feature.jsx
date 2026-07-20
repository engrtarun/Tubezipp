import React from "react";
import { Brain, Clock3, MessageSquare, FileText } from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI Summaries",
    desc: "Understand long YouTube videos in seconds with structured AI-generated notes.",
  },
  {
    icon: <Clock3 size={28} />,
    title: "Smart Timestamps",
    desc: "Jump directly to the exact section you're looking for.",
  },
  {
    icon: <MessageSquare size={28} />,
    title: "Ask Questions",
    desc: "Chat with the video and get instant answers from its content.",
  },
  {
    icon: <FileText size={28} />,
    title: "Clean Notes",
    desc: "Beautiful, organized notes ready for revision or sharing.",
  },
];

const Features = () => {
  return (
    <section id="features" className="scroll-mt-20 py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need to learn faster
          </h2>

          <p className="mt-4 text-gray-600">
            Built for students, developers and lifelong learners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 p-8 text-gray-900 hover:shadow-lg transition"
            >
              <div className="mb-6">{item.icon}</div>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;
