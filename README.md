# 🚀 Template Next.js

Un template Next.js moderne et complet avec TypeScript, Tailwind CSS, internationalisation et optimisations SEO.

## ✨ Fonctionnalités

- **⚡ Next.js 15** - Framework React moderne avec App Router
- **🎨 Tailwind CSS** - Framework CSS utilitaire
- **🌍 Internationalisation** - Support multi-langues avec next-intl
- **📱 PWA Ready** - Configuration pour Progressive Web App
- **🔍 SEO Optimisé** - Métadonnées et Open Graph configurés
- **📊 Analytics** - Intégration Google Analytics
- **🍪 Cookies** - Gestion du consentement cookies
- **🐳 Docker** - Configuration Docker et Docker Compose
- **⚙️ CI/CD** - Workflow GitHub Actions pour déploiement
- **🎯 TypeScript** - Typage statique complet
- **🎭 shadcn/ui** - Composants UI modernes
- **📱 Responsive** - Design adaptatif mobile-first

## 🛠️ Technologies

- [Next.js 15](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalisation
- [shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [GSAP](https://greensock.com/gsap/) - Animations
- [Lucide React](https://lucide.dev/) - Icônes
- [Radix UI](https://www.radix-ui.com/) - Composants primitifs

## 🚀 Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) 18+ ou [Bun](https://bun.sh/) 1.0+
- [Git](https://git-scm.com/)

### Installation

1. **Cloner le template**

   ```bash
   git clone <votre-repo>
   cd nextjs-template
   ```

2. **Installer les dépendances**

   ```bash
   bun install
   ```

3. **Configurer l'environnement**

   ```bash
   make env.setup
   # Ou créer manuellement .env.local
   ```

4. **Démarrer en développement**

   ```bash
   make dev
   # Ou
   bun dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🌍 Internationalisation

Le projet supporte le français et l'anglais par défaut.

### Structure des traductions

```
src/i18n/
├── fr/
│   ├── common.json
│   ├── metas.json
│   └── projects.json
└── en/
    ├── common.json
    ├── metas.json
    └── projects.json
```

### Ajouter une nouvelle langue

1. Créer le dossier `src/i18n/[locale]/`
2. Copier les fichiers JSON depuis `fr/`
3. Traduire le contenu
4. Ajouter la locale dans `src/i18n/config.ts`

## 🎨 Personnalisation

### Couleurs et thème

Modifiez `tailwind.config.ts` pour personnaliser :

- Couleurs de la marque
- Typographie
- Espacements
- Animations

### Composants

Les composants sont dans `src/components/` :

- `ui/` - Composants shadcn/ui
- `Layout/` - Composants de mise en page
- `Medias/` - Composants média
- `Texts/` - Composants texte

### Pages

Les pages sont dans `src/container/pages/` :

- `HomePage.tsx` - Page d'accueil
- `ProjectsPage.tsx` - Page projets
- `ProjectDetail.tsx` - Détail d'un projet

## 📊 Analytics et SEO

### Google Analytics

1. Créer un compte Google Analytics
2. Ajouter `NEXT_PUBLIC_GA_ID` dans `.env.local`
3. Le composant `GoogleAnalytics` s'occupe du reste

### SEO

Les métadonnées sont configurées dans :

- `src/services/metadata.ts` - Métadonnées globales
- `src/container/components/SeoHead/` - Composant SEO
- `public/manifest.json` - PWA manifest

## 🐳 Déploiement

### Docker

### GitHub Actions

Le workflow `.github/workflows/deploy.yml` :

1. Construit l'image Docker
2. La pousse sur GitHub Container Registry
3. Déploie sur votre serveur

## 📁 Structure du projet

```
src/
├── app/                 # App Router (Next.js 13+)
│   └── [locale]/       # Routes internationalisées
├── components/          # Composants réutilisables
│   ├── ui/             # Composants shadcn/ui
│   ├── Layout/         # Composants de mise en page
│   └── ...
├── container/           # Conteneurs et pages
│   ├── components/     # Composants spécifiques aux pages
│   └── pages/          # Pages de l'application
├── contexts/           # Contextes React
├── hooks/              # Hooks personnalisés
├── i18n/               # Internationalisation
├── lib/                # Utilitaires et configurations
├── services/           # Services (métadonnées, etc.)
├── static/             # Données statiques
└── types/              # Types TypeScript
```
