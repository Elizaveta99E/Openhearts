import UserProfile from "../../components/UserProfile/UserProfile.tsx";

export function ProfilePage() {
  return (
    <div style={{ padding: 20, border: '2px solid red' }}>
      <h1>Тестовая страница</h1>
      <UserProfile />
    </div>
  );
}