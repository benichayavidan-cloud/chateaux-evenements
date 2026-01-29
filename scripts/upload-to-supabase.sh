#!/bin/bash

# Script d'upload des images vers Supabase Storage
# Usage: ./upload-to-supabase.sh

SUPABASE_PROJECT_URL="https://jmeiepmtgidqtmxfnlwf.supabase.co"
SUPABASE_PROJECT_ID="jmeiepmtgidqtmxfnlwf"
BUCKET_NAME="chateaux-images"

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  📤 Upload Images vers Supabase Storage                  ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier si supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI n'est pas installé${NC}"
    echo -e "${YELLOW}   Installez-le avec: npm install -g supabase${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI détecté${NC}"
echo ""

# Vérifier l'authentification
echo -e "${BLUE}🔐 Vérification de l'authentification...${NC}"
supabase projects list &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Non authentifié. Lancement de l'authentification...${NC}"
    supabase login
fi

echo ""
echo -e "${BLUE}📁 Dossiers à uploader:${NC}"
echo ""

IMAGES_DIR="/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES"

# Mapping des dossiers vers les paths Supabase
declare -A FOLDER_MAPPING
FOLDER_MAPPING["Abbaye des Veaux de cernay"]="chevreuse"
FOLDER_MAPPING["Chateau de Montvillargene"]="montvillargene"
FOLDER_MAPPING["Domaine Reine Margot"]="hauts-de-seine"
FOLDER_MAPPING["Chateau Mont Royal"]="mont-royal"

# Compteurs
total_uploaded=0
total_failed=0
total_size=0

# Uploader chaque dossier
for folder in "${!FOLDER_MAPPING[@]}"; do
    supabase_path="${FOLDER_MAPPING[$folder]}"
    local_path="$IMAGES_DIR/$folder"

    if [ ! -d "$local_path" ]; then
        echo -e "${YELLOW}⚠️  Dossier non trouvé: $folder${NC}"
        continue
    fi

    echo -e "${BLUE}📤 Upload: $folder → $supabase_path${NC}"
    echo "   Chemin local: $local_path"

    # Compter les fichiers
    file_count=$(find "$local_path" -name "*.webp" -type f | wc -l | tr -d ' ')
    echo "   Fichiers à uploader: $file_count"

    # Uploader chaque fichier
    uploaded_count=0
    failed_count=0

    while IFS= read -r -d '' file; do
        filename=$(basename "$file")
        remote_path="$supabase_path/$filename"

        # Taille du fichier
        file_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        size_kb=$((file_size / 1024))

        # Upload avec supabase CLI
        supabase storage cp "$file" "s3://$BUCKET_NAME/$remote_path" --project-ref "$SUPABASE_PROJECT_ID" 2>/dev/null

        if [ $? -eq 0 ]; then
            echo -e "   ${GREEN}✓${NC} $filename ($size_kb KB)"
            ((uploaded_count++))
            ((total_uploaded++))
            total_size=$((total_size + file_size))
        else
            echo -e "   ${RED}✗${NC} $filename (échec)"
            ((failed_count++))
            ((total_failed++))
        fi

    done < <(find "$local_path" -name "*.webp" -type f -print0)

    echo "   Résultat: $uploaded_count réussis, $failed_count échecs"
    echo ""
done

# Résumé final
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📊 RÉSULTAT FINAL${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ $total_uploaded images uploadées${NC}"

if [ $total_failed -gt 0 ]; then
    echo -e "${RED}❌ $total_failed images échouées${NC}"
fi

total_size_mb=$((total_size / 1024 / 1024))
echo -e "${BLUE}💾 Taille totale: $total_size_mb MB${NC}"
echo ""

echo -e "${YELLOW}🔗 Accédez à votre storage Supabase:${NC}"
echo "   $SUPABASE_PROJECT_URL/project/$SUPABASE_PROJECT_ID/storage/buckets/$BUCKET_NAME"
echo ""

echo -e "${GREEN}✨ Upload terminé !${NC}"
