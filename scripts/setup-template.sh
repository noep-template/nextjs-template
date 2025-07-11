#!/bin/bash

# Script de configuration du template Next.js
set -e

echo "🚀 Configuration du template Next.js..."

# Variables
PROJECT_NAME=""
PROJECT_DESCRIPTION=""
AUTHOR_NAME=""
AUTHOR_EMAIL=""

# Fonction d'aide
show_help() {
    echo "🔄 Script de configuration du template Next.js"
    echo ""
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -n, --name        Nom du projet (obligatoire)"
    echo "  -d, --description Description du projet"
    echo "  -a, --author      Nom de l'auteur"
    echo "  -e, --email       Email de l'auteur"
    echo "  -h, --help        Afficher cette aide"
    echo ""
    echo "Le script met à jour:"
    echo "  - package.json, README.md, Dockerfile"
    echo "  - docker-compose.yml, scripts/"
    echo "  - GitHub Actions workflows"
    echo "  - Fichiers /public (manifest.json, sitemap.xml, robots.txt, privacy-policy.html)"
    echo ""
    echo "Exemples:"
    echo "  $0 --name my-nextjs-app --description 'Mon application Next.js'"
    echo "  $0 -n my-nextjs-app -d 'Mon application' -a 'John Doe' -e 'john@example.com'"
}

# Traiter les arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -n|--name)
            PROJECT_NAME="$2"
            shift 2
            ;;
        -d|--description)
            PROJECT_DESCRIPTION="$2"
            shift 2
            ;;
        -a|--author)
            AUTHOR_NAME="$2"
            shift 2
            ;;
        -e|--email)
            AUTHOR_EMAIL="$2"
            shift 2
            ;;
        *)
            echo "❌ Option inconnue: $1"
            show_help
            exit 1
            ;;
    esac
done

# Vérifier que le nom du projet est fourni
if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Le nom du projet est obligatoire"
    show_help
    exit 1
fi

# Valeurs par défaut
PROJECT_DESCRIPTION=${PROJECT_DESCRIPTION:-"Application Next.js avec TypeScript, Tailwind CSS et internationalisation"}
AUTHOR_NAME=${AUTHOR_NAME:-"Développeur"}
AUTHOR_EMAIL=${AUTHOR_EMAIL:-"dev@example.com"}

echo "📝 Configuration du projet:"
echo "  Nom: $PROJECT_NAME"
echo "  Description: $PROJECT_DESCRIPTION"
echo "  Auteur: $AUTHOR_NAME"
echo "  Email: $AUTHOR_EMAIL"
echo ""

# Demander confirmation
read -p "Continuer avec cette configuration? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Configuration annulée"
    exit 1
fi

echo "🔧 Mise à jour des fichiers..."

# Mettre à jour package.json
if [ -f "package.json" ]; then
    echo "📦 Mise à jour package.json..."
    sed -i '' "s/\"name\": \"portfolio\"/\"name\": \"$PROJECT_NAME\"/" package.json
    sed -i '' "s/\"name\": \"hello\"/\"name\": \"$PROJECT_NAME\"/" package.json
    # Ajouter la description si elle n'existe pas
    if ! grep -q '"description"' package.json; then
        # Ajouter la description après la ligne "private": true
        sed -i '' "/\"private\": true,/a\\
  \"description\": \"$PROJECT_DESCRIPTION\"," package.json
    else
        sed -i '' "s/\"description\": \".*\"/\"description\": \"$PROJECT_DESCRIPTION\"/" package.json
    fi
    # Ajouter l'auteur si il n'existe pas
    if ! grep -q '"author"' package.json; then
        # Ajouter l'auteur après la description
        sed -i '' "/\"description\": \"$PROJECT_DESCRIPTION\"/a\\
  \"author\": \"$AUTHOR_NAME <$AUTHOR_EMAIL>\"," package.json
    else
        sed -i '' "s/\"author\": \".*\"/\"author\": \"$AUTHOR_NAME <$AUTHOR_EMAIL>\"/" package.json
    fi
fi

# Mettre à jour docker-compose.yml
if [ -f "docker-compose.yml" ]; then
    echo "🐳 Mise à jour docker-compose.yml..."
    sed -i '' "s/hello/${PROJECT_NAME}/g" docker-compose.yml
fi

# Mettre à jour les scripts
echo "📜 Mise à jour des scripts..."
find scripts/ -name "*.sh" -type f -exec sed -i '' "s/hello/${PROJECT_NAME}/g" {} \;

# Mettre à jour le workflow GitHub Actions
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "⚙️  Mise à jour du workflow GitHub Actions..."
    sed -i '' "s/hello/${PROJECT_NAME}/g" .github/workflows/deploy.yml
    # Mettre à jour le chemin du répertoire sur le serveur
    sed -i '' "s|~/hello|~/$(echo $PROJECT_NAME | tr '-' '_')|g" .github/workflows/deploy.yml
fi

# Mettre à jour le README
if [ -f "README.md" ]; then
    echo "📖 Mise à jour du README..."
    # Capitaliser la première lettre du nom du projet
    PROJECT_NAME_CAPITALIZED=$(echo "$PROJECT_NAME" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    sed -i '' "s/This is a \[Next\.js\].*project bootstrapped with.*/This is a [Next.js](https:\/\/nextjs.org\/) project: $PROJECT_NAME_CAPITALIZED/" README.md
    sed -i '' "s/hello/${PROJECT_NAME}/g" README.md
fi

# Mettre à jour le Dockerfile si il existe
if [ -f "Dockerfile" ]; then
    echo "🐳 Mise à jour du Dockerfile..."
    sed -i '' "s/hello/${PROJECT_NAME}/g" Dockerfile
fi

# Mettre à jour les fichiers dans /public
echo "📁 Mise à jour des fichiers dans /public..."

# Mettre à jour manifest.json
if [ -f "public/manifest.json" ]; then
    echo "📱 Mise à jour manifest.json..."
    # Capitaliser la première lettre du nom du projet pour l'affichage
    PROJECT_NAME_CAPITALIZED=$(echo "$PROJECT_NAME" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
    sed -i '' "s/\"name\": \"Next\.js Template \| Portfolio\"/\"name\": \"$PROJECT_NAME_CAPITALIZED\"/" public/manifest.json
    sed -i '' "s/\"short_name\": \"Next\.js Template \| Portfolio\"/\"short_name\": \"$PROJECT_NAME_CAPITALIZED\"/" public/manifest.json
fi

# Demander le domaine pour les fichiers de configuration
echo ""
read -p "🌐 Entrez le domaine de votre site (ex: mon-site.com): " DOMAIN
if [ -z "$DOMAIN" ]; then
    DOMAIN="your-domain.com"
    echo "ℹ️  Utilisation du domaine par défaut: $DOMAIN"
fi

# Mettre à jour sitemap.xml
if [ -f "public/sitemap.xml" ]; then
    echo "🗺️  Mise à jour sitemap.xml..."
    sed -i '' "s|https://your-domain.com|https://$DOMAIN|g" public/sitemap.xml
fi

# Mettre à jour robots.txt
if [ -f "public/robots.txt" ]; then
    echo "🤖 Mise à jour robots.txt..."
    sed -i '' "s|https://your-domain.com|https://$DOMAIN|g" public/robots.txt
fi

# Mettre à jour privacy-policy.html
if [ -f "public/privacy-policy.html" ]; then
    echo "🔒 Mise à jour privacy-policy.html..."
    # Remplacer le titre
    sed -i '' "s/<title>Politique de Confidentialité - Next\.js Template<\/title>/<title>Politique de Confidentialité - $PROJECT_NAME_CAPITALIZED<\/title>/" public/privacy-policy.html
    # Remplacer les informations de contact
    sed -i '' "s/\[Votre Nom\]/$AUTHOR_NAME/g" public/privacy-policy.html
    sed -i '' "s/\[votre-email@example\.com\]/$AUTHOR_EMAIL/g" public/privacy-policy.html
    sed -i '' "s|https://your-domain\.com|https://$DOMAIN|g" public/privacy-policy.html
fi

# Créer le fichier .env.local si il n'existe pas
if [ ! -f ".env.local" ]; then
    echo "🔐 Création du fichier .env.local..."
    cat > .env.local << EOF
# Configuration de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_ID=

# Variables d'environnement personnalisées
# Ajoutez vos variables ici
EOF
    echo "✅ Fichier .env.local créé. N'oubliez pas de le configurer!"
    echo "📝 Variables importantes à configurer :"
    echo "  - NEXT_PUBLIC_APP_URL : URL de votre application"
    echo "  - NEXT_PUBLIC_GA_ID : ID Google Analytics (optionnel)"
else
    echo "ℹ️  Fichier .env.local existe déjà"
fi

# Rendre les scripts exécutables
echo "🔧 Rendre les scripts exécutables..."
chmod +x scripts/*.sh

echo ""
echo "✅ Configuration terminée avec succès!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Configurer le fichier .env.local avec vos paramètres"
echo "2. Installer les dépendances: bun install"
echo "3. Démarrer l'application en mode développement: bun dev"
echo "4. Construire l'application: bun run build"
echo "5. Démarrer l'application en production: bun start"
echo ""
echo "🎉 Votre projet ${PROJECT_NAME} est prêt!" 