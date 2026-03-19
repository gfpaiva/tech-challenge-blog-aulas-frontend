import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { appRoutes } from "@/common/config/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: appRoutes.adminDashboard.title,
  description: appRoutes.adminDashboard.description,
};

export default function AdminDashboard() {
  return (
    <ProtectedRoute role="PROFESSOR">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-primary">Painel do Professor</h1>
        <p className="mt-4">Área administrativa protegida.</p>
      </div>
    </ProtectedRoute>
  );
}