import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-primary">Painel do Professor</h1>
        <p className="mt-4">Área administrativa protegida.</p>
      </div>
    </ProtectedRoute>
  );
}