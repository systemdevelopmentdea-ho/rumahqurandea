// ============================================================
// Cloudflare Full-Stack Worker: Rumah Qur'an Dea Bakery
// Menangani:
// 1. Database D1 (/api/pendaftaran)
// 2. R2 Object Storage (/api/files/:key)
// 3. Static Assets Web (HTML, CSS, JS, Media) via env.ASSETS
// ============================================================

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // ----------------------------------------------------
        // 1. API: Pendaftaran Santri Baru Online (Cloudflare D1)
        // ----------------------------------------------------
        if (url.pathname === "/api/pendaftaran") {
            // Handle CORS Preflight
            if (request.method === "OPTIONS") {
                return new Response(null, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type",
                    }
                });
            }

            if (request.method === "POST") {
                try {
                    if (!env.DB) {
                        return new Response(JSON.stringify({ 
                            success: false, 
                            error: "Database D1 (DB) belum terhubung ke worker runtime." 
                        }), {
                            status: 500,
                            headers: { 
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            }
                        });
                    }

                    const data = await request.json();
                    const {
                        nama_lengkap,
                        jenis_kelamin,
                        usia,
                        nama_wali,
                        no_wa,
                        program,
                        alamat,
                        catatan
                    } = data;

                    if (!nama_lengkap || !nama_wali || !no_wa || !program) {
                        return new Response(JSON.stringify({
                            success: false,
                            error: "Nama lengkap, nama wali, no WA, dan program wajib diisi."
                        }), {
                            status: 400,
                            headers: { 
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*" 
                            }
                        });
                    }

                    const result = await env.DB.prepare(
                        `INSERT INTO pendaftaran_santri 
                         (nama_lengkap, jenis_kelamin, usia, nama_wali, no_wa, program, alamat, catatan) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
                    ).bind(
                        nama_lengkap,
                        jenis_kelamin || 'Laki-laki',
                        usia ? parseInt(usia, 10) : null,
                        nama_wali,
                        no_wa,
                        program,
                        alamat || '',
                        catatan || ''
                    ).run();

                    return new Response(JSON.stringify({
                        success: true,
                        message: "Alhamdulillah, data pendaftaran santri berhasil tersimpan.",
                        id: result.meta?.last_row_id
                    }), {
                        status: 200,
                        headers: { 
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*" 
                        }
                    });

                } catch (err) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: err.message || "Terjadi kesalahan sistem."
                    }), {
                        status: 500,
                        headers: { 
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*" 
                        }
                    });
                }
            }

            if (request.method === "GET") {
                try {
                    if (!env.DB) {
                        return new Response(JSON.stringify({
                            status: "ready",
                            database: "not_bound",
                            message: "API aktif. Binding D1 belum terhubung."
                        }), {
                            headers: { 
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*" 
                            }
                        });
                    }

                    const stats = await env.DB.prepare(
                        `SELECT COUNT(*) as total FROM pendaftaran_santri`
                    ).first();

                    return new Response(JSON.stringify({
                        status: "online",
                        database: "connected",
                        total_santri_terdaftar: stats?.total || 0
                    }), {
                        headers: { 
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*" 
                        }
                    });

                } catch (err) {
                    return new Response(JSON.stringify({
                        status: "error",
                        error: err.message
                    }), {
                        status: 500,
                        headers: { 
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*" 
                        }
                    });
                }
            }
        }

        // ----------------------------------------------------
        // 2. API: Mengambil File dari R2 Storage (/api/files/:key)
        // ----------------------------------------------------
        if (url.pathname.startsWith("/api/files/")) {
            const key = decodeURIComponent(url.pathname.replace("/api/files/", ""));
            if (key && env.BUCKET) {
                try {
                    const object = await env.BUCKET.get(key);
                    if (object) {
                        const headers = new Headers();
                        object.writeHttpMetadata(headers);
                        headers.set("etag", object.httpEtag);
                        headers.set("Cache-Control", "public, max-age=86400");
                        return new Response(object.body, { headers });
                    }
                    return new Response("Berkas tidak ditemukan di R2 Storage.", { status: 404 });
                } catch (err) {
                    return new Response("Gagal memuat berkas: " + err.message, { status: 500 });
                }
            }
        }

        // ----------------------------------------------------
        // 3. Fallback: Sajikan semua file statis website via env.ASSETS
        // ----------------------------------------------------
        return env.ASSETS.fetch(request);
    }
};
