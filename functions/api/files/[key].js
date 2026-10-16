// Cloudflare Pages Function: /api/files/:key
// Mengambil dan menampilkan file dari Cloudflare R2 Storage (PDF, Gambar, Audio)

export async function onRequestGet(context) {
    const { params, env } = context;
    const key = params.key;

    if (!env.BUCKET) {
        return new Response('R2 BUCKET belum terhubung ke environment Pages.', { status: 500 });
    }

    if (!key) {
        return new Response('File key tidak ditemukan.', { status: 400 });
    }

    try {
        const object = await env.BUCKET.get(key);

        if (!object) {
            return new Response('Berkas tidak ditemukan di R2 Storage.', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=86400'); // Cache 24 jam di browser/Cloudflare CDN

        return new Response(object.body, {
            headers
        });
    } catch (err) {
        return new Response('Gagal memuat berkas: ' + err.message, { status: 500 });
    }
}
