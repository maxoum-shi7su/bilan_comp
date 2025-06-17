// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Bilan de compétences',
    tagline: 'Bachelor Universitaire de Technologie Informatique',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://maxoum-shi7su.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/bilan_comp/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'maxoum-shi7su', // Usually your GitHub org/user name.
    projectName: 'bilan_comp', // Usually your repo name.
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'fr',
        locales: ['fr'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/maxoum-shi7su/memoire',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/maxoum-shi7su/memoire',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        {
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'Maxime Mauduit',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/favicon.ico',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'skillsSidebar',
                        position: 'left',
                        label: 'Compétences',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'agileSidebar',
                        position: 'left',
                        label: 'Agile Niort',
                    },
                    
                    /*
                  {
                    type: 'docSidebar',
                    sidebarId: 'introductionSidebar',
                    position: 'left',
                    label: 'Introduction',
                  },
                  {
                    type: 'docSidebar',
                    sidebarId: 'alternanceSidebar',
                    position: 'left',
                    label: 'Alternance',
                  },
                  {
                    type: 'docSidebar',
                    sidebarId: 'remerciementSidebar',
                    position: 'left',
                    label: 'Remerciements',
                  },
                  {
                    type: 'docSidebar',
                    sidebarId: 'annexesSidebar',
                    position: 'left',
                    label: 'Annexes',
                  },
                     */
                    {
                        sidebarId: 'elioblocs',
                        position: 'right',
                        label: 'Elioblocs',
                        href: 'https://app.eliobot.com/',
                    },
                    {
                        sidebarId: 'lib',
                        position: 'right',
                        label: 'Elio Academy',
                        href: 'https://elio.academy/',
                    },
                    {
                        href: 'https://github.com/maxoum-shi7su/bilan_comp',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Plus sur Docusaurus',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discordapp.com/invite/docusaurus',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/docusaurus',
                            },
                        ],
                    },
                    {
                        title: 'Plus sur moi',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/maxoum-shi7su',
                            },
                            {
                                label: 'LinkedIn',
                                href: 'https://www.linkedin.com/in/maxime-mauduit-1b5983263/',
                            },
                        ],
                    },
                    {
                        title: 'Liens utiles',
                        items: [
                            {
                                label: 'La Rochelle Université',
                                href: 'https://www.univ-larochelle.fr/',
                            },
                            {
                                label: 'Elio',
                                href: 'https://eliobot.com/',
                            },
                            {
                                label: 'NiortTech',
                                href: 'https://niort-tech.fr/',
                            },
                        ]
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Mémoire Maxime Mauduit, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        },
};

export default config;
