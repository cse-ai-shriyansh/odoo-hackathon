import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  // ProfileCard already handles editing and updating
  return (
    <div className="max-w-2xl mx-auto py-10">
      <ProfileCard user={JSON.parse(localStorage.getItem("user")) || {}} />
    </div>
  );
}
