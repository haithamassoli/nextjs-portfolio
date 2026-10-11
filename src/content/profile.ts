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
		en: 'Full-stack web & mobile engineer',
		ar: 'مطوّر ويب وجوال متكامل (Full-Stack)',
	} satisfies I18n,

	tagline: {
		en: 'I turn ideas into reliable web and mobile apps, from the first plan to launch.',
		ar: 'أحوّل الأفكار إلى تطبيقات ويب وجوال موثوقة، من أول خطة حتى الإطلاق.',
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
			'I build web and mobile apps from start to finish: planning the data, building the server and the interface, publishing to the app stores, and supporting users after launch.',
			'I enjoy the problems that make or break a product: AI that runs privately on the phone, search that answers instantly without a server, and booking systems that never sell the same time slot twice.',
			'My recent work includes multi-vendor online stores, research tools used by thousands of scientists, and products for education and community services.',
		],
		ar: [
			'أبني تطبيقات الويب والجوال من البداية إلى النهاية: تصميم البيانات، وبناء الخادم والواجهة، والنشر على المتاجر، ودعم المستخدمين بعد الإطلاق.',
			'أستمتع بالمشكلات التي تصنع الفرق في المنتج: ذكاء اصطناعي يعمل بخصوصية على الهاتف، وبحث يعطي النتائج فورًا دون خادم، وأنظمة حجز لا تبيع الموعد نفسه مرتين.',
			'من أعمالي الحديثة متاجر إلكترونية متعددة البائعين، وأدوات بحثية يستخدمها آلاف العلماء، ومنتجات للتعليم والخدمات المجتمعية.',
		],
	} satisfies I18nBlocks,

	experience: [
		{
			company: { en: 'GoldenTik', ar: 'GoldenTik' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: 'Since 2026',
			highlights: {
				en: [
					'Building multi-vendor online stores with NestJS, Next.js, and React Native.',
					'Built fast, reliable backend services that handle many vendors working at the same time.',
					'Built responsive storefronts and a mobile app that share one API.',
				],
				ar: [
					'بناء متاجر إلكترونية متعددة البائعين باستخدام NestJS وNext.js وReact Native.',
					'بناء خدمات خادم سريعة وموثوقة تخدم عددًا كبيرًا من البائعين في الوقت نفسه.',
					'بناء واجهات متجر متجاوبة وتطبيق جوال يعتمدان على واجهة API واحدة.',
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
					'Built bioinformatics apps for web and mobile from one shared codebase (React and React Native in a monorepo).',
					'Used TypeScript, Zod, and Prisma to keep data validated and type-safe from end to end.',
					'Managed server data and forms with TanStack Query and TanStack Form, with APIs built on Hono.',
					'Contributed to a no-code platform used by 8,000+ researchers worldwide.',
					'Shipped AI-powered data analysis, scientific literature search, and customisable analysis pipelines.',
					'Built to meet HIPAA, GDPR, and SOC 2 Type 2 requirements.',
				],
				ar: [
					'بناء تطبيقات معلوماتية حيوية للويب والجوال من قاعدة شيفرة واحدة مشتركة (React وReact Native في monorepo).',
					'استخدام TypeScript وZod وPrisma لضمان صحة البيانات وسلامة الأنواع من البداية إلى النهاية.',
					'إدارة بيانات الخادم والنماذج عبر TanStack Query وTanStack Form، وبناء واجهات API على Hono.',
					'المساهمة في منصة لا تتطلب برمجة يستخدمها أكثر من 8,000 باحث حول العالم.',
					'إطلاق تحليل بيانات بالذكاء الاصطناعي التوليدي، وبحث في الأوراق العلمية المنشورة، ومسارات تحليل قابلة للتخصيص.',
					'بناء الميزات وفق متطلبات HIPAA وGDPR وSOC 2 Type 2.',
				],
			},
		},
		{
			company: { en: 'Malabji', ar: 'ملعبجي' },
			role: { en: 'Founder & CEO', ar: 'مؤسس ومدير تنفيذي' },
			period: 'Since 2025',
			highlights: {
				en: [
					'Founded and launched a football pitch booking and player-matching app on iOS and Android.',
					'Led product, design, mobile development, the backend, store releases, and customer support.',
				],
				ar: [
					'تأسيس وإطلاق تطبيق لحجز ملاعب كرة القدم والعثور على لاعبين، على iOS وأندرويد.',
					'قيادة المنتج والتصميم وتطوير التطبيق والخادم والنشر على المتاجر ودعم العملاء.',
				],
			},
		},
		{
			company: { en: 'Freelance', ar: 'عمل حر' },
			role: {
				en: 'Full-stack web & mobile developer',
				ar: 'مطوّر ويب وجوال متكامل',
			},
			period: 'Since 2022',
			highlights: {
				en: [
					'Worked directly with clients to define requirements, chose the technical approach, and delivered on time.',
					'Shipped products for municipalities, tourism, education, charities, and e-commerce in Jordan and Saudi Arabia.',
				],
				ar: [
					'العمل مباشرة مع العملاء لتحديد المتطلبات، واختيار الحل التقني المناسب، والتسليم في الموعد.',
					'إطلاق منتجات للبلديات والسياحة والتعليم والجمعيات الخيرية والتجارة الإلكترونية في الأردن والسعودية.',
				],
			},
		},
		{
			company: { en: 'Repzo', ar: 'Repzo' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: '2022 to 2023',
			highlights: {
				en: [
					'Built and maintained a large operational dashboard in TypeScript and React.',
					'Updated dependencies and code to improve security and speed.',
					'Backend development with Node.js and Express.',
				],
				ar: [
					'بناء وصيانة لوحة تحكم تشغيلية كبيرة باستخدام TypeScript وReact.',
					'تحديث المكتبات والشيفرة لتحسين الأمان والسرعة.',
					'تطوير الخادم باستخدام Node.js وExpress.',
				],
			},
		},
		{
			company: { en: 'Orange Jordan', ar: 'أورنج الأردن' },
			role: {
				en: 'Full-stack developer trainee',
				ar: 'متدرّب تطوير ويب متكامل',
			},
			period: '2021 to 2022',
			location: { en: 'Internship', ar: 'تدريب' },
			highlights: {
				en: [
					'Seven-month hands-on internship in modern web development.',
					'Built 10 dynamic web projects alongside peers and mentors.',
				],
				ar: [
					'تدريب عملي لمدة سبعة أشهر في تطوير الويب الحديث.',
					'بناء 10 مشاريع ويب ديناميكية مع الزملاء والمشرفين.',
				],
			},
		},
		{
			company: { en: 'EECommittee', ar: 'لجنة الهندسة الكهربائية' },
			role: {
				en: 'Full-stack developer (volunteer)',
				ar: 'مطوّر متكامل (تطوّعًا)',
			},
			period: 'Since 2018',
			highlights: {
				en: [
					'Volunteer work building tools for engineering students.',
					"Shipped and still maintain the committee's Android app and website.",
				],
				ar: [
					'عمل تطوعي لبناء أدوات لطلاب الهندسة.',
					'إطلاق تطبيق اللجنة على أندرويد وموقعها، وما زلت أتولّى صيانتهما.',
				],
			},
		},
	] satisfies ExperienceItem[],

	education: [
		{
			school: { en: 'Irbid National University', ar: 'جامعة إربد الأهلية' },
			degree: { en: 'BSc, Computer Science', ar: 'بكالوريوس، علم الحاسوب' },
			period: '2022 to 2024',
			note: { en: 'Grade: Excellent', ar: 'التقدير: امتياز' },
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
				en: 'Not completed · Grade: Very Good',
				ar: 'لم تكتمل · التقدير: جيد جدًا',
			},
		},
	] satisfies EducationItem[],

	certifications: [
		{
			name: { en: 'AWS DevOps', ar: 'AWS DevOps' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Sep 2024',
			description: {
				en: 'Designing, implementing and operating cloud solutions from the ground up.',
				ar: 'تصميم حلول سحابية وتنفيذها وتشغيلها من الصفر.',
			},
		},
		{
			name: { en: 'Data Structures Decode', ar: 'Data Structures Decode' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'Data structures and algorithms, and applying them to real problems.',
				ar: 'هياكل البيانات والخوارزميات وتطبيقها على مشكلات واقعية.',
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
				en: 'Analysing a problem before writing code, and the common techniques for solving it.',
				ar: 'تحليل المشكلة قبل كتابة الشيفرة، والأساليب الشائعة لحلّها.',
			},
		},
		{
			name: { en: 'Node.js From Scratch', ar: 'Node.js من الصفر' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'How Node.js works under the hood.',
				ar: 'كيف يعمل Node.js داخليًا.',
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
				en: '24 hours on how databases work inside: indexing, partitioning, sharding, replication, concurrency, and security.',
				ar: '24 ساعة عن آلية عمل قواعد البيانات من الداخل: الفهرسة والتقسيم والتوزيع والنسخ المتماثل والتزامن والأمان.',
			},
		},
		{
			name: {
				en: 'JavaScript Algorithms and Data Structures Masterclass',
				ar: 'خوارزميات وهياكل بيانات JavaScript',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Feb 2022',
			description: {
				en: '22 hours on Big O, algorithms, and data structures, from the basics up.',
				ar: '22 ساعة في Big O والخوارزميات وهياكل البيانات، من الأساسيات إلى المستوى المتقدم.',
			},
		},
		{
			name: {
				en: 'React Native: The Practical Guide',
				ar: 'React Native: الدليل العملي',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Apr 2022',
			description: {
				en: '58 hours across the React Native ecosystem: core concepts, responsive layout, navigation, maps and camera.',
				ar: '58 ساعة في منظومة React Native: المفاهيم الأساسية والتخطيط المتجاوب والتنقل والخرائط والكاميرا.',
			},
		},
		{
			name: { en: 'Linux Basics', ar: 'أساسيات لينكس' },
			issuer: { en: 'Flex Courses', ar: 'Flex Courses' },
			date: 'Apr 2022',
			description: {
				en: 'Command-line proficiency and system fundamentals.',
				ar: 'إتقان سطر الأوامر وأساسيات النظام.',
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
		{ en: 'Worship', ar: 'العبادة', emoji: '🙏' },
		{ en: 'Walking', ar: 'المشي', emoji: '🥾' },
		{ en: 'Learning', ar: 'التعلّم', emoji: '🧠' },
		{ en: 'Swimming', ar: 'السباحة', emoji: '🏊' },
		{ en: 'Reading', ar: 'القراءة', emoji: '📚' },
	],
};
