const Home = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Build Your Professional Resume Online
            </h1>
            <p className="mt-5 text-gray-600">
              Create modern, job-ready resumes in minutes using our smart resume builder.
            </p>
            <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Build My Resume
            </button>
          </div>

          {/* Image placeholder */}
          <div className="bg-white h-72 rounded-xl shadow-md flex items-center justify-center">
            <p className="text-gray-400">Resume Preview Area</p>
          </div>

        </div>
      </section>

      {/* HOW TO MAKE RESUME */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          How to Make a Resume
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Enter Your Details" },
            { step: "2", title: "Choose Template" },
            { step: "3", title: "Download Resume" },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 border rounded-xl text-center hover:shadow-md"
            >
              <div className="text-3xl font-bold text-purple-600">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Our Features
          </h2>

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[
              "Easy Drag & Drop",
              "Professional Templates",
              "ATS Friendly Resumes",
              "Instant Download",
            ].map((feature) => (
              <div
                key={feature}
                className="bg-white p-6 rounded-xl text-center shadow-sm"
              >
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
