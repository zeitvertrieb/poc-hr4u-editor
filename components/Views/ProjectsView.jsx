'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function NavLink({ href, children }) {
    return (
        <Link href={href} className="text-sm font-medium text-interactive hover:text-interactive-hover">
            {children}
        </Link>
    );
}

function Label({ children }) {
    return (
        <span className="text-xs font-bold uppercase text-primary">
            {children}
        </span>
    );
}

export default function ProjectsView({ data }) {
    return (
        <div className="w-full max-w-6xl mx-auto px-2">
            <div className="flex flex-col mb-4 gap-4">
                <h2 className="text-3xl font-bold text-primary font-zilla-slab">Projekterfahrung</h2>
                <div className="flex items-center gap-4">
                    <NavLink href="/content?section=industry_experience">
                        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Branchenerfahrung
                    </NavLink>
                    <NavLink href="/content?section=skills">
                        Skills<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
                    </NavLink>
                </div>
            </div>

            <div className="space-y-6 mt-8">
                {data.map((entry, index) => (
                    <div
                        key={index}
                        className="p-4 bg-surface-rise border border-border"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                            <div className="md:col-span-1">
                                <Label>Zeitraum</Label>
                                <p className="mt-1 w-max">{entry.start} - {entry.end}</p>
                            </div>

                            <div className="md:col-span-1">
                                <Label>Firma</Label>
                                <p className="mt-1">{entry.firm}</p>
                            </div>

                            <div className="md:col-span-3 space-y-4">
                                <div>
                                    <Label>Allgemeine Projektbeschreibung</Label>
                                    <p className="mt-1 text-lg font-semibold text-primary">Project Name: {entry.name}</p>
                                    <p className="mt-1">{entry.role}</p>
                                </div>

                                <p>{entry.description}</p>
                                <p>Teamgröße: {entry.team_size}</p>

                                <div>
                                    <p className="font-semibold">Meine Aufgaben umfassen dabei:</p>
                                    <div className="mt-1 space-y-1">
                                        {entry.tasks.map((task, i) => <p key={i}>{task}</p>)}
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold">Verwendete Technologien</p>
                                    <div className="mt-1 space-y-1">
                                        {entry.technologies.map((tech, i) => <p key={i}>{tech}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}