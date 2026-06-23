"use client";

const PrintResume = () => {
  return (
    <div className="mx-auto flex min-h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl">
      {/* Sidebar */}
      <aside className="w-[32%] bg-slate-900 p-8 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/20 bg-slate-800 text-3xl font-bold">
            JD
          </div>

          <h1 className="text-2xl font-bold tracking-wide">John Doe</h1>

          <p className="mt-1 text-sm text-slate-300">Full Stack Developer</p>
        </div>

        {/* Contact */}
        <div className="mt-8">
          <h2 className="border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-[3px]">
            Contact
          </h2>

          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>john@example.com</p>
            <p>+91 9876543210</p>
            <p>Guwahati, Assam</p>
            <p>johndoe.dev</p>
            <p>linkedin.com/in/johndoe</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-[3px]">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "PHP",
              "MySQL",
              "Tailwind",
              "REST API",
              "Git",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-8">
          <h2 className="border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-[3px]">
            Education
          </h2>

          <div className="mt-4">
            <h3 className="font-semibold">Bachelor of Computer Applications</h3>

            <p className="mt-1 text-sm text-slate-300">Gauhati University</p>

            <p className="text-xs text-slate-400">2018 - 2021</p>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-8">
          <h2 className="border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-[3px]">
            Languages
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>English</p>
            <p>Hindi</p>
            <p>Assamese</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-[68%] p-10">
        {/* Summary */}
        <section>
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold uppercase text-slate-900">
            Professional Summary
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Full Stack Developer with 3+ years of experience building scalable
            web applications using React, Next.js, Node.js, PHP, and MySQL.
            Skilled in system architecture, API development, database design,
            cloud deployment, and performance optimization.
          </p>
        </section>

        {/* Experience */}
        <section className="mt-8">
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold uppercase text-slate-900">
            Work Experience
          </h2>

          <div className="relative mt-6 border-l-2 border-slate-200 pl-6">
            {/* Job 1 */}
            <div className="relative pb-8">
              <div className="absolute left-[-34px] top-1 h-4 w-4 rounded-full bg-blue-600" />

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Senior Frontend Developer
                  </h3>

                  <p className="text-sm text-slate-500">ABC Technologies</p>
                </div>

                <span className="text-xs font-medium text-slate-500">
                  Jan 2023 - Present
                </span>
              </div>

              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-slate-600">
                <li>
                  Developed enterprise-grade applications using Next.js and
                  TypeScript.
                </li>
                <li>Improved performance by 45%.</li>
                <li>Integrated authentication and REST APIs.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative">
              <div className="absolute left-[-34px] top-1 h-4 w-4 rounded-full bg-blue-600" />

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Web Developer
                  </h3>

                  <p className="text-sm text-slate-500">XYZ Solutions</p>
                </div>

                <span className="text-xs font-medium text-slate-500">
                  Jul 2021 - Dec 2022
                </span>
              </div>

              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-slate-600">
                <li>Developed responsive applications using React and PHP.</li>
                <li>Created reusable design systems.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-8">
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold uppercase text-slate-900">
            Featured Projects
          </h2>

          <div className="mt-5 rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                Intern Lakshya LMS Platform
              </h3>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                SaaS
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Built a complete internship and LMS ecosystem with assessments,
              attendance tracking, certificates, rankings, dashboards, and
              role-based access control serving thousands of students.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Next.js", "PHP", "MySQL", "Tailwind", "JWT"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="mt-8">
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-bold uppercase text-slate-900">
            Certifications
          </h2>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Google Cloud Fundamentals</p>
            <p>Meta Frontend Development</p>
            <p>AWS Cloud Practitioner</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrintResume;
