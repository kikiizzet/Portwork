import TextType from "../components/text/TextType";
import Lanyard from "../components/ui/Lanyard";
import logo_me from "../assets/cards/logo_me.png";
import google_maps from "../assets/cards/google_maps.png";
import BlurText from "../components/ui/BlurText";
import SplitText from "../components/ui/SplitText";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const socialLinks = [
  { name: "linkedin", href: "https://www.linkedin.com/in/kikiizzet/" },
  { name: "github", href: "https://github.com/kikiizzet" },
  { name: "instagram", href: "https://www.instagram.com/mo.izzet/" },
];

const About = ({ isReady }) => {
  const [showTyping, setShowTyping] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (showTyping) {
      const t = setTimeout(() => setShowDescription(true), 400);
      return () => clearTimeout(t);
    }
  }, [showTyping]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#030303] text-white selection:bg-(--accent) selection:text-black">
      
      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-(--accent) z-50 origin-left"
        style={{ scaleX }}
      />

      {/* BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-(--accent) opacity-[0.05] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="order-2 lg:order-1 space-y-10">
            <div className="space-y-4">
              {isReady && (
                <div className="relative">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: 80 }} 
                    className="absolute -left-24 top-1/2 h-[2px] bg-(--accent) hidden xl:block" 
                  />
                  <BlurText 
                    text="Crafting Digital Logic" 
                    className="text-zinc-500 text-lg uppercase tracking-[0.4em] font-mono mb-4 block"
                  />
                  <BlurText 
                    text="I'm Izzetnity" 
                    className="font-[Space_Grotesk] text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]" 
                    onAnimationComplete={() => setShowTyping(true)} 
                  />
                </div>
              )}

              <div className="h-8">
                {showTyping && (
                  <TextType 
                    text={["Fullstack Developer", "DevOps Strategist", "IoT Engineer"]} 
                    className="text-(--accent) text-xl md:text-2xl font-mono" 
                  />
                )}
              </div>
            </div>

            <AnimatePresence>
              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-10"
                >
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                  An <span className="text-white font-medium">Informatics Engineering undergraduate</span>. 
                  I bridge the gap between complex backend logic and seamless user experiences.
                  </p>
                  
                  <div className="flex items-center gap-6">
                    {socialLinks.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        whileHover={{ y: -8, scale: 1.1 }}
                        className="group relative h-14 w-14 flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 hover:border-(--accent) transition-all duration-300"
                      >
                        <div className="absolute inset-0 rounded-full bg-(--accent) opacity-0 group-hover:opacity-10 group-hover:blur-md transition-opacity" />
                        <i className={`ri-${item.name}-fill text-2xl text-zinc-400 group-hover:text-(--accent)`} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= LANYARD DENGAN ANIMASI MENGAMBANG ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="order-1 lg:order-2 h-[450px] lg:h-[650px] relative"
          >
            {/* Efek Cahaya Berdenyut di Belakang Lanyard */}
            <motion.div 
              animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-(--accent) rounded-full blur-[120px]"
            />

            {/* Container Animasi Floating (Gerak Sendiri) */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [-1, 1, -1] 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full relative z-10"
            >
              <Lanyard position={[0, 0, 15]} model="/lanyard/card.glb" texture="/lanyard/lanyard.png" />
            </motion.div>
          </motion.div>
        </div>

        {/* BIODATA CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: "NAME", value: "Izzetnity", icon: logo_me, sub: "Available for Hire" },
            { label: "BASE", value: "Malang, Indonesia", icon: google_maps, sub: "UTC +7" }
          ].map((info, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
              className="relative overflow-hidden p-[1px] rounded-[2.5rem] bg-gradient-to-b from-zinc-700 to-transparent group"
            >
              <div className="relative bg-[#0a0a0a] rounded-[2.5rem] p-8 h-full flex items-center gap-6">
                <div className="h-20 w-20 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-(--accent)/50 transition-colors">
                  <img src={info.icon} alt="" className="h-12 w-12 object-contain" />
                </div>
                <div>
                  <span className="text-xs font-mono text-(--accent) tracking-[0.3em] uppercase mb-1 block opacity-70">{info.label}</span>
                  <h4 className="text-2xl font-bold tracking-tight text-zinc-100">{info.value}</h4>
                  <p className="text-sm text-zinc-500 mt-1">{info.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="mt-40 space-y-12">
          <div className="flex items-center gap-6">
            <h3 className="text-4xl font-black tracking-tighter">THE EXPERTISE</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Fullstack Web", desc: "Laravel, React, & Next.js Ecosystem", icon: "ri-code-s-slash-line" },
              { title: "Cloud Ops", desc: "Docker, CI/CD, & Linux Security", icon: "ri-cloud-line" },
              { title: "ERP Solution", desc: "Odoo Framework Customization", icon: "ri-settings-4-line" },
              { title: "IoT Logic", desc: "MQTT, Sensors, & Realtime Data", icon: "ri-cpu-line" }
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start gap-6 p-8 rounded-[2rem] border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md hover:border-(--accent)/30 transition-all"
              >
                <div className="p-4 rounded-xl bg-zinc-800 text-zinc-400 group-hover:bg-(--accent) group-hover:text-black transition-all duration-500">
                  <i className={`${exp.icon} text-2xl`} />
                </div>
                <div> 
                  <h4 className="text-xl font-bold group-hover:text-(--accent) transition-colors">{exp.title}</h4>
                  <p className="text-zinc-500 mt-2 leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING BACKGROUND TEXT */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none font-black overflow-hidden">
         <span className="absolute top-1/4 left-10 text-9xl">NODE</span>
         <span className="absolute top-1/2 right-10 text-9xl">REACT</span>
         <span className="absolute bottom-1/4 left-1/2 text-9xl italic">PHP</span>
      </div>

    </section>
  );
};

export default About;