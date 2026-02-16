export default function Skills() {
    const categories = [
        {
            tag: 'Core: Languages',
            tagColor: 'text-blue-600',
            title: 'Languages & Runtime',
            skills: [
                { name: 'JavaScript', level: 'Intermediate' },
                { name: 'TypeScript', level: 'Basic' },
                { name: 'Node.js', level: 'Basic' },
                { name: 'Python', level: 'Basic' },
            ],
        },
        {
            tag: 'Core: Frameworks',
            tagColor: 'text-blue-600',
            title: 'Frameworks & Libraries',
            skills: [
                { name: 'React', level: 'Basic' },
                { name: 'Express.js', level: 'Basic' },
                // { name: 'Next.js', level: 'Not started' },
                { name: 'Tailwind CSS', level: 'Intermediate' },
            ],
        },
        {
            tag: 'Core: Database',
            tagColor: 'text-gray-500',
            title: 'Database & Storage',
            skills: [
                { name: 'MongoDB', level: 'Intermediate' },
                // { name: 'PostgreSQL', level: 'not started' },
                // { name: 'Redis', level: 'not started' },
                // { name: 'Firebase', level: 'not started' },
            ],
        },
        {
            tag: 'Core: DevOps',
            tagColor: 'text-gray-500',
            title: 'DevOps & Tools',
            skills: [
                { name: 'Git & GitHub', level: 'Advanced' },
                { name: 'Docker', level: 'not started' },
                { name: 'CI/CD', level: 'not started' },
                // { name: 'Linux / CLI', level: 'not started' },
            ],
        },
    ]

    const levelColor: Record<string, string> = {
        Advanced: 'text-green-600 bg-green-50 border-green-200',
        Intermediate: 'text-blue-600 bg-blue-50 border-blue-200',
    }

    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#f4f6fb] -mt-38">
            <div className="max-w-6xl mx-auto text-center">
                {/* Top badge */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase">
                        Stack :: Overview
                    </span>
                    <span className="w-12 h-px bg-gray-300" />
                    <span className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-400">
                        Technical Proficiency
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 uppercase leading-tight tracking-tight">
                    Technical Skills.
                    <br />
                    <span className="text-blue-600 italic">Battle Tested.</span>
                </h2>

                {/* Description */}
                <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                    Every tool in the stack is chosen for production reliability. From database design to
                    deployment pipelines — built to scale, secured by default.
                </p>

                {/* Stats row */}
                <div className="mt-12 flex flex-wrap justify-center divide-x divide-gray-200">
                    {[
                        { value: '5', label: 'Technologies' },
                        { value: 'Backend', label: 'Coverage' },
                        { value: 'Production', label: 'Grade' },
                    ].map((stat) => (
                        <div key={stat.label} className="px-6 sm:px-10 py-2 text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-400 uppercase mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Skill category cards */}
                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {categories.map((cat, idx) => (
                        <div
                            key={cat.title}
                            className="bg-white border border-gray-200 rounded-xl p-6 text-left flex flex-col justify-between min-h-75 hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span
                                        className={`font-mono text-[10px] tracking-wider uppercase ${cat.tagColor}`}
                                    >
                                        {cat.tag}
                                    </span>
                                    <span className="font-mono text-xs text-gray-300">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-4">
                                    {cat.title}
                                </h3>

                                {/* Skill items */}
                                <div className="space-y-2.5">
                                    {cat.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg"
                                        >
                                            <span className="font-mono text-sm text-gray-700">{skill.name}</span>
                                            <span
                                                className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border ${levelColor[skill.level]}`}
                                            >
                                                {skill.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="mt-16 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                {/* Bottom tagline */}
                <p className="mt-8 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-blue-600 uppercase">
                    Focused on backend systems.
                </p>
            </div>
        </section>
    )
}
