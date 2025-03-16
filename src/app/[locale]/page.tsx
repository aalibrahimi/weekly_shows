"use client"
import { LampDemo } from '@/components/Aceternity/lamp';
import { Spotlight } from '@/components/Aceternity/Spotlight';
import { Timeline } from '@/components/Aceternity/timeline';
import { TextAnimate } from '@/components/magicui/text-animate';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
  
      <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
        <div className="container relative z-10 px-4 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <TextAnimate children={'  Share Your Digital Identity With A Touch'} />
           
            </h1>
            <p className="mb-8 text-lg text-gray-400 md:text-xl">
              Elegant NFC rings and cards that connect your digital world to the real one.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
                <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-800/50 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </section>
   {/* Still need to learn how to use this better */}
< LampDemo />

{/* TimeLine fooling around */}
<Timeline  data={[
  
  {
    title: "2023",
    content: <div className="prose dark:prose-invert ">
      <p>Launched our first NFC Ring prototype</p>
      <p>Secured initial funding</p>
    </div>
  },
  {
    title: "2024",
    content: <div className="prose dark:prose-invert">
      <p>Released commercial version</p>
      <p>Expanded to NFC cards</p>
    </div>
  },
  {
    title: "2025",
    content: <div className="prose dark:prose-invert">
      <p>Opened our online store</p>
      <p>Introduced custom designs</p>
    </div>
  }
]} />
      {/* Products Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24 text-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Our Products</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Stylish and functional NFC technology that connects your digital presence to the world around you.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 items-center justify-center ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-800">
                <motion.img
                  src="/codewithali.png"
                  alt="NFC Ring"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="mb-2 text-2xl font-bold">NFC Rings</h3>
                  <p className="mb-4 text-gray-300">Elegant wearable technology that connects with a gesture.</p>
                  <Button>Shop Rings</Button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-800">
                <motion.img
                  src="/codewithali.png"
                  alt="NFC Ring"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="mb-2 text-2xl font-bold">NFC Rings</h3>
                  <p className="mb-4 text-gray-300">Elegant wearable technology that connects with a gesture.</p>
                  <Button>Shop Rings</Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-800">
                <motion.img
                  src="/codewithali.png"
                  alt="NFC Card"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="mb-2 text-2xl font-bold">NFC Cards</h3>
                  <p className="mb-4 text-gray-300">Sleek digital business cards that make networking effortless.</p>
                  <Button>Shop Cards</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>

  
  );
}
