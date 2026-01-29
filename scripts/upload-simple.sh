#!/bin/bash

# Script simplifié d'upload vers Supabase
SUPABASE_PROJECT_ID="jmeiepmtgidqtmxfnlwf"
BUCKET_NAME="chateaux-images"
IMAGES_DIR="/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES"

echo "📤 Upload des images vers Supabase..."
echo ""

total_uploaded=0
total_failed=0

# Fonction pour uploader un dossier
upload_folder() {
    local folder_name="$1"
    local supabase_path="$2"
    local local_path="$IMAGES_DIR/$folder_name"

    if [ ! -d "$local_path" ]; then
        echo "⚠️  Dossier non trouvé: $folder_name"
        return
    fi

    echo "📁 Upload: $folder_name → $supabase_path"

    find "$local_path" -name "*.webp" -type f | while read -r file; do
        filename=$(basename "$file")
        remote_path="$supabase_path/$filename"

        supabase storage cp "$file" "s3://$BUCKET_NAME/$remote_path" --project-ref "$SUPABASE_PROJECT_ID" 2>/dev/null

        if [ $? -eq 0 ]; then
            echo "   ✓ $filename"
            ((total_uploaded++))
        else
            echo "   ✗ $filename"
            ((total_failed++))
        fi
    done

    echo ""
}

# Upload chaque dossier
upload_folder "Abbaye des Veaux de cernay" "chevreuse"
upload_folder "Chateau de Montvillargene" "montvillargene"
upload_folder "Domaine Reine Margot" "hauts-de-seine"
upload_folder "Chateau Mont Royal" "mont-royal"

echo "✨ Upload terminé !"
echo "🔗 https://jmeiepmtgidqtmxfnlwf.supabase.co/project/jmeiepmtgidqtmxfnlwf/storage/buckets/$BUCKET_NAME"
