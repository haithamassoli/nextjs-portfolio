import type {
	Certification,
	EducationItem,
	ExperienceItem,
	I18n,
	I18nBlocks,
} from './types';

export const profile = {
	name: {
		en: 'Haitham Assoli',
		ar: 'هيثم العسولي',
	} satisfies I18n,

	title: {
		en: 'Web & Mobile Full-Stack Engineer',
		ar: 'مهندس برمجيات وتطبيقات ويب وجوال',
	} satisfies I18n,

	tagline: {
		en: 'I design and build fast, reliable web and mobile apps—from system architecture to production launch.',
		ar: 'أصمم وأطور تطبيقات ويب وهواتف ذكية سريعة وعملية، مع الاهتمام بكامل تفاصيل المنتج من المعمارية حتى الإطلاق.',
	} satisfies I18n,

	location: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' } satisfies I18n,

	email: 'haitham.b.assoli@gmail.com',
	phone: '+962 77 619 3666',

	links: {
		github: 'https://github.com/haithamassoli',
		linkedin: 'https://www.linkedin.com/in/haithamassoli/',
		website: 'https://assoli.site',
		resume: 'https://cv.assoli.site',
		playStore: 'https://play.google.com/store/apps/dev?id=6385259170030268414',
	},

	about: {
		en: [
			'I am a full-stack engineer passionate about building complete, polished web and mobile products. I take ownership of the full journey—from data modeling and scalable APIs to intuitive interfaces, deployment, and app store releases.',
			'I focus on solving real-world engineering constraints: offline-first apps that stay fast on weak networks, instant search experiences, high-concurrency booking systems without double-booking, and on-device private AI.',
			'My recent work spans multi-vendor e-commerce, bioinformatics platforms used by researchers worldwide, community initiatives, and consumer apps across iOS and Android.',
		],
		ar: [
			'مهندس برمجيات متكامل شغوف ببناء وتطوير منتجات ويب وتطبيقات هواتف ذكية عالية الجودة. أتولى دورة حياة المنتج كاملة؛ بدءاً من تصميم المعمارية البرمجية وقواعد البيانات، مروراً بتجربة المستخدم والواجهات، وحتى النشر والمتابعة المستمرة في المتاجر.',
			'أهتم بمعالجة التحديات الهندسية الحقيقية: تشغيل التطبيقات بسلاسة حتى مع انقطاع الإنترنت، وبناء أنظمة بحث فورية، وضمان تزامن الحجوزات والمدفوعات دون أي تعارض، وتوظيف الذكاء الاصطناعي محلياً على الأجهزة بأمان وخصوصية.',
			'تتنوع مشاريعي الأخيرة بين منصات التجارة الإلكترونية لعدة بائعين، وحلول المعلوماتية الحيوية التي يعتمد عليها آلاف الباحثين حول العالم، وتطبيقات خدمية ومجتمعية على منصتي iOS وأندرويد.',
		],
	} satisfies I18nBlocks,

	experience: [
		{
			company: { en: 'GoldenTik', ar: 'GoldenTik' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: 'Since 2026',
			highlights: {
				en: [
					'Architected and built multi-vendor e-commerce platforms using NestJS, Next.js, and React Native.',
					'Engineered resilient backend services designed for high-throughput concurrent vendor operations.',
					'Created fast, responsive storefronts and unified mobile clients powered by a single shared API.',
				],
				ar: [
					'تطوير منصة تجارة إلكترونية متكاملة لعدة بائعين باستخدام NestJS وNext.js وReact Native.',
					'بناء خدمات خلفية متينة وعالية الكفاءة تدعم الضغط العالي وتزامن عمليات البيع والشراء.',
					'تصميم واجهات متجر سريعة وتطبيق موبايل موحد يتكاملان بسلاسة مع واجهة برمجية موحدة.',
				],
			},
		},
		{
			company: { en: 'Bionl.Ai', ar: 'Bionl.Ai' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: '2025 to 2026',
			location: { en: 'Remote', ar: 'عن بُعد' },
			highlights: {
				en: [
					'Built modern bioinformatics applications within a shared React and React Native monorepo.',
					'Leveraged TypeScript, Zod, and Prisma for end-to-end type safety and robust data validation.',
					'Managed reactive server state with TanStack Query and built high-speed APIs with Hono.',
					'Contributed to a leading no-code research platform trusted by over 8,000 scientists worldwide.',
					'Integrated generative AI for automated data analysis, literature search, and custom analysis pipelines.',
					'Maintained strict compliance with HIPAA, GDPR, and SOC 2 Type 2 security standards.',
				],
				ar: [
					'تطوير منصة معلوماتية حيوية متقدمة داخل مستودع موحد (Monorepo) يجمع الويب وتطبيق الهاتف.',
					'الاعتماد على TypeScript وZod وPrisma لضمان دقة تدفق البيانات وأمان الأنواع البرمجية.',
					'إدارة حالة البيانات والنماذج التفاعلية باستخدام TanStack مع خوادم Hono فائقة السرعة.',
					'المساهمة الفعالة في منصة بحثية رائدة يعتمد عليها أكثر من 8,000 باحث وعالم حول العالم.',
					'دمج ميزات الذكاء الاصطناعي التوليدي لتحليل البيانات العلمية، والبحث الذكي في الأوراق البحثية.',
					'الالتزام بأعلى معايير الأمان والخصوصية الطبية العالمية (HIPAA وGDPR وSOC 2).',
				],
			},
		},
		{
			company: { en: 'Malabji', ar: 'ملعبجي' },
			role: { en: 'Founder & Lead Engineer', ar: 'المؤسس والمطور الرئيسي' },
			period: 'Since 2025',
			highlights: {
				en: [
					'Founded and launched a sports matchmaking and pitch-booking platform on iOS and Android.',
					'Led the entire product cycle: UI/UX design, mobile development, backend APIs, app-store releases, and customer support.',
				],
				ar: [
					'تأسيس وإطلاق تطبيق رياضي لحجز الملاعب وتنسيق المباريات بين اللاعبين على منصتي iOS وأندرويد.',
					'قيادة وتطوير كامل مراحل المنتج: التصميم، برمجة التطبيق، الأنظمة الخلفية، النشر في المتاجر، والدعم الفني.',
				],
			},
		},
		{
			company: { en: 'Freelance', ar: 'عمل حر واستشارات' },
			role: {
				en: 'Full-Stack Web & Mobile Engineer',
				ar: 'مهندس برمجيات وتطبيقات مستقل',
			},
			period: 'Since 2022',
			highlights: {
				en: [
					'Partnered directly with clients to translate business goals into high-quality digital solutions delivered on schedule.',
					'Shipped custom platforms for commerce, education, tourism, municipal services, and non-profits across Jordan and Saudi Arabia.',
				],
				ar: [
					'التعاون المباشر مع العملاء وأصحاب المشاريع لتحويل أفكارهم إلى حلول رقمية متقنة ضمن المواعيد المحددة.',
					'إنجاز وإطلاق مشاريع متنوعة في التجارة، والتعليم، والسياحة، والخدمات البلدية، والمنظمات غير الربحية في الأردن والسعودية.',
				],
			},
		},
		{
			company: { en: 'Repzo', ar: 'Repzo' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: '2022 to 2023',
			highlights: {
				en: [
					'Developed and optimized enterprise operations dashboards using TypeScript and React.',
					'Refactored dependencies and core modules to enhance application security and execution speed.',
					'Maintained backend REST microservices built with Node.js and Express.',
				],
				ar: [
					'تطوير وصيانة لوحات تحكم تشغيلية وإدارية واسعة النطاق باستخدام TypeScript وReact.',
					'تحديث البنية البرمجية والتبعيات لتعزيز معايير الأمان ورفع سرعة واستجابة النظام.',
					'تطوير وصيانة خدمات الخادم وواجهات الـ API بالاعتماد على Node.js وExpress.',
				],
			},
		},
		{
			company: { en: 'Orange Jordan', ar: 'أورنج الأردن' },
			role: {
				en: 'Full-Stack Developer Intern',
				ar: 'متدرب تطوير برمجيات متكامل',
			},
			period: '2021 to 2022',
			location: { en: 'Internship', ar: 'تدريب مكثف' },
			highlights: {
				en: [
					'Completed an intensive 7-month bootcamp focused on modern, production-grade web development.',
					'Built 10 full-stack web applications collaborating with senior engineering mentors.',
				],
				ar: [
					'برنامج تدريبي مكثف لمدة 7 أشهر ركز على التطبيق العملي لأحدث تقنيات الويب الشاملة.',
					'بناء وتطوير 10 تطبيقات ومشاريع ويب متكاملة بالتعاون مع فرق العمل والموجهين.',
				],
			},
		},
		{
			company: { en: 'EECommittee', ar: 'لجنة الهندسة الكهربائية' },
			role: {
				en: 'Full-Stack Developer (Volunteer)',
				ar: 'مطور برمجيات متطوع',
			},
			period: 'Since 2018',
			highlights: {
				en: [
					'Volunteered to build dedicated digital tools and learning resources for engineering students.',
					"Shipped and actively maintain the committee's Android app and community portal.",
				],
				ar: [
					'مبادرة تطوعية لخدمة طلاب الهندسة وتوفير أدوات ومصادر تعليمية داعمة لهم.',
					'تطوير وإطلاق الموقع الإلكتروني وتطبيق الأندرويد الخاص باللجنة، مع استمرار دعمهما وتحديثهما.',
				],
			},
		},
	] satisfies ExperienceItem[],

	education: [
		{
			school: { en: 'Irbid National University', ar: 'جامعة إربد الأهلية' },
			degree: { en: 'BSc, Computer Science', ar: 'بكالوريوس، علم الحاسوب' },
			period: '2022 to 2024',
			note: { en: 'Grade: Excellent (Honors)', ar: 'التقدير: ممتاز' },
		},
		{
			school: {
				en: 'Jordan University of Science and Technology',
				ar: 'جامعة العلوم والتكنولوجيا الأردنية',
			},
			degree: {
				en: 'BSc, Electrical and Electronics Engineering',
				ar: 'بكالوريوس، الهندسة الكهربائية والإلكترونية',
			},
			period: '2018 to 2022',
			note: {
				en: 'Completed coursework (Grade: Very Good)',
				ar: 'دراسة جامعية (التقدير: جيد جداً)',
			},
		},
	] satisfies EducationItem[],

	certifications: [
		{
			name: { en: 'AWS DevOps', ar: 'AWS DevOps' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Sep 2024',
			description: {
				en: 'Designing, deploying, and operating automated cloud infrastructure and CI/CD pipelines.',
				ar: 'تصميم وبناء وتشغيل البنى التحتية السحابية وأتمتة النشر المستمر (CI/CD).',
			},
		},
		{
			name: { en: 'Data Structures Decode', ar: 'Data Structures Decode' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'In-depth mastery of foundational data structures, algorithmic complexity, and real-world problem solving.',
				ar: 'إتقان هياكل البيانات الأساسية والخوارزميات وتطبيقها لحل التحديات البرمجية المعقدة.',
			},
		},
		{
			name: {
				en: 'Algorithms Analysis and Design from Scratch',
				ar: 'تحليل وتصميم الخوارزميات من الصفر',
			},
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'Analyzing computational efficiency, space-time trade-offs, and optimal algorithmic design patterns.',
				ar: 'تحليل كفاءة الخوارزميات وتصميم حلول برمجية مثالية من حيث السرعة واستهلاك الذاكرة.',
			},
		},
		{
			name: { en: 'Node.js From Scratch', ar: 'Node.js من الصفر' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'Understanding the Node.js event loop, asynchronous I/O, streams, and low-level internals.',
				ar: 'فهم معمق لآلية عمل Node.js الداخلية وحلقة الأحداث (Event Loop) والمعالجة غير المتزامنة.',
			},
		},
		{
			name: {
				en: 'Fundamentals of Database Engineering',
				ar: 'أساسيات هندسة قواعد البيانات',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Feb 2023',
			description: {
				en: 'Comprehensive study of indexing, ACID transactions, partitioning, replication, B-trees, and concurrency control.',
				ar: 'دراسة شاملة لفهرسة قواعد البيانات، معاملات ACID، التقسيم، أشجار B، وإدارة التزامن والأمان.',
			},
		},
		{
			name: {
				en: 'JavaScript Algorithms and Data Structures Masterclass',
				ar: 'خوارزميات وهياكل بيانات JavaScript المتقدمة',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Feb 2022',
			description: {
				en: 'Advanced algorithm patterns, recursive problem solving, and performance optimization.',
				ar: 'أنماط الخوارزميات المتقدمة، التكرار البرمجي، وتحسين الأداء في جافاسكريبت.',
			},
		},
		{
			name: {
				en: 'React Native: The Practical Guide',
				ar: 'React Native: الدليل العملي الشامل',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Apr 2022',
			description: {
				en: 'End-to-end mobile engineering: native device bridges, navigation architectures, gestures, and performance tuning.',
				ar: 'تطوير شامل لتطبيقات الجوال: التعامل مع ميزات الجهاز، التنقل، الإيماءات التفاعلية، وضبط الأداء.',
			},
		},
		{
			name: { en: 'Linux Basics', ar: 'أساسيات نظام لينكس' },
			issuer: { en: 'Flex Courses', ar: 'Flex Courses' },
			date: 'Apr 2022',
			description: {
				en: 'Shell scripting, server administration, process management, and Unix environment essentials.',
				ar: 'إتقان سطر الأوامر (Bash)، إدارة الخوادم، والعمل مع أنظمة لينكس بكفاءة.',
			},
		},
	] satisfies Certification[],

	skills: {
		languages: [
			'TypeScript',
			'JavaScript',
			'Swift',
			'Kotlin',
			'Python',
			'C++',
			'C#',
			'PHP',
		],
		frontend: [
			'React',
			'Next.js',
			'Astro',
			'Tailwind CSS',
			'Framer Motion',
			'Redux',
			'TanStack Query',
		],
		mobile: [
			'React Native',
			'Expo',
			'Expo Router',
			'Reanimated',
			'Skia',
			'Restyle',
			'SwiftUI',
			'Jetpack Compose',
		],
		backend: [
			'Node.js',
			'NestJS',
			'Express',
			'Hono',
			'Laravel',
			'Convex',
			'Prisma',
			'REST APIs',
		],
		data: [
			'PostgreSQL',
			'MySQL',
			'MongoDB',
			'Redis',
			'Firebase',
			'Supabase',
			'Meilisearch',
		],
		ai: [
			'On-device inference',
			'ONNX Runtime',
			'transformers.js',
			'Whisper',
			'Demucs',
			'YOLO / NudeNet',
		],
		infra: ['AWS', 'Docker', 'Vercel', 'Linux', 'Git', 'CI/CD', 'EAS'],
		craft: [
			'UI/UX',
			'Figma',
			'Accessibility',
			'SEO',
			'i18n & RTL',
			'Performance',
		],
	},

	interests: [
		{ en: 'Football', ar: 'كرة القدم', emoji: '⚽' },
		{ en: 'Worship', ar: 'العبادة والروحانيات', emoji: '🤲' },
		{ en: 'Walking', ar: 'المشي في الطبيعة', emoji: '🥾' },
		{ en: 'Learning', ar: 'تعلّم المهارات الجديدة', emoji: '🧠' },
		{ en: 'Swimming', ar: 'السباحة', emoji: '🏊' },
		{ en: 'Reading', ar: 'القراءة والاطلاع', emoji: '📚' },
	],
};
