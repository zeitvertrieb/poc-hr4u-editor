'use client';

export default function ProfileSidebar({ user }) {
  if (!user) {
    return null;
  }
  return (
    <div className="p-6 border-b border-border text-primary">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">
          {user.first_name} <br /> {user.last_name}
        </h2>
      </div>

      <p className="font-semibold ">{user.role.toUpperCase()}</p>
    </div>
  );
}