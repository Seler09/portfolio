// All text on the site lives here. Edit freely: the UI picks it up automatically.

export type Lang = 'en' | 'pl';

const IMG = `${import.meta.env.BASE_URL}img/`;

export const profile = {
  name: 'Bartosz Kalinka',
  email: 'bartoszkalinka@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bartosz-kalinka-101/',
  linkedinLabel: 'linkedin.com/in/bartosz-kalinka-101',
  location: 'Wrocław, Poland',
};

export type Project = {
  name: string;
  /** Sector (or event) shown above the project name. Never a client name. */
  label: string;
  meta?: string;
  bullets: string[];
  tags: string[];
  size?: 'lg' | 'md';
  award?: boolean;
};

export type Content = {
  nav: { about: string; experience: string; projects: string; skills: string; contact: string; menu: string };
  hero: {
    badge: string;
    greeting: string;
    roles: string[];
    lead: string;
    ctaProjects: string;
    ctaContact: string;
    location: string;
    scroll: string;
    terminal: string[];
  };
  stats: { value: number; suffix?: string; label: string }[];
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    traits: { title: string; text: string }[];
  };
  experience: {
    kicker: string;
    title: string;
    jobs: {
      company: string;
      period: string;
      roles: { title: string; period: string }[];
      note?: string;
      summary: string;
      bulletsTitle?: string;
      bullets: string[];
      tech: string[];
    }[];
  };
  projects: { kicker: string; title: string; subtitle: string; awardLabel: string; items: Project[] };
  skills: {
    kicker: string;
    title: string;
    groups: { title: string; items: string[] }[];
    eduTitle: string;
    education: { title: string; detail: string; period: string }[];
    trainingTitle: string;
    training: { title: string; period: string }[];
    langTitle: string;
    languages: { title: string; detail: string }[];
  };
  beyond: {
    kicker: string;
    title: string;
    items: {
      icon: 'car' | 'gauge' | 'moto' | 'mountain' | 'camera';
      title: string;
      text: string;
      photo?: string;
      alt?: string;
      /** Kept in the source but not rendered (e.g. a project that is not ready to show yet). */
      hidden?: boolean;
    }[];
  };
  contact: {
    kicker: string;
    title: string;
    text: string;
    email: string;
    copy: string;
    copied: string;
    linkedin: string;
  };
  footer: { built: string; palette: string };
  palette: {
    placeholder: string;
    empty: string;
    groupNav: string;
    groupActions: string;
    copyEmail: string;
    openLinkedIn: string;
    switchLang: string;
    hint: string;
  };
};

const tech = {
  capgemini: [
    'C#', '.NET 10', 'ASP.NET Core', 'CQRS (MediatR)', 'Razor Pages', 'Angular', 'Blazor', 'EF Core', 'MSSQL',
    'Microsoft Entra ID', 'Azure', 'Azure DevOps', 'SonarCloud', 'xUnit', 'NUnit', 'GitHub Copilot', 'Scrum',
  ],
  vulcan: ['C#', '.NET', 'Ext.js', 'MSSQL', 'SVN', 'Jenkins'],
};

const skillGroups = {
  backend: [
    'C#', '.NET 10', 'ASP.NET Core', 'Razor Pages', 'REST APIs', 'CQRS (MediatR)', 'API versioning',
    'Entity Framework Core', 'MSSQL (T-SQL)', 'Microsoft Entra ID', 'SAP (SOAP / WSDL)', '.NET Framework → .NET 5+',
  ],
  cloud: [
    'Azure App Service', 'Azure Functions', 'Event Grid', 'Blob Storage', 'Application Insights',
    'Azure DevOps CI/CD', 'SonarCloud', 'Docker', 'Kubernetes (fundamentals)',
  ],
  frontend: ['Angular', 'TypeScript', 'Blazor', 'HTML', 'CSS', 'Ext.js'],
  ai: ['GitHub Copilot (custom skills; plan, ask & agent modes)', 'MCP servers (Figma)', 'Claude', 'Context management'],
};

export const content: Record<Lang, Content> = {
  en: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact', menu: 'Menu' },
    hero: {
      badge: 'Open to new opportunities',
      greeting: "Hi, I'm",
      roles: ['Senior .NET Developer', 'Full-stack: C# + Angular', 'Azure & cloud', 'End-to-end owner'],
      lead:
        'I build full-stack applications for international enterprise clients in energy and telecom: from requirements and user stories all the way to production. 8 years in commercial software development, 5+ of them at Capgemini.',
      ctaProjects: 'See projects',
      ctaContact: "Let's talk",
      location: 'Wrocław, Poland',
      scroll: 'Scroll',
      terminal: ['Build succeeded · 0 warnings · 0 errors', "Hello, recruiter 👋  Let's talk."],
    },
    stats: [
      { value: 8, label: 'years in commercial software development' },
      { value: 5700, suffix: '+', label: 'users of a forms platform I migrated to .NET 5' },
      { value: 327, label: 'power plants running that platform' },
      { value: 6, label: 'months from scratch to production as project lead' },
    ],
    about: {
      kicker: 'About',
      title: 'Ownership, end to end.',
      paragraphs: [
        "I'm a senior .NET developer based in Wrocław with 8 years of commercial experience. For the last 5+ years at Capgemini I've been building web and mobile applications for international enterprise clients in energy (power plants worldwide, from wind farms to nuclear) and telecom, in Scrum teams of 3–8 people alongside UX/UI designers and QA.",
        'My core is C#/.NET, Angular and Azure. I like owning a product area end to end: gathering requirements with the client, turning them into user stories, shipping, and looking after it in production. English is my daily working language with client stakeholders.',
      ],
      traits: [
        { title: 'From zero to production', text: 'Led a shipping management system from scratch to production in 6 months: requirements, user stories, delivery.' },
        { title: 'Security-aware by design', text: 'Stopped client-proposed practices that would have over-exposed data or weakened access control, before implementation.' },
        { title: 'Modernisation', text: 'Led the migration of a platform for 5,700+ users from .NET Framework 4.7.2 to .NET 5; in 2026 moved another system to CQRS and .NET 10.' },
        { title: 'Bridge to QA and business', text: 'Go-to person between development and QA. I challenge requirements that do not serve users and present our work to the client.' },
      ],
    },
    experience: {
      kicker: 'Experience',
      title: 'Where I have shipped.',
      jobs: [
        {
          company: 'Capgemini',
          period: '2021 – present',
          roles: [
            { title: 'Senior Software Engineer', period: '2023 – present' },
            { title: 'Software Engineer', period: '2021 – 2023' },
          ],
          summary:
            'Full-stack developer in Scrum teams of 3–8 people, delivering web and mobile applications for international enterprise clients in the energy and telecom sectors. English is the daily language in dailies, refinements, planning, demos and retrospectives.',
          bulletsTitle: 'Beyond delivery',
          bullets: [
            'Interview candidates for the project and onboard new team members.',
            'Flag security and performance risks early.',
            'Go-to person between development and QA: joint root-cause analysis and test sessions, fixes delivered without schedule impact.',
            "Presented an application at the semi-annual product review with the client's Product Owner lead.",
            'Join yearly on-site visits to power plants to learn how end users work with our apps; organise team events during client visits.',
          ],
          tech: tech.capgemini,
        },
        {
          company: 'VULCAN',
          period: '2018 – 2021',
          roles: [{ title: 'Junior Software Developer', period: '2018 – 2021' }],
          note: 'after a part-time internship during studies',
          summary: "Electronic school register: the company's largest and most important product.",
          bullets: [
            'Developed existing functionality and new modules in a large-scale system with a significant legacy codebase.',
            'Led the integration of an online payment system.',
          ],
          tech: tech.vulcan,
        },
      ],
    },
    projects: {
      kicker: 'Projects',
      title: 'Selected work.',
      subtitle: 'Enterprise products for international clients in energy and telecom, built at Capgemini.',
      awardLabel: '1st place',
      items: [
        {
          name: 'Package Management System',
          label: 'Energy',
          meta: 'Project lead',
          size: 'lg',
          bullets: [
            'Built from scratch and launched in production within 6 months; owned delivery end to end.',
            'Gathered requirements with the client alongside a senior team lead and turned business assumptions into user stories.',
            'Transport orders for palletised shipments with weight and insurance cost calculation; automated bid requests to carriers (DHL, UPS).',
            'Mobile app with QR code scanning, shipment tracking and damage documentation.',
          ],
          tags: ['Project lead', 'Web + mobile', 'Carrier integrations', 'QR scanning'],
        },
        {
          name: 'Form Creation Platform',
          label: 'Energy',
          meta: '327 power plants · 5,700+ users',
          size: 'lg',
          bullets: [
            'Owned an integration with another internal safety system end to end: API-based form exchange with a system built by another client team.',
            'API versioning, change tracking, notifications, role-based commenting, translations for editable labels.',
            'SAP integration via WSDL imports; led the migration from .NET Framework 4.7.2 to .NET 5.',
          ],
          tags: ['API versioning', 'SAP (WSDL)', '.NET 5 migration'],
        },
        {
          name: 'Incident Logging System',
          label: 'Energy',
          bullets: [
            'Event logging and shift handovers for power plant staff, running in production.',
            '2026: migrated the system to CQRS (MediatR) and .NET 10.',
            'Challenged requirements that did not serve users and got one feature dropped from scope.',
          ],
          tags: ['CQRS', 'MediatR', '.NET 10'],
        },
        {
          name: 'Scaffolding & Insulation Management',
          label: 'Energy',
          meta: 'Web and mobile',
          bullets: [
            'Multi-step status workflow and versioned reporting for scaffolding work in power plants.',
            'Shared attachments between report versions, reducing Azure Blob Storage costs.',
          ],
          tags: ['Workflow', 'Blob Storage'],
        },
        {
          name: 'Document Migration Tool for SAP',
          label: 'Energy',
          bullets: [
            'Replaced a legacy tool and went live in production within 3 months.',
            'Form templates, field definitions and an administrator approval flow.',
          ],
          tags: ['SAP', 'Approval flow'],
        },
        {
          name: 'Access Management System',
          label: 'Telecom',
          bullets: [
            'Employee registration, system selection and access request workflow with automated email notifications.',
            "Worked directly with the client's administrator up to the production release.",
          ],
          tags: ['Workflow', 'Notifications'],
        },
        {
          name: 'MS Teams add-in for mailing lists',
          label: 'Company hackathon 2022',
          award: true,
          bullets: ['In a team of three: subscribe, unsubscribe and email list members directly from Teams.'],
          tags: ['Blazor', '.NET', 'Azure'],
        },
      ],
    },
    skills: {
      kicker: 'Skills',
      title: 'The toolbox.',
      groups: [
        { title: 'Backend', items: skillGroups.backend },
        { title: 'Cloud & DevOps', items: skillGroups.cloud },
        { title: 'Frontend', items: skillGroups.frontend },
        { title: 'AI-assisted development', items: skillGroups.ai },
        { title: 'Testing & quality', items: ['xUnit', 'NUnit', 'Unit testing', 'Code reviews', 'Joint test sessions with QA', 'Security-aware design'] },
        { title: 'Ways of working', items: ['Scrum', 'Requirements analysis', 'User stories', 'Client demos', 'Technical interviews', 'Onboarding', 'Git', 'Jira'] },
      ],
      eduTitle: 'Education',
      education: [
        { title: "Master's degree, IT Systems Engineering", detail: 'Wrocław University of Science and Technology', period: '2018 – 2019' },
        { title: "Bachelor's degree, Computer Systems and Networks", detail: 'Wrocław University of Science and Technology', period: '2014 – 2018' },
      ],
      trainingTitle: 'Training',
      training: [
        { title: 'Kubernetes', period: '2026' },
        { title: 'Docker', period: '2026' },
        { title: 'Azure Developer (AZ-204 track)', period: '2025' },
      ],
      langTitle: 'Languages',
      languages: [
        { title: 'Polish', detail: 'native' },
        { title: 'English', detail: 'B2, daily communication with international clients' },
      ],
    },
    beyond: {
      kicker: 'Beyond code',
      title: 'Things I do with my hands.',
      items: [
        { icon: 'car', title: 'Classic Volvo 960', text: 'Keeping it on the road myself.', photo: `${IMG}volvo-960.webp`, alt: 'Grey Volvo 960 parked at night in Wrocław' },
        { icon: 'camera', title: 'Photography', text: 'Catching the light along the way: cities, mountains, coastlines.', photo: `${IMG}sunset-sail.webp`, alt: 'Sailboat on the Adriatic at sunset' },
        { icon: 'moto', title: 'Adventure motorcycling', text: '7 days across the Balkans on a BMW GS (2026).', photo: `${IMG}bmw-gs.webp`, alt: 'BMW GS motorcycle by the Adriatic sea at sunset' },
        { icon: 'mountain', title: 'Endurance', text: 'Crown of Polish Mountains, gym, swimming, half-marathon prep.', photo: `${IMG}mountain-trail.webp`, alt: 'Mountain trail under autumn beech trees' },
        // Hidden until the gauge is ready to show. Photo waiting in drafts/digital-gauge.webp.
        { icon: 'gauge', title: 'Digital car gauge', text: 'Building one with my brother: hardware and software.', hidden: true },
      ],
    },
    contact: {
      kicker: 'Contact',
      title: "Let's build something together.",
      text: "Looking for a senior .NET or full-stack engineer? I'm happy to talk about the role, the product and how I can help your team.",
      email: 'Email me',
      copy: 'Copy email',
      copied: 'Email copied to clipboard',
      linkedin: 'LinkedIn',
    },
    footer: { built: 'Built with React, TypeScript and Vite.', palette: 'to open the command palette' },
    palette: {
      placeholder: 'Type a command or search…',
      empty: 'No results',
      groupNav: 'Go to',
      groupActions: 'Actions',
      copyEmail: 'Copy email address',
      openLinkedIn: 'Open LinkedIn profile',
      switchLang: 'Przełącz na polski',
      hint: 'navigate · Enter to select · Esc to close',
    },
  },

  pl: {
    nav: { about: 'O mnie', experience: 'Doświadczenie', projects: 'Projekty', skills: 'Umiejętności', contact: 'Kontakt', menu: 'Menu' },
    hero: {
      badge: 'Otwarty na nowe wyzwania',
      greeting: 'Cześć, jestem',
      roles: ['Senior .NET Developer', 'Full-stack: C# + Angular', 'Azure i chmura', 'Dowożę end to end'],
      lead:
        'Tworzę aplikacje full-stack dla międzynarodowych klientów korporacyjnych z branży energetycznej i telekomunikacyjnej: od wymagań i user stories aż po produkcję. 8 lat komercyjnego doświadczenia, w tym ponad 5 w Capgemini.',
      ctaProjects: 'Zobacz projekty',
      ctaContact: 'Porozmawiajmy',
      location: 'Wrocław',
      scroll: 'Przewiń',
      terminal: ['Build succeeded · 0 warnings · 0 errors', 'Dzień dobry 👋  Porozmawiajmy.'],
    },
    stats: [
      { value: 8, label: 'lat komercyjnego doświadczenia' },
      { value: 5700, suffix: '+', label: 'użytkowników platformy, którą zmigrowałem do .NET 5' },
      { value: 327, label: 'elektrowni korzysta z tej platformy' },
      { value: 6, label: 'miesięcy od zera do produkcji jako project lead' },
    ],
    about: {
      kicker: 'O mnie',
      title: 'Odpowiedzialność od początku do końca.',
      paragraphs: [
        'Jestem senior .NET developerem z Wrocławia z 8-letnim doświadczeniem komercyjnym. Od ponad 5 lat w Capgemini tworzę aplikacje webowe i mobilne dla międzynarodowych klientów korporacyjnych z branży energetycznej (elektrownie na całym świecie, od farm wiatrowych po jądrowe) i telekomunikacyjnej, w zespołach Scrum liczących 3–8 osób, razem z projektantami UX/UI i QA.',
        'Moja specjalność to C#/.NET, Angular i Azure. Lubię brać obszar produktu na siebie od początku do końca: zbieram wymagania z klientem, zamieniam je w user stories, dowożę i dbam o to, co działa na produkcji. Angielski to mój codzienny język pracy z interesariuszami klienta.',
      ],
      traits: [
        { title: 'Od zera do produkcji', text: 'Poprowadziłem system do zarządzania wysyłkami od zera do produkcji w 6 miesięcy: wymagania, user stories, dostarczenie.' },
        { title: 'Bezpieczeństwo od projektu', text: 'Zatrzymałem proponowane przez klienta praktyki, które nadmiernie odsłoniłyby dane lub osłabiły kontrolę dostępu, zanim trafiły do implementacji.' },
        { title: 'Modernizacja', text: 'Poprowadziłem migrację platformy dla 5700+ użytkowników z .NET Framework 4.7.2 na .NET 5; w 2026 przeniosłem kolejny system na CQRS i .NET 10.' },
        { title: 'Pomost między QA a biznesem', text: 'Pierwsza osoba do kontaktu między developmentem a QA. Kwestionuję wymagania, które nie służą użytkownikom, i prezentuję naszą pracę klientowi.' },
      ],
    },
    experience: {
      kicker: 'Doświadczenie',
      title: 'Gdzie dowoziłem.',
      jobs: [
        {
          company: 'Capgemini',
          period: '2021 – obecnie',
          roles: [
            { title: 'Senior Software Engineer', period: '2023 – obecnie' },
            { title: 'Software Engineer', period: '2021 – 2023' },
          ],
          summary:
            'Full-stack developer w zespołach Scrum liczących 3–8 osób, dostarczający aplikacje webowe i mobilne dla międzynarodowych klientów korporacyjnych z sektora energetycznego i telekomunikacyjnego. Angielski na co dzień: daily, refinementy, planningi, dema i retrospektywy.',
          bulletsTitle: 'Poza samym dowożeniem',
          bullets: [
            'Prowadzę rozmowy techniczne z kandydatami do projektu i wdrażam nowe osoby w zespole.',
            'Wcześnie sygnalizuję ryzyka związane z bezpieczeństwem i wydajnością.',
            'Pierwsza osoba do kontaktu między developmentem a QA: wspólna analiza przyczyn i sesje testowe, poprawki bez wpływu na harmonogram.',
            'Zaprezentowałem aplikację na półrocznym przeglądzie produktów z liderem Product Ownerów klienta.',
            'Co roku jeżdżę do elektrowni, żeby zobaczyć, jak użytkownicy pracują z naszymi aplikacjami; organizuję wydarzenia zespołowe podczas wizyt klienta.',
          ],
          tech: tech.capgemini,
        },
        {
          company: 'VULCAN',
          period: '2018 – 2021',
          roles: [{ title: 'Junior Software Developer', period: '2018 – 2021' }],
          note: 'po stażu w niepełnym wymiarze w trakcie studiów',
          summary: 'Elektroniczny dziennik szkolny: największy i najważniejszy produkt firmy.',
          bullets: [
            'Rozwijałem istniejące funkcjonalności i nowe moduły w dużym systemie ze znaczną ilością kodu legacy.',
            'Poprowadziłem integrację systemu płatności online.',
          ],
          tech: tech.vulcan,
        },
      ],
    },
    projects: {
      kicker: 'Projekty',
      title: 'Wybrane realizacje.',
      subtitle: 'Produkty korporacyjne dla międzynarodowych klientów z energetyki i telekomunikacji, tworzone w Capgemini.',
      awardLabel: '1. miejsce',
      items: [
        {
          name: 'Package Management System',
          label: 'Energetyka',
          meta: 'Project lead',
          size: 'lg',
          bullets: [
            'Zbudowany od zera i uruchomiony na produkcji w 6 miesięcy; odpowiadałem za całe dostarczenie.',
            'Zbierałem wymagania z klientem razem z senior team leadem i zamieniałem założenia biznesowe w user stories.',
            'Zlecenia transportowe dla przesyłek paletowych z wyliczaniem wagi i kosztu ubezpieczenia; automatyczne zapytania ofertowe do przewoźników (DHL, UPS).',
            'Aplikacja mobilna ze skanowaniem kodów QR, śledzeniem przesyłek i dokumentowaniem uszkodzeń.',
          ],
          tags: ['Project lead', 'Web + mobile', 'Integracje z przewoźnikami', 'Kody QR'],
        },
        {
          name: 'Form Creation Platform',
          label: 'Energetyka',
          meta: '327 elektrowni · 5700+ użytkowników',
          size: 'lg',
          bullets: [
            'Odpowiadałem end to end za integrację z innym wewnętrznym systemem bezpieczeństwa: wymiana formularzy przez API z systemem innego zespołu klienta.',
            'Wersjonowanie API, śledzenie zmian, powiadomienia, komentarze oparte na rolach, tłumaczenia edytowalnych etykiet.',
            'Integracja z SAP przez importy WSDL; poprowadziłem migrację z .NET Framework 4.7.2 na .NET 5.',
          ],
          tags: ['Wersjonowanie API', 'SAP (WSDL)', 'Migracja do .NET 5'],
        },
        {
          name: 'Incident Logging System',
          label: 'Energetyka',
          bullets: [
            'Rejestrowanie zdarzeń i przekazywanie zmian dla personelu elektrowni, działa na produkcji.',
            '2026: migracja systemu na CQRS (MediatR) i .NET 10.',
            'Zakwestionowałem wymagania, które nie służyły użytkownikom, i jedna funkcja wypadła z zakresu.',
          ],
          tags: ['CQRS', 'MediatR', '.NET 10'],
        },
        {
          name: 'Scaffolding & Insulation Management',
          label: 'Energetyka',
          meta: 'Web i mobile',
          bullets: [
            'Wieloetapowy workflow statusów i wersjonowane raporty dla prac rusztowaniowych w elektrowniach.',
            'Współdzielone załączniki między wersjami raportów, co obniżyło koszty Azure Blob Storage.',
          ],
          tags: ['Workflow', 'Blob Storage'],
        },
        {
          name: 'Document Migration Tool for SAP',
          label: 'Energetyka',
          bullets: [
            'Zastąpił narzędzie legacy i trafił na produkcję w 3 miesiące.',
            'Szablony formularzy, definicje pól i proces akceptacji przez administratora.',
          ],
          tags: ['SAP', 'Proces akceptacji'],
        },
        {
          name: 'Access Management System',
          label: 'Telekomunikacja',
          bullets: [
            'Rejestracja pracowników, wybór systemów i workflow wniosków o dostęp z automatycznymi powiadomieniami e-mail.',
            'Bezpośrednia współpraca z administratorem po stronie klienta aż do wdrożenia produkcyjnego.',
          ],
          tags: ['Workflow', 'Powiadomienia'],
        },
        {
          name: 'Dodatek MS Teams do list mailingowych',
          label: 'Firmowy hackathon 2022',
          award: true,
          bullets: ['W trzyosobowym zespole: zapisywanie się, wypisywanie i wysyłanie maili do członków listy prosto z Teams.'],
          tags: ['Blazor', '.NET', 'Azure'],
        },
      ],
    },
    skills: {
      kicker: 'Umiejętności',
      title: 'Skrzynka z narzędziami.',
      groups: [
        { title: 'Backend', items: skillGroups.backend },
        { title: 'Chmura i DevOps', items: skillGroups.cloud },
        { title: 'Frontend', items: skillGroups.frontend },
        { title: 'Programowanie z AI', items: ['GitHub Copilot (własne skille; tryby plan, ask i agent)', 'Serwery MCP (Figma)', 'Claude', 'Zarządzanie kontekstem'] },
        { title: 'Testy i jakość', items: ['xUnit', 'NUnit', 'Testy jednostkowe', 'Code review', 'Wspólne sesje testowe z QA', 'Bezpieczeństwo w projekcie'] },
        { title: 'Sposób pracy', items: ['Scrum', 'Analiza wymagań', 'User stories', 'Dema dla klienta', 'Rozmowy techniczne', 'Onboarding', 'Git', 'Jira'] },
      ],
      eduTitle: 'Wykształcenie',
      education: [
        { title: 'Studia magisterskie, Inżynieria systemów informatycznych', detail: 'Politechnika Wrocławska', period: '2018 – 2019' },
        { title: 'Studia I stopnia, Systemy i sieci komputerowe', detail: 'Politechnika Wrocławska', period: '2014 – 2018' },
      ],
      trainingTitle: 'Szkolenia',
      training: [
        { title: 'Kubernetes', period: '2026' },
        { title: 'Docker', period: '2026' },
        { title: 'Azure Developer (ścieżka AZ-204)', period: '2025' },
      ],
      langTitle: 'Języki',
      languages: [
        { title: 'Polski', detail: 'ojczysty' },
        { title: 'Angielski', detail: 'B2, codzienna komunikacja z klientami zagranicznymi' },
      ],
    },
    beyond: {
      kicker: 'Po godzinach',
      title: 'Rzeczy, które robię własnymi rękami.',
      items: [
        { icon: 'car', title: 'Klasyczne Volvo 960', text: 'Sam dbam o to, żeby jeździło.', photo: `${IMG}volvo-960.webp`, alt: 'Szare Volvo 960 nocą we Wrocławiu' },
        { icon: 'camera', title: 'Fotografia', text: 'Łapię światło po drodze: miasta, góry, wybrzeża.', photo: `${IMG}sunset-sail.webp`, alt: 'Żaglówka na Adriatyku o zachodzie słońca' },
        { icon: 'moto', title: 'Motocyklowe wyprawy', text: '7 dni przez Bałkany na BMW GS (2026).', photo: `${IMG}bmw-gs.webp`, alt: 'Motocykl BMW GS nad Adriatykiem o zachodzie słońca' },
        { icon: 'mountain', title: 'Wytrzymałość', text: 'Korona Gór Polski, siłownia, pływanie, przygotowania do półmaratonu.', photo: `${IMG}mountain-trail.webp`, alt: 'Górski szlak pod jesiennymi bukami' },
        { icon: 'gauge', title: 'Cyfrowy zegar samochodowy', text: 'Buduję go z bratem: sprzęt i oprogramowanie.', hidden: true },
      ],
    },
    contact: {
      kicker: 'Kontakt',
      title: 'Zbudujmy coś razem.',
      text: 'Szukasz senior .NET lub full-stack developera? Chętnie porozmawiam o roli, produkcie i o tym, jak mogę pomóc Twojemu zespołowi.',
      email: 'Napisz do mnie',
      copy: 'Kopiuj e-mail',
      copied: 'Skopiowano adres e-mail',
      linkedin: 'LinkedIn',
    },
    footer: { built: 'Zbudowane w React, TypeScript i Vite.', palette: 'otwiera paletę poleceń' },
    palette: {
      placeholder: 'Wpisz polecenie lub szukaj…',
      empty: 'Brak wyników',
      groupNav: 'Przejdź do',
      groupActions: 'Akcje',
      copyEmail: 'Kopiuj adres e-mail',
      openLinkedIn: 'Otwórz profil LinkedIn',
      switchLang: 'Switch to English',
      hint: 'nawigacja · Enter wybiera · Esc zamyka',
    },
  },
};
