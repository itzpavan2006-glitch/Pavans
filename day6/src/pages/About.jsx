import React from "react";

const team = [
  { name: "Asha Rao", role: "Founder & CEO", bio: "Leads product and design." },
  { name: "Dev Patel", role: "CTO", bio: "Builds the platform and infra." },
  {
    name: "Lina Gomez",
    role: "Head of Marketing",
    bio: "Grows our community.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              About Us
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              We build delightful web experiences that help teams ship faster.
              Our focus is on simplicity, accessibility and performance.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our mission</h2>
              <p className="mb-4">
                To empower creators and teams with tools that are fast, friendly
                and fun to use. We believe great products come from strong
                design, thoughtful engineering, and listening to users.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block mr-3 text-sky-600">•</span>
                  <span>Performance-first UX</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-3 text-sky-600">•</span>
                  <span>Accessible components</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-3 text-sky-600">•</span>
                  <span>Open, honest communication</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-3">Quick stats</h3>
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <div className="text-2xl font-bold">12k+</div>
                    <div className="text-sm text-gray-500">Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-sm text-gray-500">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-gray-500">Avg rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-2xl font-semibold mb-6">Meet the team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <article
                key={m.name}
                className="bg-gray-50 rounded-lg p-6 shadow-sm"
              >
                <div className="h-12 w-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold mb-3">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="font-medium">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.role}</p>
                <p className="mt-3 text-sm">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
          <form className="grid gap-4 md:grid-cols-2 max-w-3xl">
            <input
              aria-label="Name"
              placeholder="Your name"
              className="p-3 border rounded"
            />
            <input
              aria-label="Email"
              placeholder="Your email"
              className="p-3 border rounded"
            />
            <textarea
              aria-label="Message"
              placeholder="How can we help?"
              className="p-3 border rounded md:col-span-2"
              rows={5}
            />
            <button
              type="submit"
              className="md:col-span-2 inline-block bg-sky-600 text-white px-5 py-3 rounded hover:bg-sky-700"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
         
    </main>
  );
}
