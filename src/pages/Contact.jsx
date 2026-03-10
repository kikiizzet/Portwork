import React from "react";
/*import gmail from "../assets/cards/gmail.png";*/
import instagram from "../assets/cards/instagram.png";
/*import github from "../assets/cards/github.png";*/
import tiktok from "../assets/cards/tiktok.png";
import { motion } from "motion/react";

const socials = [
  /*{
    name: "Gmail",
    value: "syauqifizan@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=syauqifizan@gmail.com&su=Hello&body=Halo Syauqi",
    icon: gmail,
  }*/,
  {
    name: "Instagram",
    value: "@mo.izzet",
    href: "https://www.instagram.com/mo.izzet/",
    icon: instagram,
  },
  /*{
    name: "GitHub",
    value: "https://github.com/izzetnity",
    href: "https://github.com/izzetnity",
    icon: github,
  },*/
  {
    name: "TikTok",
    value: "@Izzetnity",
    href: "https://www.tiktok.com/@izzetnity",
    icon: tiktok,
  },
];

// ... (bagian import tetap sama)

const Contact = () => {
  return (
    <section className="relative px-4 py-20 h-full flex items-center justify-center">
      <div className="mx-auto w-full max-w-4xl">
{/* Header */}
<motion.div 
  initial={{ opacity: 0, y: 16 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <div className="mb-12 text-center">
    <h1 className="font-[Space_Grotesk] text-4xl font-bold cursor-default select-none text-white">
      {"Get in Touch".split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block" // Sangat penting agar animasi jalan
          style={{ display: "inline-block", whiteSpace: "pre" }}
          whileHover={{ 
            filter: "blur(8px)", 
            opacity: 0.3,
            scale: 1.2,
            transition: { duration: 0.2 } 
          }}
          whileTap={{ 
            filter: "blur(12px)", 
            opacity: 0.1 
          }}
          // Transisi balik ke normal
          transition={{ duration: 0.5 }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
    
    <p className="mt-3 text-zinc-400">Feel free to reach me through these platforms</p>
  </div>
</motion.div>

        {/* GRID - Menggunakan layout motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {socials.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              
              // --- EFEK BARU DI SINI ---
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }} // Sedikit naik saat dihover (PC)
              whileTap={{ scale: 0.95, rotate: -1 }} // Efek "mendalam" dan sedikit miring saat ditekan
              transition={{ duration: 0.2 }}
              // -------------------------

              className="
                group relative overflow-hidden
                rounded-2xl border border-zinc-800
                bg-zinc-900/70 p-6
                backdrop-blur
                transition-all duration-300
                hover:border-[var(--accent)]
                hover:bg-zinc-900
              "
            >
              {/* Accent glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                  <img src={item.icon} alt={item.name} className="w-10 h-10 object-contain" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{item.value}</p>
                </div>

                {/* Arrow */}
                <i className="ri-arrow-right-up-line text-zinc-500 group-hover:text-[var(--accent)] transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;