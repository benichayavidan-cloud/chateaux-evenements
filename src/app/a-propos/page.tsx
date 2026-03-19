"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import {
  ArrowRight,
  Award,
  Sparkles,
  Star,
  Phone,
  Clock,
  Wallet,
  UserCheck,
  ThumbsUp,
  Building2,
  PartyPopper,
  Headset,
  Heart,
  Target,
  Eye,
  Shield,
  Swords,
  ChevronRight,
} from "lucide-react";
import { chiffresCles } from "@/data/chateaux";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { trackPhoneClick } from "@/components/Analytics";

export default function AboutPage() {
  // useInView hooks
  const heroRef = useInView();
  const chiffresRef = useInView();
  const manifesteRef = useInView();
  const timelineRef = useInView();
  const expertiseHeader = useInView();
  const zigzag1 = useInView();
  const zigzag2 = useInView();
  const zigzag3 = useInView();
  const comparatifRef = useInView();
  const valeursHeader = useInView();
  const valeursRef = useInView();
  const equipeIntro = useInView();
  const equipeCards = useInView();
  const garantiesHeader = useInView();
  const garantiesRef = useInView();
  const processHeader = useInView();
  const processRef = useInView();
  const ctaRef = useInView();

  const equipe = [
    {
      nom: "Rebecca Ben Sadoun",
      poste: "Directrice Générale",
      image:
        "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&auto=format&fit=crop&q=80",
      bio: "15 ans d'expertise en événementiel de luxe. Rebecca sélectionne chaque château et supervise la qualité de chaque prestation.",
    },
    {
      nom: "Mickael Berrebi",
      poste: "Directeur Opérations",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      bio: "Expert en gestion hôtelière, Mickael coordonne la logistique et garantit l'excellence opérationnelle de chaque événement.",
    },
    {
      nom: "Avidan Benichay",
      poste: "Responsable Événementiel",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      bio: "Spécialiste du sur-mesure, Avidan conçoit les scénarios créatifs et pilote chaque projet de la conception au jour J.",
    },
  ];

  const timeline = [
    {
      year: "2009",
      title: "La Naissance d'une Vision",
      text: "Convaincus que le patrimoine français peut devenir le cadre idéal des événements d'entreprise, nous ouvrons les portes de notre premier château en Île-de-France.",
    },
    {
      year: "2014",
      title: "L'Expansion du Réseau",
      text: "Forts de nos 200 premiers événements réussis, nous élargissons notre sélection à 4 domaines d'exception, chacun avec son caractère unique.",
    },
    {
      year: "2019",
      title: "La Référence Événementielle",
      text: "PME innovantes comme groupes du CAC 40 nous font confiance. Nous dépassons les 400 événements avec un taux de satisfaction de 98%.",
    },
    {
      year: "2024",
      title: "L'Ère du Sur-Mesure Total",
      text: "Soirées à thème immersives, séminaires résidentiels, team buildings créatifs : nous repoussons les limites de l'événementiel d'entreprise en château.",
    },
  ];

  const valeurs = [
    {
      num: "01",
      titre: "Excellence sans Compromis",
      desc: "Chaque détail compte. De la qualité du traiteur à la disposition des chaises, nous visons l'irréprochable pour que votre événement soit à la hauteur de votre image.",
    },
    {
      num: "02",
      titre: "Authenticité du Patrimoine",
      desc: "Nous sélectionnons des lieux chargés d'histoire et de caractère. Pas de décors artificiels : la beauté de nos châteaux est réelle, préservée et entretenue avec passion.",
    },
    {
      num: "03",
      titre: "Sur-Mesure Radical",
      desc: "Aucun événement ne se ressemble. Nous partons de votre vision, vos objectifs et votre culture d'entreprise pour concevoir quelque chose qui vous ressemble vraiment.",
    },
    {
      num: "04",
      titre: "Transparence Totale",
      desc: "Tarifs tout compris, devis détaillé en 24h, pas de frais cachés. Vous savez exactement ce que vous payez et ce que vous obtenez. Notre relation est fondée sur la confiance.",
    },
  ];

  const garanties = [
    { icon: Clock, titre: "Devis en 24h", desc: "Proposition détaillée et personnalisée sous 24 heures, sans engagement." },
    { icon: Wallet, titre: "Tarif Tout Compris", desc: "Un budget maîtrisé incluant lieu, hébergement, restauration et animations." },
    { icon: UserCheck, titre: "Chef de Projet Dédié", desc: "Un interlocuteur unique de la conception à la réalisation, présent le jour J." },
    { icon: ThumbsUp, titre: "Satisfaction 98%", desc: "15 ans de retours positifs et de recommandations de nos clients entreprises." },
  ];

  const processus = [
    { num: 1, titre: "Écoute & Conseil", desc: "Échange sur vos objectifs, votre budget et vos envies pour cibler le château idéal." },
    { num: 2, titre: "Proposition Sur-Mesure", desc: "Devis détaillé sous 24h avec programme, logistique et budget tout compris." },
    { num: 3, titre: "Coordination Totale", desc: "Votre chef de projet pilote tous les prestataires et la logistique complète." },
    { num: 4, titre: "Jour J Impeccable", desc: "Présence sur place pour garantir un déroulement fluide et mémorable." },
  ];

  const avantItems = [
    "Chercher un lieu pendant des semaines",
    "Négocier séparément avec 5+ prestataires",
    "Gérer les imprévus logistiques seul",
    "Budget qui dérape sans contrôle",
    "Stress permanent jusqu'au jour J",
  ];

  const apresItems = [
    "4 châteaux présélectionnés, visite possible",
    "Un interlocuteur unique qui coordonne tout",
    "Chef de projet présent le jour J",
    "Tarif tout compris, sans mauvaise surprise",
    "Devis en 24h, zéro stress garanti",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ===== 1. HERO (Option C) ===== */}
      <div className="hero-section">
        <Image
          src="/images/equipe-select-chateaux-organisateur-seminaire-entreprise-chateau.webp"
          alt="Équipe Select Châteaux — organisateurs de séminaires et événements d'entreprise en château"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="hero-overlay" />

        <div className="relative h-full flex-center">
          <div className="hero-content">
            <div
              ref={heroRef.ref}
              className={`flex-col-center animate-fade-in ${heroRef.isInView ? "" : "opacity-0"}`}
            >
              <div className="badge-lg inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 shadow-lg mb-8">
                <Sparkles className="w-5 h-5 text-[var(--bronze-light)]" />
                <span className="text-label text-white font-semibold tracking-wider uppercase text-xs">
                  Organisateur d'événements en châteaux depuis 2009
                </span>
              </div>

              <h1
                className="heading-display mb-4 leading-none"
                style={{ color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
              >
                Nous Créons des Souvenirs,
                <br />
                Pas de Simples Événements
              </h1>

              {/* Divider bronze */}
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  margin: "0 auto 1.5rem",
                  background: "linear-gradient(90deg, transparent, var(--bronze-antique), transparent)",
                }}
              />

              <p
                className="text-body-xl mb-10 max-w-3xl font-light"
                style={{ color: "rgba(255,255,255,0.88)", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
              >
                Select Châteaux ouvre les portes des plus beaux domaines d'Île-de-France pour transformer vos séminaires et soirées d'entreprise en expériences inoubliables.
              </p>

              <div className="flex flex-wrap gap-4 items-center justify-center">
                <Link href="/devis#formulaire" className="btn-primary group">
                  <span>Devis Gratuit en 24h</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+33757991146"
                  onClick={() => trackPhoneClick()}
                  className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
                  style={{ padding: "16px 28px", color: "white" }}
                >
                  <Phone className="w-4 h-4" style={{ color: "white" }} />
                  <span style={{ color: "white" }}>07 57 99 11 46</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: "0.5rem" }}>
          <div className="flex flex-col items-center gap-3 animate-bounce-gentle">
            <span className="text-white text-xs uppercase tracking-widest font-bold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              Découvrir
            </span>
            <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 shadow-lg" style={{ borderColor: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.15)" }}>
              <div className="w-1 h-3 bg-[var(--bronze-antique)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== 2. CHIFFRES ===== */}
      <div
        ref={chiffresRef.ref}
        style={{ background: "#f6f9fc", padding: "15px 0" }}
      >
        <div className="section-container">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 animate-on-scroll ${chiffresRef.isInView ? "is-visible" : ""}`}
          >
            {chiffresCles.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200"
                style={{
                  textAlign: "center",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    fontStyle: "italic",
                    color: "var(--bronze-antique)",
                    fontWeight: 300,
                    marginBottom: "0.5rem",
                  }}
                >
                  {c.unite === "+" ? "+" : ""}
                  {c.valeur}
                  {c.unite === "%" ? "%" : ""}
                  {c.suffix || ""}
                </div>
                <p className="font-medium text-center" style={{ color: "#6b7c93" }}>
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 3. MANIFESTE (Option C) ===== */}
      <div
        ref={manifesteRef.ref}
        className={`responsive-grid animate-on-scroll ${manifesteRef.isInView ? "is-visible" : ""}`}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "520px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(2.5rem, 5vw, 4.5rem)", background: "#fff" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "6rem", color: "var(--bronze-antique)", opacity: 0.2, lineHeight: 0.8, marginBottom: "-0.5rem" }}>
            &ldquo;
          </div>
          <h2 className="heading-xl" style={{ marginBottom: "1.5rem" }}>
            Notre Conviction : Le Lieu Fait l'Événement
          </h2>
          <p className="text-body-xl" style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            Un séminaire dans une salle de conférence, c'est un séminaire. Un séminaire dans un château du XVIIIe siècle entouré de jardins à la française, <strong style={{ color: "#1a1f36" }}>c'est une expérience qui transforme les équipes</strong>.
          </p>
          <p className="text-body-xl" style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
            Depuis 2009, nous avons fait de cette conviction notre métier. Nous ne sommes pas un simple annuaire de lieux. <strong style={{ color: "#1a1f36" }}>Nous sommes votre partenaire de A à Z</strong> : sélection du château, conception du programme, coordination des prestataires, présence le jour J.
          </p>
          <p className="text-body-xl" style={{ lineHeight: 1.8 }}>
            Notre mission est simple : que chaque entreprise qui nous fait confiance vive un moment qu'elle n'oubliera pas.
          </p>
        </div>
        <div style={{ position: "relative", minHeight: "400px" }}>
          <Image
            src="/images/seminaires-soirees-entreprise-hero.webp"
            alt="Événement d'entreprise dans un château d'exception en Île-de-France"
            fill
            className="object-cover"
            sizes="50vw"
            quality={75}
          />
        </div>
      </div>

      {/* ===== 3b. TIMELINE — Notre Histoire (Option A) ===== */}
      <div style={{ background: "#f6f9fc", padding: "15px 0" }}>
        <div className="section-container">
          <div className="section-header">
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Building2 className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">Notre Histoire</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "0.75rem" }}>15 Ans au Service de l'Excellence</h2>
            <p className="text-body-xl" style={{ color: "#525252", maxWidth: "700px", margin: "0 auto" }}>
              De la passion du patrimoine à la référence de l'événementiel d'entreprise en château
            </p>
          </div>

          <div
            ref={timelineRef.ref}
            className={`animate-on-scroll ${timelineRef.isInView ? "is-visible" : ""}`}
            style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}
          >
            {/* Ligne verticale */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px",
              background: "linear-gradient(to bottom, transparent, var(--bronze-antique), transparent)",
              transform: "translateX(-50%)",
            }} className="hidden md:block" />

            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "2rem",
                  marginBottom: i < timeline.length - 1 ? "2.5rem" : 0,
                  flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                }}
                className="timeline-item"
              >
                <div style={{
                  flex: "0 0 auto", width: "80px", height: "80px",
                  background: "var(--bronze-antique)", color: "#fff", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 500,
                  position: "relative", zIndex: 2,
                  boxShadow: "0 0 30px rgba(163,126,44,0.3)",
                }}>
                  {item.year}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "#fff",
                    border: "1px solid #E5E5E5",
                    borderRadius: "16px",
                    padding: "1.5rem 2rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    textAlign: i % 2 === 0 ? "left" : "right",
                    transition: "all 0.3s ease",
                  }}
                  className="hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontStyle: "italic", color: "#1a1f36", marginBottom: "0.5rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#525252", margin: 0, lineHeight: 1.6 }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 4. EXPERTISE ZIGZAG (Option C) ===== */}
      <div style={{ background: "#fff", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={expertiseHeader.ref}
            className={`section-header animate-on-scroll ${expertiseHeader.isInView ? "is-visible" : ""}`}
          >
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Star className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">Notre Expertise</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "0.75rem" }}>Trois Savoir-Faire, Un Seul Interlocuteur</h2>
            <div style={{ width: "60px", height: "2px", margin: "1.5rem auto 0", background: "linear-gradient(90deg, transparent, var(--bronze-antique), transparent)" }} />
          </div>

          {/* Zigzag 1 */}
          <div
            ref={zigzag1.ref}
            className={`grid-2-cols animate-on-scroll from-left ${zigzag1.isInView ? "is-visible" : ""}`}
            style={{ marginBottom: "3rem", alignItems: "center" }}
          >
            <div className="card-image group" style={{ aspectRatio: "5/4" }}>
              <Image src="/images/chateau-exception-seminaire-entreprise-ile-de-france.webp" alt="Château sélectionné pour séminaire d'entreprise en Île-de-France" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
            </div>
            <div>
              <div style={{ width: "40px", height: "3px", background: "var(--bronze-antique)", borderRadius: "2px", marginBottom: "1.25rem" }} />
              <h3 className="heading-lg" style={{ marginBottom: "1rem" }}>La Sélection de Lieux d'Exception</h3>
              <p className="text-body-lg" style={{ color: "#525252", marginBottom: "0.75rem" }}>4 châteaux et domaines triés sur le volet en Île-de-France. Chacun a été sélectionné pour son caractère architectural, ses espaces de réunion modulables, son hébergement de charme et son accessibilité depuis Paris (30 à 60 min).</p>
              <p className="text-body-lg" style={{ color: "#525252" }}>Capacité de 50 à 280 personnes, avec hébergement sur place.</p>
            </div>
          </div>

          {/* Zigzag 2 — inversé */}
          <div
            ref={zigzag2.ref}
            className={`grid-2-cols animate-on-scroll from-right ${zigzag2.isInView ? "is-visible" : ""}`}
            style={{ marginBottom: "3rem", alignItems: "center", direction: "rtl" }}
          >
            <div className="card-image group" style={{ aspectRatio: "5/4", direction: "ltr" }}>
              <Image src="/images/services/soiree-entreprise-groupe-fete-theme-gatsby-costumes.webp" alt="Soirée à thème Gatsby en château pour entreprise" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
            </div>
            <div style={{ direction: "ltr" }}>
              <div style={{ width: "40px", height: "3px", background: "var(--bronze-antique)", borderRadius: "2px", marginBottom: "1.25rem" }} />
              <h3 className="heading-lg" style={{ marginBottom: "1rem" }}>La Conception d'Événements Sur-Mesure</h3>
              <p className="text-body-lg" style={{ color: "#525252", marginBottom: "0.75rem" }}>Séminaires résidentiels, soirées à thème immersives (Gatsby, Casino Royale, Murder Party, Bal Masqué...), team buildings créatifs, galas corporate, cocktails dînatoires.</p>
              <p className="text-body-lg" style={{ color: "#525252" }}>Nous imaginons, scénarisons et produisons chaque événement en fonction de vos objectifs et de votre culture d'entreprise.</p>
            </div>
          </div>

          {/* Zigzag 3 */}
          <div
            ref={zigzag3.ref}
            className={`grid-2-cols animate-on-scroll from-left ${zigzag3.isInView ? "is-visible" : ""}`}
            style={{ alignItems: "center" }}
          >
            <div className="card-image group" style={{ aspectRatio: "5/4" }}>
              <Image src="/images/equipe-chateau-chef-serveurs-accueil-evenement.webp" alt="Équipe de coordination événementielle en château" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
            </div>
            <div>
              <div style={{ width: "40px", height: "3px", background: "var(--bronze-antique)", borderRadius: "2px", marginBottom: "1.25rem" }} />
              <h3 className="heading-lg" style={{ marginBottom: "1rem" }}>La Coordination Clé en Main</h3>
              <p className="text-body-lg" style={{ color: "#525252", marginBottom: "0.75rem" }}>Un chef de projet dédié pilote l'intégralité de votre événement : traiteur gastronomique, animations, scénographie, technique son et lumière, logistique transport.</p>
              <p className="text-body-lg" style={{ color: "#525252" }}>Vous avez un seul interlocuteur, un budget tout compris, et la certitude d'un déroulement parfait.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 5. COMPARATIF AVANT/APRÈS ===== */}
      <div style={{ background: "#f6f9fc", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={comparatifRef.ref}
            className={`section-header animate-on-scroll ${comparatifRef.isInView ? "is-visible" : ""}`}
          >
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Swords className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">La Différence</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "0.75rem" }}>Pourquoi Nous Plutôt qu'un Autre ?</h2>
            <div style={{ width: "60px", height: "2px", margin: "1.5rem auto 0", background: "linear-gradient(90deg, transparent, var(--bronze-antique), transparent)" }} />
          </div>

          <div
            className="responsive-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              maxWidth: "960px",
              margin: "0 auto",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* AVANT */}
            <div style={{ background: "#171717", padding: "2.5rem", color: "rgba(255,255,255,0.7)" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "5px 14px", borderRadius: "50px",
                background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)",
                fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: "1.5rem",
              }}>
                Avant
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontStyle: "italic", color: "rgba(255,255,255,0.9)", marginBottom: "1.5rem" }}>
                Organiser Seul Son Événement
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {avantItems.map((item, i) => (
                  <li key={i} style={{
                    padding: "0.75rem 0", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)",
                    display: "flex", alignItems: "flex-start", gap: "0.75rem",
                    borderBottom: i < avantItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}>
                    <span style={{
                      flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", fontWeight: 700, marginTop: "1px",
                    }}>✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* APRÈS */}
            <div style={{ background: "#fff", padding: "2.5rem", border: "1px solid #E5E5E5", borderLeft: "none" }}>
              <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10" style={{
                marginBottom: "1.5rem", padding: "5px 14px",
                fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
              }}>
                <Sparkles className="w-3 h-3" />
                <span>Avec Select Châteaux</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontStyle: "italic", color: "#1a1f36", marginBottom: "1.5rem" }}>
                L'Événement Clé en Main
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {apresItems.map((item, i) => (
                  <li key={i} style={{
                    padding: "0.75rem 0", fontSize: "0.9rem", color: "#525252",
                    display: "flex", alignItems: "flex-start", gap: "0.75rem",
                    borderBottom: i < apresItems.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}>
                    <span style={{
                      flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
                      background: "rgba(163,126,44,0.1)", color: "var(--bronze-antique)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", fontWeight: 700, marginTop: "1px",
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 6. VALEURS (Option C — numérotées) ===== */}
      <div style={{ background: "#fff", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={valeursHeader.ref}
            className={`section-header animate-on-scroll ${valeursHeader.isInView ? "is-visible" : ""}`}
          >
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Heart className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">Nos Valeurs</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "0.75rem" }}>Ce Qui Guide Chacune de Nos Actions</h2>
            <div style={{ width: "60px", height: "2px", margin: "1.5rem auto 0", background: "linear-gradient(90deg, transparent, var(--bronze-antique), transparent)" }} />
          </div>

          <div ref={valeursRef.ref} style={{ maxWidth: "900px", margin: "0 auto" }}>
            {valeurs.map((v, i) => (
              <div
                key={i}
                className={`animate-on-scroll ${valeursRef.isInView ? "is-visible" : ""}`}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "2rem",
                  padding: "2rem 0",
                  borderBottom: i < valeurs.length - 1 ? "1px solid #E5E5E5" : "none",
                  transition: "all 0.3s ease",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{
                  fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontStyle: "italic",
                  color: "var(--bronze-antique)", flexShrink: 0, width: "60px", textAlign: "center", lineHeight: 1,
                }}>
                  {v.num}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1f36", marginBottom: "0.5rem" }}>{v.titre}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#525252", margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 7. EQUIPE (Option C — magazine) ===== */}
      <div style={{ background: "#f6f9fc", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={equipeIntro.ref}
            className={`grid-2-cols animate-on-scroll ${equipeIntro.isInView ? "is-visible" : ""}`}
            style={{ marginBottom: "3rem", alignItems: "center" }}
          >
            <div>
              <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
                <Award className="w-4 h-4 text-[var(--bronze-antique)]" />
                <span className="text-label text-[var(--bronze-antique)]">L'Équipe</span>
              </div>
              <h2 className="heading-xl" style={{ marginBottom: "1.25rem" }}>Des Visages Derrière Chaque Événement</h2>
              <p className="text-body-lg" style={{ color: "#525252", lineHeight: 1.7 }}>
                Nous sommes une équipe à taille humaine, où chaque membre connaît personnellement chaque château, chaque prestataire, chaque recoin de nos domaines. Cette proximité fait notre force : quand vous travaillez avec nous, vous ne parlez pas à un call center, mais à des passionnés qui ont à cœur la réussite de votre événement.
              </p>
              <p className="text-body-lg" style={{ color: "#525252", lineHeight: 1.7, marginTop: "1rem" }}>
                De la PME innovante aux grands groupes, nous avons accompagné plus de 500 entreprises avec la même exigence et le même enthousiasme.
              </p>
            </div>
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <Image
                src="/images/equipe-select-chateaux-organisateur-seminaire-entreprise-chateau.webp"
                alt="Équipe Select Châteaux — organisateurs de séminaires et événements d'entreprise en château"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>

          <div
            ref={equipeCards.ref}
            className="responsive-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}
          >
            {equipe.map((m, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-gray-200 text-center animate-on-scroll hover-lift ${equipeCards.isInView ? "is-visible" : ""}`}
                style={{ padding: "2rem", animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative w-20 h-20 mx-auto mb-4" style={{ borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(163,126,44,0.15)" }}>
                  <Image src={m.image} alt={m.nom} fill className="object-cover" sizes="80px" />
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontStyle: "italic", color: "#1a1f36", marginBottom: "0.25rem" }}>{m.nom}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--bronze-antique)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{m.poste}</p>
                <p style={{ fontSize: "0.85rem", color: "#737373", margin: 0 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 8. GARANTIES (Option B) ===== */}
      <div style={{ background: "#fff", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={garantiesHeader.ref}
            className={`section-header animate-on-scroll ${garantiesHeader.isInView ? "is-visible" : ""}`}
          >
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Shield className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">Nos Garanties</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "0.75rem" }}>Vos Certitudes Avec Nous</h2>
            <div style={{ width: "60px", height: "2px", margin: "1.5rem auto 0", background: "linear-gradient(90deg, transparent, var(--bronze-antique), transparent)" }} />
          </div>

          <div
            ref={garantiesRef.ref}
            className="responsive-grid-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}
          >
            {garanties.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border border-gray-200 text-center animate-on-scroll hover-lift ${garantiesRef.isInView ? "is-visible" : ""}`}
                  style={{ padding: "1.75rem", animationDelay: `${i * 0.1}s` }}
                >
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: "rgba(163,126,44,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 0.75rem",
                  }}>
                    <Icon style={{ width: "24px", height: "24px", color: "var(--bronze-antique)" }} />
                  </div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1f36", marginBottom: "0.5rem" }}>{g.titre}</h4>
                  <p style={{ fontSize: "0.8rem", color: "#737373", margin: 0, lineHeight: 1.5 }}>{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== 9. PROCESSUS (Option A) ===== */}
      <div style={{ background: "#f6f9fc", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={processHeader.ref}
            className={`section-header animate-on-scroll ${processHeader.isInView ? "is-visible" : ""}`}
          >
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Target className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">Notre Processus</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "0.75rem" }}>De Votre Idée à la Réalité</h2>
            <p className="text-body-xl" style={{ color: "#525252" }}>Un accompagnement clé en main en 4 étapes simples</p>
          </div>

          <div
            ref={processRef.ref}
            className="responsive-grid-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", position: "relative" }}
          >
            {/* Ligne horizontale */}
            <div style={{
              position: "absolute", top: "45px", left: "12%", right: "12%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, var(--bronze-antique), transparent)",
            }} className="hidden md:block" />

            {processus.map((p, i) => (
              <div
                key={i}
                className={`animate-on-scroll ${processRef.isInView ? "is-visible" : ""}`}
                style={{ textAlign: "center", position: "relative", zIndex: 2, animationDelay: `${i * 0.15}s` }}
              >
                <div style={{
                  width: "90px", height: "90px", borderRadius: "50%", /* process-step-circle */
                  background: "var(--bronze-antique)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 500,
                  margin: "0 auto 1.25rem",
                  boxShadow: "0 0 30px rgba(163,126,44,0.2)",
                }}>
                  {p.num}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1a1f36", marginBottom: "0.5rem" }}>{p.titre}</h3>
                <p style={{ fontSize: "0.85rem", color: "#525252", maxWidth: "200px", margin: "0 auto" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 10. CTA FINAL (Option C) ===== */}
      <div style={{ background: "#fff", padding: "15px 0" }}>
        <div className="section-container">
          <div
            ref={ctaRef.ref}
            className={`w-full text-center animate-on-scroll ${ctaRef.isInView ? "is-visible" : ""}`}
          >
            <div className="badge inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 mb-4">
              <Sparkles className="w-4 h-4 text-[var(--bronze-antique)]" />
              <span className="text-label text-[var(--bronze-antique)]">Votre Prochain Événement</span>
            </div>
            <h2 className="heading-xl" style={{ marginBottom: "1rem" }}>
              Créons Ensemble Quelque Chose de Mémorable
            </h2>
            <p className="text-body-xl" style={{ color: "#525252", maxWidth: "600px", margin: "0 auto 2rem" }}>
              Dites-nous votre projet. Nous vous répondons sous 24h avec une proposition sur-mesure, sans engagement.
            </p>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Link href="/devis#formulaire" className="btn-primary group">
                <Award className="w-5 h-5" />
                <span>Demander un Devis Gratuit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+33757991146"
                onClick={() => trackPhoneClick()}
                className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
                style={{ color: 'white' }}
              >
                <Phone className="w-4 h-4" style={{ color: 'white' }} />
                <span style={{ color: 'white' }}>07 57 99 11 46</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 11. Logo Carousel + Reviews ===== */}
      <LogoCarousel />
      <ReviewsSection />
      <StickyCtaBar />
    </div>
  );
}
