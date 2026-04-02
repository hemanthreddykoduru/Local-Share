import Image from "next/image";

interface AuthorBioProps {
    name?: string;
    role?: string;
    bio?: string;
}

export default function AuthorBio({
    name = "Hemanth Reddy",
    role = "Founder & Lead Developer",
    bio = "Hemanth is a passionate software engineer focused on building privacy-first communication tools. He created Local Share to solve the problem of quick, anonymous local networking without the friction of app downloads."
}: AuthorBioProps) {
    return (
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-3">{role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {bio}
                </p>
            </div>
        </div>
    );
}
