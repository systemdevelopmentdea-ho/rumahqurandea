// Cloudflare Pages Function: /api/pendaftaran
// Menghubungkan formulir pendaftaran website langsung ke Cloudflare D1 Database

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // Cek binding D1 Database
        if (!env.DB) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Database D1 belum terhubung ke environment Pages.' 
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
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

        // Validasi input dasar
        if (!nama_lengkap || !nama_wali || !no_wa || !program) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Nama lengkap, nama wali, no WhatsApp, dan program wajib diisi.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert ke tabel pendaftaran_santri di Cloudflare D1
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
            message: 'Alhamdulillah, pendaftaran santri berhasil tersimpan ke sistem.',
            id: result.meta?.last_row_id
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: err.message || 'Terjadi kesalahan sistem saat menyimpan data.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestGet(context) {
    const { env } = context;

    try {
        if (!env.DB) {
            return new Response(JSON.stringify({
                status: 'ready',
                database: 'not_bound',
                message: 'API pendaftaran aktif. Bind D1 "DB" di Cloudflare Pages.'
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const stats = await env.DB.prepare(
            `SELECT COUNT(*) as total_santri FROM pendaftaran_santri`
        ).first();

        return new Response(JSON.stringify({
            status: 'online',
            database: 'connected',
            total_santri_terdaftar: stats?.total_santri || 0
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({
            status: 'error',
            error: err.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
