"use client";

import { useState, useEffect } from 'react';
import { Check, Download, Info, ChevronRight } from 'lucide-react';

interface ImageData {
  filename: string;
  path: string;
  size: number;
  categories: string[];
  keywords: string;
  supabaseUrl: string;
}

interface ChateauData {
  slug: string;
  nom: string;
  supabasePath: string;
  folderName: string;
  totalImages: number;
  images: ImageData[];
  imagesByCategory: Record<string, ImageData[]>;
}

interface ImagesData {
  generatedAt: string;
  totalChateaux: number;
  totalImages: number;
  totalSizeMB: number;
  chateaux: ChateauData[];
}

interface ImageSelection {
  hero: string[];
  openGraph: string;
  card: string;
  galerie: string[];
}

interface HomePageSelection {
  heroSlider: string[];
}

type SectionType = 'hero' | 'card' | 'openGraph' | 'galerie';
type HomePageSectionType = 'heroSlider';

interface Section {
  id: SectionType;
  label: string;
  description: string;
  multiple: boolean;
  max?: number;
}

interface HomePageSection {
  id: HomePageSectionType;
  label: string;
  description: string;
  multiple: boolean;
  max?: number;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero Slider', description: 'Images du slider page d\'accueil (3-5 recommandées)', multiple: true, max: 5 },
  { id: 'card', label: 'Card Catalogue', description: 'Vignette dans le catalogue (1 seule)', multiple: false },
  { id: 'openGraph', label: 'OpenGraph Social', description: 'Image réseaux sociaux (1 seule)', multiple: false },
  { id: 'galerie', label: 'Galerie Château', description: 'Images galerie page détail (6-12 recommandées)', multiple: true, max: 12 },
];

const HOME_PAGE_SECTIONS: HomePageSection[] = [
  { id: 'heroSlider', label: 'Hero Slider Principal', description: 'Images du slider de la page d\'accueil (4-6 recommandées)', multiple: true, max: 6 },
];

const HOME_PAGE_ID = 'page-accueil';

export default function AdminImagesPage() {
  const [imagesData, setImagesData] = useState<ImagesData | null>(null);
  const [selectedChateau, setSelectedChateau] = useState<ChateauData | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionType>('hero');
  const [selections, setSelections] = useState<Record<string, ImageSelection>>({});
  const [filter, setFilter] = useState<string>('all');
  const [isHomePage, setIsHomePage] = useState<boolean>(false);
  const [homePageSection, setHomePageSection] = useState<HomePageSectionType>('heroSlider');
  const [homePageSelections, setHomePageSelections] = useState<HomePageSelection>({ heroSlider: [] });

  useEffect(() => {
    fetch('/scripts/images-disponibles.json')
      .then(res => res.json())
      .then(data => {
        setImagesData(data);
        if (data.chateaux.length > 0) {
          setSelectedChateau(data.chateaux[0]);
        }
      })
      .catch(err => {
        console.error('Erreur chargement:', err);
        alert('Erreur: Lancez d\'abord: node scripts/scan-images-disponibles.js');
      });
  }, []);

  const initSelection = (slug: string): ImageSelection => {
    if (selections[slug]) return selections[slug];
    return { hero: [], openGraph: '', card: '', galerie: [] };
  };

  const toggleImage = (imageUrl: string) => {
    // Page d'accueil
    if (isHomePage) {
      const section = HOME_PAGE_SECTIONS.find(s => s.id === homePageSection);
      const currentList = homePageSelections[homePageSection];

      if (currentList.includes(imageUrl)) {
        setHomePageSelections({
          ...homePageSelections,
          [homePageSection]: currentList.filter(url => url !== imageUrl)
        });
      } else {
        if (section?.max && currentList.length >= section.max) {
          alert(`Maximum ${section.max} images pour ${section.label}`);
          return;
        }
        setHomePageSelections({
          ...homePageSelections,
          [homePageSection]: [...currentList, imageUrl]
        });
      }
      return;
    }

    // Châteaux
    if (!selectedChateau) return;
    const currentSelection = initSelection(selectedChateau.slug);
    const newSelections = { ...selections };
    const section = SECTIONS.find(s => s.id === selectedSection);

    if (section?.multiple) {
      const currentList = currentSelection[selectedSection] as string[];
      if (currentList.includes(imageUrl)) {
        (currentSelection[selectedSection] as string[]) = currentList.filter(url => url !== imageUrl);
      } else {
        if (section.max && currentList.length >= section.max) {
          alert(`Maximum ${section.max} images pour ${section.label}`);
          return;
        }
        (currentSelection[selectedSection] as string[]) = [...currentList, imageUrl];
      }
    } else {
      (currentSelection[selectedSection] as string) = imageUrl;
    }

    newSelections[selectedChateau.slug] = currentSelection;
    setSelections(newSelections);
  };

  const isImageSelected = (imageUrl: string): boolean => {
    if (isHomePage) {
      return homePageSelections[homePageSection].includes(imageUrl);
    }
    if (!selectedChateau) return false;
    const currentSelection = initSelection(selectedChateau.slug);
    const value = currentSelection[selectedSection];
    return Array.isArray(value) ? value.includes(imageUrl) : value === imageUrl;
  };

  const generateCode = () => {
    let code = '';

    // Code pour la page d'accueil
    if (homePageSelections.heroSlider.length > 0) {
      code += '// ============================================\n';
      code += '// Code pour PAGE D\'ACCUEIL\n';
      code += '// Copiez ce code dans src/components/HeroSection.tsx\n';
      code += '// ============================================\n\n';
      code += 'const heroSlides = [\n';
      homePageSelections.heroSlider.forEach(url => {
        code += `  {\n`;
        code += `    image: "${url}",\n`;
        code += `    title: "Votre Titre Ici",  // À personnaliser\n`;
        code += `    region: "Votre Région",     // À personnaliser\n`;
        code += `  },\n`;
      });
      code += '];\n\n\n';
    }

    // Code pour les châteaux
    code += '// ============================================\n';
    code += '// Code pour CHÂTEAUX\n';
    code += '// Copiez ce code dans src/data/chateaux.ts\n';
    code += '// ============================================\n\n';

    Object.entries(selections).forEach(([slug, selection]) => {
      const chateau = imagesData?.chateaux.find(c => c.slug === slug);
      if (!chateau) return;
      code += `// ${chateau.nom}\n`;
      code += `images: {\n`;
      code += `  hero: [\n`;
      selection.hero.forEach(url => code += `    "${url}",\n`);
      code += `  ],\n`;
      code += `  openGraph: "${selection.openGraph}",\n`;
      code += `  card: "${selection.card}",\n`;
      code += `  galerie: [\n`;
      selection.galerie.forEach(url => code += `    "${url}",\n`);
      code += `  ],\n},\n\n`;
    });

    return code;
  };

  const downloadCode = () => {
    const code = generateCode();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chateaux-images-code.txt';
    a.click();
  };

  if (!imagesData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-4">Chargement...</p>
        </div>
      </div>
    );
  }

  // Données pour la page d'accueil
  const allImages = imagesData ? imagesData.chateaux.flatMap(c => c.images) : [];

  // Données conditionnelles selon page d'accueil ou château
  const currentSelection = selectedChateau ? initSelection(selectedChateau.slug) : null;
  const currentSectionData = isHomePage
    ? HOME_PAGE_SECTIONS.find(s => s.id === homePageSection)
    : SECTIONS.find(s => s.id === selectedSection);

  const filteredImages = isHomePage
    ? (filter === 'all' ? allImages : allImages.filter(img => img.categories.includes(filter)))
    : selectedChateau
      ? (filter === 'all' ? selectedChateau.images : selectedChateau.imagesByCategory[filter] || [])
      : [];

  const selectedCount = isHomePage
    ? homePageSelections[homePageSection].length
    : currentSelection
      ? Array.isArray(currentSelection[selectedSection])
        ? (currentSelection[selectedSection] as string[]).length
        : currentSelection[selectedSection] ? 1 : 0
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec fil d'Ariane */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Fil d'Ariane - Vous êtes en train de modifier */}
          <div className="mb-3 flex items-center gap-2 text-sm">
            <span className="text-gray-500">Vous modifiez :</span>
            <div className="flex items-center gap-2 font-medium text-amber-700">
              <span>{isHomePage ? 'Page d\'accueil' : selectedChateau?.nom || '...'}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{currentSectionData?.label || '...'}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                {selectedCount} / {currentSectionData?.max || '∞'} sélectionnées
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">📸 Gestionnaire d'Images</h1>
            <button
              onClick={downloadCode}
              className="inline-flex items-center px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger le code
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar gauche - Sélection Château */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">1. Page</h2>
              <div className="space-y-2">
                {/* Option Page d'accueil */}
                <button
                  onClick={() => {
                    setIsHomePage(true);
                    setSelectedChateau(null);
                    setFilter('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                    isHomePage
                      ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 font-medium'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium mb-1">🏠 Page d'accueil</div>
                  <div className="text-xs text-gray-500">
                    {imagesData?.totalImages} images disponibles
                    {homePageSelections.heroSlider.length > 0 && ` • ${homePageSelections.heroSlider.length} sélectionnées`}
                  </div>
                </button>

                {/* Séparateur */}
                <div className="border-t border-gray-200 my-3"></div>

                {/* Châteaux */}
                {imagesData.chateaux.map((chateau) => {
                  const selection = selections[chateau.slug];
                  const total = selection
                    ? selection.hero.length + selection.galerie.length +
                      (selection.card ? 1 : 0) + (selection.openGraph ? 1 : 0)
                    : 0;

                  return (
                    <button
                      key={chateau.slug}
                      onClick={() => {
                        setSelectedChateau(chateau);
                        setIsHomePage(false);
                        setFilter('all');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        !isHomePage && selectedChateau?.slug === chateau.slug
                          ? 'bg-amber-50 border-2 border-amber-700 text-amber-900 font-medium'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium mb-1">{chateau.nom}</div>
                      <div className="text-xs text-gray-500">
                        {chateau.totalImages} images
                        {total > 0 && ` • ${total} sélectionnées`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sélection Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">2. Section</h2>
              <div className="space-y-2">
                {isHomePage ? (
                  // Sections de la page d'accueil
                  HOME_PAGE_SECTIONS.map((section) => {
                    const count = homePageSelections[section.id].length;

                    return (
                      <button
                        key={section.id}
                        onClick={() => setHomePageSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          homePageSection === section.id
                            ? 'bg-blue-50 border-2 border-blue-600 text-blue-900'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="font-medium mb-1">{section.label}</div>
                        <div className="text-xs text-gray-500 mb-1">{section.description}</div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${count > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                            {count} sélectionnée{count > 1 ? 's' : ''}
                          </span>
                          {section.multiple && (
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                              Multiple
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  // Sections des châteaux
                  SECTIONS.map((section) => {
                    const count = currentSelection
                      ? Array.isArray(currentSelection[section.id])
                        ? (currentSelection[section.id] as string[]).length
                        : currentSelection[section.id] ? 1 : 0
                      : 0;

                    return (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          selectedSection === section.id
                            ? 'bg-amber-50 border-2 border-amber-700 text-amber-900'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="font-medium mb-1">{section.label}</div>
                        <div className="text-xs text-gray-500 mb-1">{section.description}</div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${count > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                            {count} sélectionnée{count > 1 ? 's' : ''}
                          </span>
                          {section.multiple && (
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                              Multiple
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Contenu principal - Galerie d'images */}
          <div className="col-span-12 lg:col-span-9">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900 mb-1">
                    {currentSectionData?.label}
                  </h3>
                  <p className="text-sm text-blue-800">
                    {currentSectionData?.description}
                    {currentSectionData?.multiple && (
                      <strong className="ml-1">
                        Cliquez sur plusieurs images pour les sélectionner.
                      </strong>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Filtre */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">3. Sélectionnez les images</h3>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  {isHomePage ? (
                    <>
                      <option value="all">Toutes ({allImages.length})</option>
                      <option value="hero">Hero ({allImages.filter(i => i.categories.includes('hero')).length})</option>
                      <option value="chambres">Chambres ({allImages.filter(i => i.categories.includes('chambres')).length})</option>
                      <option value="sallies">Salles ({allImages.filter(i => i.categories.includes('sallies')).length})</option>
                      <option value="espacesBienEtre">Spa ({allImages.filter(i => i.categories.includes('espacesBienEtre')).length})</option>
                      <option value="restauration">Restaurant ({allImages.filter(i => i.categories.includes('restauration')).length})</option>
                      <option value="exterieur">Extérieur ({allImages.filter(i => i.categories.includes('exterieur')).length})</option>
                    </>
                  ) : (
                    <>
                      <option value="all">Toutes ({selectedChateau?.totalImages})</option>
                      {selectedChateau && Object.entries(selectedChateau.imagesByCategory).map(([cat, imgs]) => (
                        imgs.length > 0 && (
                          <option key={cat} value={cat}>{cat} ({imgs.length})</option>
                        )
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Grille d'images */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image) => {
                const isSelected = isImageSelected(image.supabaseUrl);

                return (
                  <button
                    key={image.filename}
                    onClick={() => toggleImage(image.supabaseUrl)}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md ${
                      isSelected ? 'ring-4 ring-amber-500' : ''
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-gray-100">
                      <img
                        src={`/api/images/preview?path=${encodeURIComponent(image.path)}`}
                        alt={image.keywords}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg">
                            <Check className="w-6 h-6" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-gray-700 truncate font-medium">{image.keywords}</p>
                      <p className="text-xs text-gray-500">{image.size} KB</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
