'use client';

import { FC } from 'react';
import '../../index.css';
import { useRouter } from 'next/navigation';

const AboutPage: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen text-sm font-light gap-2">
      <div className="about-me">
        Hello! My name is Kristina. I am the author of this small application,
        <br />
        this is my first time writing in react, so it may be a bit broken :&#41;
      </div>

      <a className="underline" href="https://rs.school/courses/reactjs">
        Link to RSSchool course
      </a>
      <div
        className="text-blue-500 cursor-pointer"
        onClick={() => router.back()}
      >
        &#x2190; back to the home page
      </div>
    </div>
  );
};

export default AboutPage;
