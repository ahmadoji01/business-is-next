import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const AnimatedContainer = ({ children }: { children: React.ReactNode }) => {
    const location = usePathname();
    
    return (
        <motion.div
            key={location}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={{
            pageInitial: {
                opacity: 0,
                y: 50,
            },
            pageAnimate: {
                opacity: 1,
                y: 0,
            },
            pageExit: {
                opacity: 0,
                y: -50,
            },
            }}
            transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.5,
            }}
            >
            {children}
        </motion.div>
    )
}

export default AnimatedContainer;