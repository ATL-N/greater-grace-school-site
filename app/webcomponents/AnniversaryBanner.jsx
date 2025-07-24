"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AnniversaryBanner = () => {
  const images = [
    '/images/anniversary/flyer.jpg',
    '/images/anniversary/photoshoot1.jpg',
    '/images/anniversary/photoshoot2.jpg',
    '/images/anniversary/photoshoot3.jpg',
    '/images/anniversary/photoshoot4.jpg',
    '/images/anniversary/photoshoot5.jpg',
    '/images/anniversary/photoshoot6.jpg',
    '/images/anniversary/photoshoot7.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 h-96 relative">
            <Image
              src={src}
              alt="Anniversary Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-primary bg-opacity-75 p-4 rounded">
        <Link
          href="https://www.youtube.com/watch?v=TpNZPljPLgs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-lg font-bold"
        >
          Watch Our Anniversary Video!
        </Link>
      </div>
    </div>
  );
};

export default AnniversaryBanner;
