"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Github,
  ExternalLink,
  Download,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// import { getProjects } from '@/services/projectService'; // tu función que usa populate=*
// import { getProfile } from '@/services/profileService'; // tu función que usa populate=*

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // const projects = await getProjects();
  // const profile = await getProfile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault()
    setActiveSection(sectionId)
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Minimal Header - Only visible after scroll */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="#"
            className={`font-bold transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
          >
            <span className="text-xl">JP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-8">
            <Link
              href="#home"
              onClick={(e) => handleSectionClick(e, "home")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="#about"
              onClick={(e) => handleSectionClick(e, "about")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "about" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sobre Mí
            </Link>
            <Link
              href="#projects"
              onClick={(e) => handleSectionClick(e, "projects")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "projects" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Proyectos
            </Link>
            <Link
              href="#skills"
              onClick={(e) => handleSectionClick(e, "skills")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "skills" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Habilidades
            </Link>
            <Link
              href="#blog"
              onClick={(e) => handleSectionClick(e, "blog")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "blog" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Blog
            </Link>
            <Link
              href="#contact"
              onClick={(e) => handleSectionClick(e, "contact")}
              className={`text-sm font-medium transition-colors ${
                activeSection === "contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background"
          >
            <nav className="flex flex-col items-center gap-8 text-2xl">
              <Link
                href="#home"
                onClick={(e) => handleSectionClick(e, "home")}
                className={`font-medium transition-colors ${
                  activeSection === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="#about"
                onClick={(e) => handleSectionClick(e, "about")}
                className={`font-medium transition-colors ${
                  activeSection === "about" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sobre Mí
              </Link>
              <Link
                href="#projects"
                onClick={(e) => handleSectionClick(e, "projects")}
                className={`font-medium transition-colors ${
                  activeSection === "projects" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Proyectos
              </Link>
              <Link
                href="#skills"
                onClick={(e) => handleSectionClick(e, "skills")}
                className={`font-medium transition-colors ${
                  activeSection === "skills" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Habilidades
              </Link>
              <Link
                href="#blog"
                onClick={(e) => handleSectionClick(e, "blog")}
                className={`font-medium transition-colors ${
                  activeSection === "blog" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blog
              </Link>
              <Link
                href="#contact"
                onClick={(e) => handleSectionClick(e, "contact")}
                className={`font-medium transition-colors ${
                  activeSection === "contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Contacto
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Banner with CTA */}
        <section id="home" className="relative min-h-screen w-full">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"></div>
          </div>

          <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8 overflow-hidden rounded-full border-4 border-primary/20 p-1">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Profile"
                  className="rounded-full"
                  priority
                />
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              >
                Juan Pérez
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mb-8 flex items-center gap-2"
              >
                <div className="h-[1px] w-12 bg-primary/50"></div>
                <p className="text-xl text-muted-foreground">Desarrollador Full-Stack</p>
                <div className="h-[1px] w-12 bg-primary/50"></div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mb-10 max-w-2xl text-xl text-muted-foreground"
              >
                Especializado en crear experiencias digitales excepcionales que combinan diseño atractivo y
                funcionalidad intuitiva
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button asChild size="lg" className="gap-2 px-8">
                  <Link href="#projects">
                    Ver Proyectos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 px-8">
                  <Link href="#" download>
                    Descargar CV
                    <Download className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section - Redesigned */}
        <section id="about" className="w-full py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl"
            >
              <div className="mb-16 flex flex-col items-center text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Sobre Mí
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Conoce mi historia</h2>
                <div className="h-1 w-12 rounded-full bg-primary"></div>
              </div>

              <div className="grid gap-12 md:grid-cols-12">
                {/* Profile Image with Decorative Elements */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-tl-2xl border-t-2 border-l-2 border-primary/50"></div>
                    <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-br-2xl border-b-2 border-r-2 border-primary/50"></div>
                    <div className="relative h-[400px] w-[300px] overflow-hidden rounded-lg shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay"></div>
                      <Image src="/placeholder.svg?height=400&width=300" fill alt="About Me" className="object-cover" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-7 flex flex-col justify-center">
                  <div className="mb-8 space-y-4">
                    <h3 className="text-2xl font-bold text-primary">Mi Trayectoria</h3>
                    <p className="text-lg leading-relaxed">
                      Soy un desarrollador full-stack apasionado con 5 años de experiencia construyendo aplicaciones
                      web. Me especializo en React, Next.js, Node.js y tecnologías web modernas. Mi objetivo es crear
                      aplicaciones hermosas, funcionales y amigables que resuelvan problemas del mundo real.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-8">
                    <div className="relative pl-8 border-l-2 border-primary/30">
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                      <h4 className="text-xl font-bold">Desarrollador Senior</h4>
                      <p className="text-sm text-muted-foreground mb-2">Tech Solutions | 2020 - Presente</p>
                      <p className="text-muted-foreground">
                        Liderando equipos de desarrollo y creando soluciones web escalables para clientes
                        internacionales.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-2 border-primary/30">
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                      <h4 className="text-xl font-bold">Desarrollador Web</h4>
                      <p className="text-sm text-muted-foreground mb-2">Agencia Digital | 2018 - 2020</p>
                      <p className="text-muted-foreground">
                        Desarrollo de sitios web y aplicaciones para diversas industrias utilizando tecnologías
                        modernas.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-2 border-primary/30">
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                      <h4 className="text-xl font-bold">Licenciatura en Ciencias de la Computación</h4>
                      <p className="text-sm text-muted-foreground mb-2">Universidad Tecnológica | 2014 - 2018</p>
                      <p className="text-muted-foreground">
                        Formación en fundamentos de programación, algoritmos, bases de datos y desarrollo web.
                      </p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h4 className="mb-2 font-bold">Intereses</h4>
                      <p className="text-sm text-muted-foreground">
                        Senderismo, fotografía, nuevas tecnologías, viajes, música
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h4 className="mb-2 font-bold">Ubicación</h4>
                      <p className="text-sm text-muted-foreground">Madrid, España</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full bg-muted/30 py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl"
            >
              <div className="mb-16 flex flex-col items-center text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Proyectos
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Mi Trabajo Reciente</h2>
                <div className="h-1 w-12 rounded-full bg-primary"></div>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Aquí hay algunos de mis proyectos recientes. Cada uno fue construido con un enfoque en resolver
                  problemas reales y ofrecer experiencias de usuario excepcionales.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group overflow-hidden border-0 bg-background/80 shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=225&width=400"
                        width={400}
                        height={225}
                        alt="Proyecto 1"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Plataforma E-commerce</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Una plataforma de comercio electrónico completa construida con Next.js, Stripe y un CMS
                        headless.
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">Next.js</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Stripe</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href="#" className="inline-flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            Código
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="#" className="inline-flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group overflow-hidden border-0 bg-background/80 shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=225&width=400"
                        width={400}
                        height={225}
                        alt="Proyecto 2"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">App de Gestión de Tareas</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Una aplicación colaborativa de gestión de tareas con actualizaciones en tiempo real y funciones
                        de equipo.
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Firebase</Badge>
                        <Badge variant="secondary">Material UI</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href="#" className="inline-flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            Código
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="#" className="inline-flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group overflow-hidden border-0 bg-background/80 shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=225&width=400"
                        width={400}
                        height={225}
                        alt="Proyecto 3"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Generador de Contenido IA</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Una herramienta que utiliza IA para generar contenido de marketing, publicaciones de blog y
                        textos para redes sociales.
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">Python</Badge>
                        <Badge variant="secondary">OpenAI API</Badge>
                        <Badge variant="secondary">React</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href="#" className="inline-flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            Código
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href="#" className="inline-flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg" asChild className="group">
                  <Link href="#" className="inline-flex items-center gap-2">
                    Ver Más Proyectos
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Redesigned */}
        <section id="skills" className="w-full py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl"
            >
              <div className="mb-16 flex flex-col items-center text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Habilidades
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Tecnologías y Herramientas
                </h2>
                <div className="h-1 w-12 rounded-full bg-primary"></div>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  He trabajado con una variedad de tecnologías y frameworks. Estas son algunas de mis habilidades clave.
                </p>
              </div>

              {/* Skill Categories */}
              <div className="space-y-16">
                {/* Frontend Skills */}
                <div>
                  <h3 className="mb-8 text-center text-2xl font-bold">Frontend</h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { name: "React", level: 95, icon: "R" },
                      { name: "Next.js", level: 90, icon: "N" },
                      { name: "TypeScript", level: 85, icon: "TS" },
                      { name: "JavaScript", level: 95, icon: "JS" },
                      { name: "HTML/CSS", level: 90, icon: "H" },
                      { name: "Tailwind CSS", level: 85, icon: "T" },
                      { name: "Material UI", level: 80, icon: "M" },
                      { name: "Redux", level: 75, icon: "R" },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <Card className="h-full overflow-hidden border-0 bg-background shadow-md transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <span className="text-lg font-bold">{skill.icon}</span>
                              </div>
                              <span className="text-xl font-bold">{skill.level}%</span>
                            </div>
                            <h4 className="font-bold">{skill.name}</h4>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="h-full rounded-full bg-primary"
                              ></motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Backend Skills */}
                <div>
                  <h3 className="mb-8 text-center text-2xl font-bold">Backend</h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { name: "Node.js", level: 90, icon: "N" },
                      { name: "Express", level: 85, icon: "E" },
                      { name: "Python", level: 75, icon: "P" },
                      { name: "Django", level: 70, icon: "D" },
                      { name: "GraphQL", level: 80, icon: "G" },
                      { name: "REST APIs", level: 95, icon: "R" },
                      { name: "Firebase", level: 85, icon: "F" },
                      { name: "AWS", level: 70, icon: "A" },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <Card className="h-full overflow-hidden border-0 bg-background shadow-md transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <span className="text-lg font-bold">{skill.icon}</span>
                              </div>
                              <span className="text-xl font-bold">{skill.level}%</span>
                            </div>
                            <h4 className="font-bold">{skill.name}</h4>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="h-full rounded-full bg-primary"
                              ></motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Database & Tools */}
                <div>
                  <h3 className="mb-8 text-center text-2xl font-bold">Bases de Datos & Herramientas</h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { name: "MongoDB", level: 85, icon: "M" },
                      { name: "PostgreSQL", level: 80, icon: "P" },
                      { name: "MySQL", level: 85, icon: "M" },
                      { name: "Git", level: 95, icon: "G" },
                      { name: "Docker", level: 75, icon: "D" },
                      { name: "CI/CD", level: 80, icon: "C" },
                      { name: "Figma", level: 70, icon: "F" },
                      { name: "Jest", level: 75, icon: "J" },
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <Card className="h-full overflow-hidden border-0 bg-background shadow-md transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <span className="text-lg font-bold">{skill.icon}</span>
                              </div>
                              <span className="text-xl font-bold">{skill.level}%</span>
                            </div>
                            <h4 className="font-bold">{skill.name}</h4>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="h-full rounded-full bg-primary"
                              ></motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Section - Replacing Contact */}
        <section id="blog" className="w-full bg-muted/30 py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl"
            >
              <div className="mb-16 flex flex-col items-center text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Blog
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Artículos y Pensamientos
                </h2>
                <div className="h-1 w-12 rounded-full bg-primary"></div>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Comparto mis conocimientos, experiencias y reflexiones sobre desarrollo web, tecnología y más.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group h-full overflow-hidden border-0 bg-background/80 shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=225&width=400"
                        width={400}
                        height={225}
                        alt="Artículo 1"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline">React</Badge>
                        <span className="text-xs text-muted-foreground">12 Mayo, 2024</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">Optimizando el Rendimiento en React</h3>
                      <p className="mb-6 flex-1 text-sm text-muted-foreground">
                        Estrategias y técnicas para mejorar significativamente el rendimiento de tus aplicaciones React.
                      </p>
                      <Button variant="ghost" size="sm" asChild className="w-fit">
                        <Link href="#" className="group inline-flex items-center gap-1">
                          Leer más
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group h-full overflow-hidden border-0 bg-background/80 shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=225&width=400"
                        width={400}
                        height={225}
                        alt="Artículo 2"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline">Next.js</Badge>
                        <span className="text-xs text-muted-foreground">28 Abril, 2024</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">Construyendo APIs con Next.js</h3>
                      <p className="mb-6 flex-1 text-sm text-muted-foreground">
                        Guía completa para crear APIs robustas y escalables utilizando las funciones de servidor de
                        Next.js.
                      </p>
                      <Button variant="ghost" size="sm" asChild className="w-fit">
                        <Link href="#" className="group inline-flex items-center gap-1">
                          Leer más
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group h-full overflow-hidden border-0 bg-background/80 shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=225&width=400"
                        width={400}
                        height={225}
                        alt="Artículo 3"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline">IA</Badge>
                        <span className="text-xs text-muted-foreground">15 Abril, 2024</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">Integrando IA en Aplicaciones Web</h3>
                      <p className="mb-6 flex-1 text-sm text-muted-foreground">
                        Cómo incorporar modelos de IA en tus aplicaciones web para crear experiencias más inteligentes y
                        personalizadas.
                      </p>
                      <Button variant="ghost" size="sm" asChild className="w-fit">
                        <Link href="#" className="group inline-flex items-center gap-1">
                          Leer más
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg" asChild className="group">
                  <Link href="#" className="inline-flex items-center gap-2">
                    Ver Todos los Artículos
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section with Form */}
        <section id="contact" className="w-full py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl"
            >
              <div className="mb-16 flex flex-col items-center text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Contacto
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">¿Hablamos?</h2>
                <div className="h-1 w-12 rounded-full bg-primary"></div>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Estoy disponible para proyectos freelance, oportunidades laborales o simplemente para charlar sobre
                  tecnología.
                </p>
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div className="rounded-lg bg-muted/30 p-6">
                    <h3 className="mb-4 text-xl font-bold">Información de Contacto</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">hola@ejemplo.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Ubicación</p>
                          <p className="font-medium">Madrid, España</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/30 p-6">
                    <h3 className="mb-4 text-xl font-bold">Sígueme</h3>
                    <div className="flex gap-4">
                      <Button size="icon" variant="outline" asChild>
                        <Link href="https://github.com" target="_blank" rel="noreferrer">
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline" asChild>
                        <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline" asChild>
                        <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-6">
                      <form className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" placeholder="Tu nombre" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Asunto</Label>
                          <Input id="subject" placeholder="¿De qué quieres hablar?" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Mensaje</Label>
                          <Textarea id="message" placeholder="Tu mensaje..." className="min-h-[150px]" required />
                        </div>
                        <Button type="submit" className="w-full">
                          Enviar Mensaje
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer with Minimal Contact Info */}
        <footer className="w-full border-t bg-background py-8">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Link href="#" className="flex items-center gap-2 font-bold">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  JP
                </div>
                <span>Juan Pérez</span>
              </Link>
              <p className="text-center text-sm text-muted-foreground md:text-left">
                © 2024 Todos los derechos reservados.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-end">
              <div className="flex gap-4">
                <Button size="icon" variant="ghost" asChild>
                  <Link href="https://github.com" target="_blank" rel="noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <Link href="mailto:hola@ejemplo.com">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">hola@ejemplo.com</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
