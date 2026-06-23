import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "طلبت صينية شبكة بخط عربي محفور بالذهب، التفاصيل كانت خيالية والريزن كأنه زجاج نقي. قطعة فنية ستبقى ذكرى للعمر وأبهرت كل الحضور!",
    author: "Sarah A.",
    role: "Bride-to-be",
    initial: "S"
  },
  {
    id: 2,
    quote: "The depth of the ocean tray is mesmerizing. You can tell each layer of resin was poured with absolute patience and precision. It's now the centerpiece of my living room.",
    author: "Laila M.",
    role: "Interior Designer",
    initial: "L"
  },
  {
    id: 3,
    quote: "استلمت طلبية الكوسترز ولوحة الشطرنج.. الشغل متعوب عليه جداً والفينيشينج عالمي ولا غلطة. التعامل راقي والتغليف كان فخماً ومناسباً جداً للهدايا.",
    author: "Ahmed H.",
    role: "Art Collector",
    initial: "A"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const SharedMoments = () => {
  return (
    <section className="w-full py-24 px-6 bg-cream-dark/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="text-rose-gold text-5xl font-serif italic leading-none mb-4">"</div>
          <h2 className="text-3xl md:text-4xl text-charcoal">
            Curated Testimonials
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div variants={itemVariants} key={testimonial.id} className="bg-white p-8 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-500 rounded-sm">
              <div className="flex gap-1 text-rose-gold/60 mb-6 text-sm">
                ★★★★★
              </div>
              <p className="text-charcoal-light/80 text-sm font-serif italic leading-relaxed flex-grow mb-8">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 bg-sand rounded flex items-center justify-center text-charcoal/50 font-serif italic">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="text-sm text-charcoal font-medium">{testimonial.author}</h4>
                  <p className="text-xs text-charcoal/50 font-light">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SharedMoments;
