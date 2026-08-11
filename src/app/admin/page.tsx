"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        // Jika tidak ada token atau bukan role admin ➔ Lempar ke /login
        if (!token || !userStr) {
            router.push("/login");
            return;
        }

        try {
            const user = JSON.parse(userStr);
            if (user.role !== "admin") {
                alert("Akses Ditolak! Halaman ini khusus untuk Admin.");
                router.push("/dashboard");
            } else {
                setAuthorized(true);
            }
        } catch {
            router.push("/login");
        }
    }, [router]);

    if (!authorized) return null;

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white gap-2">
            <h1 className="text-3xl font-bold">ini halaman admin</h1>
            <p className="text-sm text-slate-400">Selamat datang, Admin! Anda berhasil terverifikasi oleh JWT Auth.</p>
        </div>
    );
}
