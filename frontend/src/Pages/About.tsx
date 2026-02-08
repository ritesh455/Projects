const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* ABOUT US */}
      <section>
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-6 text-gray-600 max-w-3xl">
          ResumeCraft is a modern resume builder platform designed to help
          students and professionals create job-ready resumes easily.
        </p>
      </section>

      {/* CONTACT US */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold">Contact Us</h2>

        <form className="mt-8 max-w-lg space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border px-4 py-3 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full border px-4 py-3 rounded-lg"
          ></textarea>

          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg">
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
};

export default About;
