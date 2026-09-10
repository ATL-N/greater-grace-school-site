import ContactForm from "../../webcomponents/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us & Campus Location | Greater Grace Christian Academy, Apam",
  description:
    "Get in touch with Greater Grace Christian Academy in Apam, Central Region, Ghana. Find our school location opposite Apam Senior High School, phone numbers, email, office hours, and Google Map directions.",
  keywords: [
    "Contact Greater Grace Christian Academy",
    "GGCA contact number",
    "Apam school location",
    "school opposite Apam Senior High School",
    "Greater Grace Christian Academy phone",
    "Apam Central Region school"
  ],
  alternates: {
    canonical: "/webpages/contact",
  },
  openGraph: {
    title: "Contact Us & Campus Location | Greater Grace Christian Academy",
    description:
      "Reach out to Greater Grace Christian Academy in Apam, Ghana. Campus location, phone numbers, email, and visiting hours.",
    url: "https://apamgreatergracechristianacademygh.org/webpages/contact",
    siteName: "Greater Grace Christian Academy",
    images: [
      {
        url: "/images/facilities/classroomblock.jpg",
        width: 1200,
        height: 630,
        alt: "Greater Grace Christian Academy Location Apam",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Greater Grace Christian Academy",
    description: "Get in touch with Greater Grace Christian Academy in Apam, Ghana.",
    images: ["/images/facilities/classroomblock.jpg"],
  },
};

export default function Contact() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animated-element">
          <h1
            className="text-4xl sm:text-6xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            Get in Touch
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're here to help! Reach out to us with any questions about
            admissions, academics, or campus life.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            className="p-6 rounded-lg text-center hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <MapPin
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p>
              Apam, Opposite Apam Senior High School.
              <br />
              Apam Junction(Cape Coast - Accra road), Apam - Central Region
            </p>
          </div>

          <div
            className="p-6 rounded-lg text-center hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Phone
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p>
              Main Office: +233 24 499 7473
              <br />
              Admissions: +233 24 404 4846
            </p>
          </div>

          <div
            className="p-6 rounded-lg text-center hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Mail
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p>
              gracapam@gmail.com
            </p>
          </div>

          <div
            className="p-6 rounded-lg text-center hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Clock
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
            <p>
              Monday - Friday: 7:30AM - 5:00PM
              <br />
              Saturday: Closed
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--primary-color)" }}
          >
            Send Us a Message
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-lg animated-element">
            <ContactForm />
          </div>
        </div>
      </section> */}

      {/* Map Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--primary-color)" }}
          >
            Campus Location
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg animated-element h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033295.9971275334!2d-2.0626901756924663!3d5.525225100000022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbb3a3f7cf52d%3A0xfc80f4f7fa3ce3b2!2sAPAM%20GREATER%20GRACE%20CHRISTIAN%20ACADEMY!5e0!3m2!1sen!2sgh!4v1738286332425!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </main>
  );
}
