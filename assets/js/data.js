document.addEventListener('alpine:init', () => {
    Alpine.data('siteData', () => ({
        // Data Utama
        contactNumber: '6282119502976',

        // Navigation Links
        navLinks: [
            { name: 'Home', url: 'index.html' },
            { name: 'Catalog', url: 'catalog.html' },
            { name: 'Services', url: 'services.html' },
            { name: 'Pricing', url: 'pricing.html' },
            { name: 'Contact', url: 'contact.html' }
        ],

        // Fitur / Keunggulan
        features: [
            { icon: '✨', title: 'Desain Premium & Elegan', desc: 'Tampilan modern dan berkelas yang mencerminkan profesionalitas Anda.' },
            { icon: '⚡', title: 'Proses Cepat & Mudah', desc: 'Proyek selesai tepat waktu dengan prosedur pemesanan yang tidak ribet.' },
            { icon: '💎', title: 'Harga Terjangkau', desc: 'Kualitas agensi besar dengan harga yang ramah di kantong.' },
            { icon: '🤝', title: 'Cocok untuk Personal & Bisnis', desc: 'Layanan fleksibel baik untuk kebutuhan individu maupun korporasi.' }
        ],

        // Data Layanan Utama (Services)
        services: [
            {
                id: 'wedding-invitation',
                image: 'images/servies.png',
                title: 'Digital Wedding Invitation',
                desc: 'Undangan pernikahan elegan dan modern dengan berbagai fitur pro. Bagikan momen bahagiamu secara interaktif tanpa batasan tamu.',
                features: ['Custom tema profesional', 'RSVP terintegrasi Form / WA', 'Background Musik Premium', 'Tanpa batas waktu (Aktif selamanya)'],
                link: 'catalog.html',
                btnText: 'Lihat Katalog',
                waText: 'Halo XLVI.ID, saya ingin memesan Undangan Digital.'
            },
            {
                id: 'cv-modern',
                image: 'images/servies2.png',
                title: 'CV Modern & ATS Friendly',
                desc: 'Bosan tidak dipanggil lamaran kerja? Kami rancang Curriculum Vitae Anda untuk lolos seleksi mesin ATS, dioptimasi dengan format korporat terbaru.',
                features: ['Desain ATS Friendly', 'Highlight skill strategis', 'Bahasa Indonesia / Inggris', 'Gratis revisi sampai cocok'],
                link: 'catalog.html',
                btnText: 'Lihat Template',
                waText: 'Halo XLVI.ID, saya tertarik dengan layanan Pembuatan CV.'
            },
            {
                id: 'company-profile',
                image: 'images/servies3.png',
                title: 'Company Profile Website',
                desc: 'Bawa bisnis Anda naik kelas. Bangun citra kredibel yang membuat investor dan klien besar melirik Anda sejak klik pertama.',
                features: ['UI/UX Premium', 'Mobile Responsive 100%', 'SEO Friendly Setups', 'Integrasi ke Social Media & Maps'],
                link: 'catalog.html',
                btnText: 'Lihat Demo',
                waText: 'Halo XLVI.ID, saya ingin berkonsultasi untuk pembuatan Company Profile.'
            },
            {
                id: 'custom-website',
                image: 'images/home.png',
                title: 'Custom Website / Landing Page',
                desc: 'Dari sistem informasi hingga landing page kampanye spesifik. Sistem dirancang khusus secara custom tanpa batas dari awal hingga peluncuran.',
                features: ['High-Converting Layout', 'Performa Website Cepat', 'Struktur Kustom Unik', 'Integrasi Fitur Khusus'],
                link: null,
                btnText: 'Diskusikan Proyek Bebas',
                waText: 'Halo XLVI.ID, saya butuh kustom website untuk bisnis.'
            }
        ],

        // Data Catalog Undangan Digital
        searchQuery: '',
        activeFilter: 'all',
        templates: [
            {
                id: 1,
                name: 'Botanical Green',
                category: 'Botanical',
                type: 'Dengan Foto',
                image: 'images/portfolio/tema-botanical-green.png',
                desc: 'Nuansa natural dan segar untuk momen spesial Anda.',
                price: 'Mulai Rp 50.000',
                previewUrl: '#'
            },
            {
                id: 2,
                name: 'Modern ATS Professional',
                category: 'CV',
                type: 'Template',
                image: 'images/portfolio/2.png',
                desc: 'CV berkelas yang didesain agar mudah tersortir sistem ATS.',
                price: 'Mulai Rp 75.000',
                previewUrl: '#'
            },
            {
                id: 3,
                name: 'Luxury Gold',
                category: 'Luxury',
                type: 'Dengan Foto',
                image: 'images/portfolio/3.png',
                desc: 'Elegan dan eksklusif dengan sentuhan warna emas mewah.',
                price: 'Mulai Rp 50.000',
                previewUrl: '#'
            },
            {
                id: 4,
                name: 'Romantic Pink',
                category: 'Romantic',
                type: 'Tanpa Foto',
                image: 'images/portfolio/1.png', // placeholder
                desc: 'Sederhana dan manis dengan warna pink pastel.',
                price: 'Mulai Rp 50.000',
                previewUrl: '#'
            }
        ],

        // Compute filtered templates
        get filteredTemplates() {
            return this.templates.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    item.desc.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesFilter = this.activeFilter === 'all' || item.category.toLowerCase() === this.activeFilter.toLowerCase();
                return matchesSearch && matchesFilter;
            });
        },

        // Category options for filter
        get categories() {
            const cats = ['all'];
            this.templates.forEach(t => {
                if (!cats.includes(t.category.toLowerCase())) {
                    cats.push(t.category.toLowerCase());
                }
            });
            return cats;
        },

        // Data Pricing Bundles
        packages: [
            {
                name: 'Basic Package',
                price: 'RP 499rb',
                period: ' / Proyek',
                desc: 'Solusi hemat untuk kebutuhan cepat.',
                popular: false,
                includes: ['Menggunakan template siap pakai', 'Data & Isi bisa disesuaikan', 'Proses pengerjaan kilat', 'Harga lebih hemat di kantong'],
                waText: 'Halo XLVI.ID, saya tertarik dengan Basic Package.'
            },
            {
                name: 'Premium Package',
                price: 'RP 1.4jt',
                period: ' / Proyek',
                desc: 'Hasil eksklusif untuk kesan mendalam.',
                popular: true,
                includes: ['Full custom design (Bukan Template)', 'Layout sesuai request khusus', 'Fitur lebih fleksibel & kompleks', 'Prioritas pengerjaan & prioritas support'],
                waText: 'Halo XLVI.ID, saya tertarik dengan Premium Package.'
            }
        ],

        // Data FAQ
        faqs: [
            { q: 'Apakah bisa request custom?', a: 'Tentu bisa. Untuk Basic Package, request dibatasi pada warna dan penggantian text. Sedangkan untuk Premium Package, Anda bebas mengatur elemen apa pun secara utuh.' },
            { q: 'Berapa lama pengerjaan?', a: 'Pengerjaan Basic mulai dari 1-3 hari. Premium memakan waktu reguler sekitar 5-14 hari tergantung tingkat kesulitan dan kelengkapan materi Anda.' },
            { q: 'Apakah bisa direvisi?', a: 'Bisa! Kami menyediakan slot revisi yang optimal agar hasil akhir memuaskan. Basic 1x Revisi minor dan Premium hingga 3x Revisi desain keseluruhan.' }
        ],

        // Testimonials
        testimonials: [
            { quote: '"Desain undangannya mewah banget! Teman-teman pada nanya bikin di mana. Prosesnya juga cepet banget sumpah."', rating: 5, user: 'Rina Maharani', role: 'Wedding Celebration' },
            { quote: '"Website company profile untuk butik saya jadi makin berkelas. Sekarang client lebih percaya buat kerja sama sama saya."', rating: 5, user: 'Budi Santoso', role: 'Owner Batik Boutique' },
            { quote: '"Awalnya ragu buat CV, tapi setelah dibikin sama XLVI.ID, panggilannya jadi lebih banyak. Makasih banget tim!"', rating: 5, user: 'Siska Amelia', role: 'Fresh Graduate' }
        ],

        // Helpers untuk URL WA
        waLink(message) {
            return `https://wa.me/${this.contactNumber}?text=${encodeURIComponent(message)}`;
        },

        waTemplateLink(templateName) {
            return this.waLink(`Halo kak, saya tertarik dengan template undangan ${templateName} di XLVI.ID, boleh info detailnya?`);
        }
    }));
});
