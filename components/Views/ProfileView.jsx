'use client'

function Label({ children }) {
    return (
        <span className="text-xs font-bold uppercase text-primary">
            {children}
        </span>
    );
}

export default function ProfileView({ data }) {
    if (!data) return null;

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col mb-4 gap-4">
                <h2 className="text-3xl font-bold text-primary font-zilla-slab">Profil</h2>
            </div>

            <div className="mt-8 p-6 bg-surface-rise border border-border space-y-6">
                <div>
                    <Label>Name</Label>
                    <p className="mt-1">{data.first_name} {data.last_name}</p>
                </div>
                <div>
                    <Label>Rolle</Label>
                    <p className="mt-1">{data.role}</p>
                </div>
                <div>
                    <Label>Geburtsjahr</Label>
                    <p className="mt-1">{data.birthyear}</p>
                </div>
                 <div>
                    <Label>Staatsangehörigkeit</Label>
                    <p className="mt-1">{data.nationality}</p>
                </div>
                <div>
                    <Label>Sprachen</Label>
                    <div className="mt-1 space-y-1">
                        {Array.isArray(data.languages) ? (
                            data.languages.map((lang, index) => (
                                <p key={index}>{lang.language} ({lang.proficiency})</p>
                            ))
                        ) : <p className="mt-1 whitespace-pre-wrap">{data.languages}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}