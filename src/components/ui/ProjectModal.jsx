import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset index when modal opens or project changes
    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
        }
    }, [isOpen, project]);

    if (!project) return null;

    const hasMultipleImages = project.images && project.images.length > 1;
    const displayImages = project.images || [project.image];

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* MODAL CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors border border-white/10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        {/* TOP SIDE: IMAGE SLIDER */}
                        <div className="relative w-full flex-shrink-0 bg-black/40 flex items-center justify-center p-2 min-h-[40vh] md:min-h-[50vh]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={displayImages[currentImageIndex]}
                                    alt={`${project.title} - ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                                />
                            </AnimatePresence>

                            {/* NAVIGATION CONTROLS */}
                            {hasMultipleImages && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all border border-white/5 backdrop-blur-sm"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all border border-white/5 backdrop-blur-sm"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                                    </button>

                                    {/* DOTS */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                        {displayImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? "bg-emerald-500 w-6" : "bg-white/30 hover:bg-white/50"}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* BOTTOM SIDE: INFO */}
                        <div className="w-full p-6 md:p-10 flex flex-col gap-6 bg-zinc-900 border-t border-zinc-800">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                        {project.title}
                                    </h2>
                                    <p className="text-emerald-400 font-medium text-base tracking-wide">
                                        {project.subtitle}
                                    </p>
                                </div>

                                {project.url && (
                                    <div className="flex-shrink-0">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center py-3 px-8 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
                                        >
                                            Lihat Website
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="h-px bg-zinc-800 w-full" />

                            <div>
                                <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-[0.2em] mb-4">
                                    Tentang Proyek
                                </h3>
                                <p className="text-zinc-300 leading-relaxed text-lg max-w-3xl">
                                    {project.description || "Tidak ada deskripsi tersedia untuk proyek ini."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
