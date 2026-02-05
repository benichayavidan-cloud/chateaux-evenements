"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Heart, Award, Users, TrendingUp, Building2, Target, Sparkles } from "lucide-react";
import { chiffresCles } from "@/data/chateaux";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";

export default function AboutPage() {
  const valeurs = [
    {
      titre: "Excellence",
      description: "Nous sélectionnons avec soin les plus beaux domaines et offrons un service irréprochable à chaque instant.",
      icon: Award,
    },
    {
      titre: "Authenticité",
      description: "Des lieux chargés d'histoire et de caractère, préservés avec passion pour créer des expériences uniques.",
      icon: Heart,
    },
    {
      titre: "Sur-Mesure",
      description: "Chaque événement est unique. Nous concevons avec vous des solutions parfaitement adaptées à vos besoins.",
      icon: Target,
    },
    {
      titre: "Engagement",
      description: "Votre satisfaction est notre priorité. Nous vous accompagnons à chaque étape avec expertise et dévouement.",
      icon: Users,
    },
  ];

  const heroContent = useInView();
  const histoireImage = useInView();
  const histoireText = useInView();
  const chiffresHeader = useInView();
  const chiffresGrid = useInView();
  const missionHeader = useInView();
  const valeursGrid = useInView();
  const equipeHeader = useInView();
  const equipeGrid = useInView();
  const ctaSection = useInView();

  const equipe = [
    {
      nom: "Rebecca Ben Attar",
      poste: "Directrice Générale",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&auto=format&fit=crop&q=80",
      bio: "15 ans d'expérience dans l'événementiel de luxe",
    },
    {
      nom: "Jonathan Ben Attar",
      poste: "Directeur Opérations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      bio: "Expert en gestion hôtelière et opérations",
    },
    {
      nom: "Avidan Benichay",
      poste: "Responsable Événementiel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      bio: "Spécialiste des événements sur-mesure",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="hero-section">
        <Image
          src="/images/seminaires-soirees-entreprise-hero.webp"
          alt="À propos de SelectChâteaux - Organisation événements en châteaux"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="hero-overlay" />

        <div className="relative h-full flex-center">
          <div className="hero-content">
            <div
              ref={heroContent.ref}
              className={`flex-col-center animate-fade-in ${heroContent.isInView ? '' : 'opacity-0'}`}
            >
              <div className="badge-lg inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 shadow-lg mb-10">
                <Sparkles className="w-5 h-5 text-[var(--bronze-light)]" />
                <span className="text-label text-white font-semibold tracking-wider uppercase text-xs">
                  Depuis 2009
                </span>
              </div>

              <h1
                className="heading-display mb-5 leading-none"
                style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              >
                À Propos de Select Châteaux
              </h1>

              <p
                className="text-body-xl mb-14 max-w-3xl font-medium"
                style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
              >
                15 ans d'expertise au service de vos événements d'exception dans les plus beaux châteaux d'Île-de-France.
              </p>

              <Link href="/devis#formulaire" className="btn-primary group">
                <span>Organiser mon événement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: '0.5rem' }}>
          <div
            className="flex flex-col items-center gap-3 animate-bounce-gentle"
          >
            <span className="text-white text-xs uppercase tracking-widest font-bold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Découvrir
            </span>
            <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 shadow-lg" style={{ borderColor: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)' }}>
              <div className="w-1 h-3 bg-[var(--bronze-antique)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <LogoCarousel />

      {/* Notre Histoire */}
      <div className="section-white" style={{ padding: '30px 0' }}>
        <div className="section-container">
          <div className="grid-2-cols">
            <div
              ref={histoireImage.ref}
              className={`animate-on-scroll from-left ${histoireImage.isInView ? 'is-visible' : ''}`}
            >
              <div className="card-image group">
                <Image
                  src="/images/seminaires-soirees-entreprise-hero.webp"
                  alt="Histoire SelectChâteaux"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="50vw"
                />
              </div>
            </div>

            <div
              ref={histoireText.ref}
              className={`flex-col-center animate-on-scroll from-right ${histoireText.isInView ? 'is-visible' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="badge inline-flex items-center gap-3 bg-[var(--bronze-antique)]/10 mb-lg">
                <Building2 className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-label text-[var(--bronze-antique)]">
                  Notre Histoire
                </span>
              </div>

              <h2 className="heading-xl mb-md">
                15 Ans d'Excellence Événementielle
              </h2>

              <p className="text-body-xl mb-xl">
                Depuis 2009, Select Châteaux s'est imposé comme la référence de l'événementiel d'entreprise en châteaux. Notre passion pour le patrimoine français et notre expertise événementielle nous ont permis d'accompagner plus de 500 entreprises dans la réalisation de leurs projets les plus ambitieux.
              </p>

              <p className="text-body-xl mb-xl">
                De la PME innovante aux groupes du CAC 40, nous avons su créer des expériences mémorables qui allient l'élégance intemporelle de nos domaines à l'excellence du service contemporain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chiffres Clés */}
      <div className="section-gray" style={{ padding: '30px 0' }}>
        <div className="section-container">
          <div
            ref={chiffresHeader.ref}
            className={`section-header animate-on-scroll ${chiffresHeader.isInView ? 'is-visible' : ''}`}
          >
            <h2 className="heading-xl mb-xl">
              Nos Chiffres Clés
            </h2>
          </div>

          <div ref={chiffresGrid.ref} className="grid grid-cols-2 md:grid-cols-4 gap-3xl max-w-[var(--max-width-content)] mx-auto">
            {chiffresCles.map((chiffre, index) => (
              <div
                key={index}
                className={`flex-col-center bg-white rounded-2xl border border-gray-200 animate-on-scroll ${chiffresGrid.isInView ? 'is-visible' : ''}`}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="text-5xl font-bold text-[var(--bronze-antique)] mb-md">
                  {chiffre.unite && chiffre.unite === "+" ? "+" : ""}
                  {chiffre.valeur}
                  {chiffre.unite && chiffre.unite === "%" ? "%" : ""}
                  {chiffre.suffix || ""}
                </div>
                <p className="font-medium text-center" style={{ color: '#6b7c93' }}>{chiffre.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Valeurs */}
      <div className="section-white" style={{ padding: '20px 0' }}>
        <div className="section-container">
          <div
            ref={missionHeader.ref}
            className={`section-header animate-on-scroll ${missionHeader.isInView ? 'is-visible' : ''}`}
          >
            <h2 className="heading-xl mb-md">
              Notre Mission
            </h2>
            <p className="text-body-xl mb-4xl max-w-3xl mx-auto">
              Offrir à nos clients un accès privilégié aux plus beaux châteaux d'Île-de-France et orchestrer des événements d'entreprise qui allient prestige, authenticité et excellence opérationnelle.
            </p>
          </div>

          <div ref={valeursGrid.ref} className="valeurs-grid">
            {valeurs.map((valeur, index) => {
              const IconComponent = valeur.icon;
              return (
                <div
                  key={index}
                  className={`animate-on-scroll from-scale hover-lift ${valeursGrid.isInView ? 'is-visible' : ''}`}
                  style={{
                    padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                    background: '#ffffff',
                    border: '1px solid rgba(163, 126, 44, 0.08)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'default',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    animationDelay: `${index * 0.12}s`,
                  }}
                >
                  <div
                    className="hover:scale-110"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(163, 126, 44, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <IconComponent style={{ width: '28px', height: '28px', color: 'var(--bronze-antique)' }} />
                  </div>
                  <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 600, color: '#1a1f36', marginBottom: '0.5rem' }}>{valeur.titre}</h3>
                  <p style={{ color: '#6b7c93', lineHeight: 1.6, fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)' }}>{valeur.description}</p>
                </div>
              );
            })}
          </div>

          <style jsx>{`
            .valeurs-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1rem;
              max-width: 1280px;
              margin: 0 auto;
              padding: 0 1rem;
            }
            @media (min-width: 640px) {
              .valeurs-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (min-width: 1024px) {
              .valeurs-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 1.25rem;
                padding: 0 2rem;
              }
            }
          `}</style>
        </div>
      </div>

      {/* Notre Équipe */}
      <div style={{ padding: '20px 0', background: '#f6f9fc' }}>
        <div className="section-container">
          <div
            ref={equipeHeader.ref}
            className={`section-header animate-on-scroll ${equipeHeader.isInView ? 'is-visible' : ''}`}
          >
            <h2 className="heading-xl" style={{ marginBottom: '1rem' }}>
              Notre Équipe
            </h2>
            <p className="text-body-xl max-w-3xl mx-auto" style={{ marginBottom: '2rem' }}>
              Des professionnels passionnés, experts de l'événementiel de luxe
            </p>
          </div>

          <div ref={equipeGrid.ref} style={{ display: 'flex', gap: '1.5rem', maxWidth: 'var(--max-width-content)', margin: '0 auto', justifyContent: 'center' }}>
            {equipe.map((membre, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center animate-on-scroll ${equipeGrid.isInView ? 'is-visible' : ''}`}
                style={{
                  flex: '1 1 0',
                  minWidth: '280px',
                  maxWidth: '350px',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div style={{ padding: '1.5rem' }} className="w-full flex flex-col items-center">
                  <div className="relative w-24 h-24" style={{ marginBottom: '1rem' }}>
                  <Image
                    src={membre.image}
                    alt={membre.nom}
                    fill
                    className="object-cover rounded-full"
                    sizes="96px"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-[var(--bronze-antique)]/20" />
                </div>
                  <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>{membre.nom}</h3>
                  <p className="text-[var(--bronze-antique)] font-semibold text-sm uppercase tracking-wide" style={{ marginBottom: '0.5rem' }}>{membre.poste}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7c93' }}>{membre.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-white" style={{ padding: '30px 0' }}>
        <div className="section-container">
          <div
            ref={ctaSection.ref}
            className={`w-full text-center content-padding animate-on-scroll ${ctaSection.isInView ? 'is-visible' : ''}`}
          >
            <h2 className="heading-xl mb-md">
              Prêt à Créer Votre Événement d'Exception ?
            </h2>
            <p className="text-body-xl mb-xl">
              Rejoignez les 500+ entreprises qui nous ont fait confiance
            </p>
            <div className="flex flex-wrap gap-lg items-center justify-center">
              <Link href="/devis#formulaire" className="btn-primary group">
                <Award className="w-5 h-5" />
                <span>Demander un Devis Gratuit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ReviewsSection />
    </div>
  );
}
