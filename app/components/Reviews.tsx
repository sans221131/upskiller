"use client";
import { useEffect, useState } from "react";

export default function Reviews() {
  const reviews = [
    {
      id: "r1",
      name: "Priya Sharma",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "The Upskillers counsellor helped me shortlist the right MBA programs, refine my application, and prepare for the interview. Their personalised guidance got me admitted — could not have done it alone!",
      videoThumb: "🎥",
      role: "Senior Analyst at TCS"
    },
    {
      id: "r2",
      name: "Rahul Verma",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "The counsellor worked with me on my resume, application essays and connected me with programs that matched my goals. I received multiple offers thanks to their timely support.",
      videoThumb: "🎥",
      role: "Finance Manager at HDFC"
    },
    {
      id: "r3",
      name: "Sneha Patel",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 4,
      text: "Upskillers' team helped me evaluate ROI and choose a specialization. They assisted with documentation and made the entire process smooth and affordable.",
      videoThumb: "🎥",
      role: "Marketing Lead at Flipkart"
    },
    {
      id: "r4",
      name: "Amit Kumar",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "The personalised mentoring and application reviews were top-notch. My counsellor helped me highlight my experience effectively which led to a successful admission.",
      videoThumb: "🎥",
      role: "HR Director at Wipro"
    },
    {
      id: "r5",
      name: "Divya Reddy",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 4,
      text: "I appreciated the step-by-step checklist and mock interviews. The counsellor's feedback improved my confidence during interviews.",
      videoThumb: "🎥",
      role: "Operations Manager at Amazon"
    },
    {
      id: "r6",
      name: "Karthik Iyer",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "The counsellor helped me target programs that fit my tech background and career goals. Their guidance shortened my application time and improved outcomes.",
      videoThumb: "🎥",
      role: "IT Manager at Infosys"
    },
    // New additional reviews (6 more -> total 12)
    {
      id: "r7",
      name: "Neha Kapoor",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "My counsellor helped me frame my achievements into a compelling story. I got an interview invite within weeks and an admission soon after.",
      videoThumb: "🎥",
      role: "Product Manager at Google"
    },
    {
      id: "r8",
      name: "Sandeep Rao",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 4,
      text: "The application timeline and document checklist saved me a lot of stress. Their mock interviews were particularly helpful.",
      videoThumb: "🎥",
      role: "Business Analyst at Deloitte"
    },
    {
      id: "r9",
      name: "Meera Joshi",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "I appreciated the personalised school-fit recommendations and the essay feedback. The counsellor truly understood my profile and goals.",
      videoThumb: "🎥",
      role: "Consultant at McKinsey"
    },
    {
      id: "r10",
      name: "Vikram Singh",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "Their stepwise approach and timely follow-ups made the whole process manageable alongside my full-time job.",
      videoThumb: "🎥",
      role: "Lead Engineer at Microsoft"
    },
    {
      id: "r11",
      name: "Aisha Khan",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 4,
      text: "The career counselling sessions helped me choose the right specialization and target the programs best aligned with my goals.",
      videoThumb: "🎥",
      role: "Data Scientist at Swiggy"
    },
    {
      id: "r12",
      name: "Rohit Desai",
      program: "MBA — Upskillers Counselling Support",
      university: "Upskillers",
      rating: 5,
      text: "From shortlisting to final submission, the counsellor's guidance was practical and focused. I felt supported at every step.",
      videoThumb: "🎥",
      role: "Operations Lead at Zomato"
    }
  ];

  // Client-side state so we can randomize order on each page load
  const [shuffledReviews, setShuffledReviews] = useState(reviews);

  useEffect(() => {
    // Fisher-Yates shuffle
    const copy = [...reviews];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffledReviews(copy);
  }, []);

  // Display only 6 reviews at a time, chosen from the shuffled pool of 12
  const displayedReviews = shuffledReviews.slice(0, 6);

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-slate-600">
            Real experiences from working professionals who transformed their careers
          </p>
        </div>

        {/* Filter removed — reviews show Upskillers counselling testimonials */}

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="relative bg-gradient-to-b from-white to-[var(--brand)]/4 rounded-2xl p-8 border border-slate-100 hover:shadow-2xl transition-transform hover:-translate-y-1 overflow-visible flex flex-col"
            >
              {/* Left accent bar (stronger) */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[var(--brand)]/12 rounded-l-2xl"></div>

              {/* Avatar initial overlapping (visible) */}
              <div className="absolute -top-6 left-6">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[var(--brand)] flex items-center justify-center text-[var(--brand)] font-bold shadow">
                  {review.name ? review.name.charAt(0) : "U"}
                </div>
              </div>

              {/* decorative opening quote (faded) */}
              <div className="absolute top-4 right-4 text-[64px] text-[var(--brand)]/8 select-none">“</div>

              {/* Rating badge and university */}
              <div className="flex items-center gap-3 mb-3 pt-2">
                <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  <span className="text-base">★</span>
                  <span>{review.rating}</span>
                </div>
                <div className="text-sm text-slate-500">{review.university}</div>
              </div>

              {/* Review text */}
              <p className="text-slate-700 mb-6 leading-relaxed italic text-[15px]">“{review.text}”</p>

              {/* User info */}
              <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100">
                <div>
                  <h4 className="font-semibold text-slate-900">{review.name}</h4>
                  <p className="text-sm text-slate-600">{review.role}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-1 rounded-full">
                      {review.program}
                    </span>
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      {review.university}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 'Read more success stories' link removed as requested */}
      </div>
    </section>
  );
}
