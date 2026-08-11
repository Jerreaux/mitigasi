"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PegawaiPage() {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!token || !userStr) {
            router.push("/login");
            return;
        }

        try {
            const user = JSON.parse(userStr);
            if (user.role !== "pegawai" && user.role !== "admin") {
                alert("Akses Ditolak! Halaman ini khusus untuk Pegawai/Admin.");
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
        <div className="flex h-screen flex-col items-center justify-center bg-slate-800 text-white gap-2">
            <h1 className="text-3xl font-bold">ini halaman pegawai</h1>
            <p className="text-sm text-slate-400">Selamat datang, Pegawai! Anda berhasil terverifikasi oleh JWT Auth.</p>
        </div>
    );
}
