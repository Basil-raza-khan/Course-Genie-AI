import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold text-primary sm:text-5xl">
        AI Course Generator.
        <strong className="font-extrabold text-black sm:block"> Custom Learning Path powered by AI </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Discover the next generation of learning with courses enriched by AI for a deeper, more engaging experience.
      {/* Experience Education Like Never Before: AI-Enhanced Courses with Engaging Video Descriptions for a Brighter Learning Future */}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/dashboard"
        >
          Get Started
        </a>

      
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero