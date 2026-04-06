import { motion } from "motion/react";

const Achievements = () => {
  return (
    <section className="space-y-12 p-6">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <h1 className="font-[Space_Grotesk] text-4xl font-bold">My Achievements</h1>
        <p className="text-zinc-400 mt-2">A showcase of my accomplishments and milestones.</p>
      </motion.div>

      {/* CONTENT */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
        <p className="text-zinc-300">This is the Achievements page. Add your achievements here.</p>
      </motion.div>
    </section>
  );
};

export default Achievements;