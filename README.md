# Template Code Library

Web aplikasi yang berisi koleksi template HTML dan CSS yang siap pakai dengan fitur copy code.

## Fitur

- Koleksi template HTML dan CSS siap pakai
- Preview template HTML
- Syntax highlighting dengan Prism.js
- Tombol copy untuk menyalin kode dengan mudah
- Tampilan responsif untuk berbagai ukuran layar

## Teknologi yang Digunakan

- React
- Vite
- Prism.js untuk syntax highlighting
- CSS Vanilla

## Cara Menjalankan

1. Clone repository ini
2. Install dependensi:
   ```
   npm install
   ```
3. Jalankan development server:
   ```
   npm run dev
   ```
4. Buka browser dan akses `http://localhost:5173`

## Cara Menambahkan Template Baru

Untuk menambahkan template baru, edit file `src/App.jsx` dan tambahkan objek baru ke array `htmlTemplates` atau `cssTemplates` dengan format:

```js
// Untuk template HTML
{
  title: 'Judul Template',
  type: 'html',
  description: 'Deskripsi singkat tentang template',
  code: `<div class="contoh">
  <!-- Kode HTML disini -->
</div>`,
}

// Untuk template CSS
{
  title: 'Judul Template',
  type: 'css',
  preview: 'url-gambar-preview',
  description: 'Deskripsi singkat tentang template',
  code: `.contoh {
  /* Kode CSS disini */
}`,
}
```

## Build untuk Production

Untuk membuat versi production:

```
npm run build
```

File hasil build akan tersedia di folder `dist/` yang bisa di-deploy ke web hosting.
