import { motion } from "framer-motion";
import { useState } from "react";
import Orb from "../components/ui/Orb";

const Chat = () => {
  const [status, setStatus] = useState("");

  // Ganti 'YOUR_FORMSPREE_ID' dengan ID dari formspree.io
  const FORMSPREE_URL = "https://formspree.io/f/meolywqp";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    setStatus("Sending...");

    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("Message sent successfully! 🚀");
      form.reset();
    } else {
      setStatus("Oops! There was a problem sending your message.");
    }
  };

  return (
    <section className="relative px-4 h-full">
      <div className="max-w-6xl mx-auto h-full grid gap-10 items-center grid-cols-1 lg:grid-cols-12">
        
        {/* FORM COLUMN */}
        <div className="flex justify-center lg:col-span-7">
          <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur p-6 sm:p-8 mt-8 mb-8">
            
            {/* HEADER */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-center mb-6">
                <h1 className="font-[Space_Grotesk] text-3xl font-bold">Contact Me</h1>
                <p className="text-zinc-400 text-sm mt-1">Send me a message and I'll get back to you via email</p>
              </div>
            </motion.div>

            {/* CONTACT FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Mctavish"
                    className="rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-(--accent) transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-(--accent) transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500 ml-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                  className="rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm resize-none focus:outline-none focus:border-(--accent) transition"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-zinc-100 text-black py-3 font-bold hover:bg-(--accent) hover:text-black transition transform active:scale-95 mt-2"
              >
                Send Message
              </button>

              {status && (
                <p className={`text-center text-sm mt-2 ${status.includes("successfully") ? "text-emerald-400" : "text-zinc-400"}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ORB COLUMN (DECORATION) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm lg:max-w-md">
            <Orb />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;