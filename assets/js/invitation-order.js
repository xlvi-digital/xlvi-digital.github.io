document.addEventListener('alpine:init', () => {
    Alpine.data('invitationOrder', () => ({
        step: 1,
        catalogItems: [],
        searchQuery: '',
        toasts: [],

        orderData: {
            selectedTemplate: null,
            selectedPackageId: null,
            packageType: 'Digital',
            packageName: 'Elegant',
            hybridQuantity: 0,
            totalPrice: 0
        },

        // Flat package list for the grid
        allPackages: [
            {
                id: 'd-elegant',
                category: 'Digital',
                name: 'Elegant',
                price: 80000,
                desc: 'Undangan digital elegan dengan semua fitur esensial, tanpa galeri foto.',
                features: ['Website Undangan Online', 'Musik Latar Premium', 'RSVP & Buku Tamu', 'Hitung Mundur Acara', 'Proses 1–2 Hari Kerja']
            },
            {
                id: 'd-exclusive',
                category: 'Digital',
                name: 'Exclusive',
                price: 100000,
                desc: 'Full fitur lengkap dengan galeri foto unlimited dan background video.',
                features: ['Semua Fitur Elegant', 'Galeri Foto Unlimited', 'Video Background', 'Custom Font Premium', 'Amplop Digital QR Code']
            },
            {
                id: 'h-e-25',
                category: 'Hybrid',
                name: 'Elegant',
                qty: 25,
                price: 170000,
                desc: 'Undangan digital Elegant + 25 undangan cetak fisik berkualitas premium.',
                features: ['Semua Fitur Digital Elegant', '25 Pcs Undangan Cetak', 'Kertas Premium 260gsm', 'Free Plastik & Label', 'Pengiriman Termasuk']
            },
            {
                id: 'h-e-50',
                category: 'Hybrid',
                name: 'Elegant',
                qty: 50,
                price: 255000,
                desc: 'Undangan digital Elegant + 50 undangan cetak fisik berkualitas premium.',
                features: ['Semua Fitur Digital Elegant', '50 Pcs Undangan Cetak', 'Kertas Premium 260gsm', 'Free Plastik & Label', 'Pengiriman Termasuk']
            },
            {
                id: 'h-e-100',
                category: 'Hybrid',
                name: 'Elegant',
                qty: 100,
                price: 430000,
                desc: 'Undangan digital Elegant + 100 undangan cetak fisik, terbaik untuk tamu besar.',
                features: ['Semua Fitur Digital Elegant', '100 Pcs Undangan Cetak', 'Kertas Premium 260gsm', 'Free Plastik & Label', 'Pengiriman Termasuk']
            },
            {
                id: 'h-x-25',
                category: 'Hybrid',
                name: 'Exclusive',
                qty: 25,
                price: 190000,
                desc: 'Undangan digital Exclusive + 25 undangan cetak fisik eksklusif.',
                features: ['Semua Fitur Digital Exclusive', '25 Pcs Undangan Cetak', 'Kertas Premium 260gsm', 'Free Plastik & Label', 'Pengiriman Termasuk']
            },
            {
                id: 'h-x-50',
                category: 'Hybrid',
                name: 'Exclusive',
                qty: 50,
                price: 275000,
                desc: 'Undangan digital Exclusive + 50 undangan cetak fisik eksklusif.',
                features: ['Semua Fitur Digital Exclusive', '50 Pcs Undangan Cetak', 'Kertas Premium 260gsm', 'Free Plastik & Label', 'Pengiriman Termasuk']
            },
            {
                id: 'h-x-100',
                category: 'Hybrid',
                name: 'Exclusive',
                qty: 100,
                price: 450000,
                desc: 'Undangan digital Exclusive + 100 undangan cetak fisik, nilai terbaik untuk tamu besar.',
                features: ['Semua Fitur Digital Exclusive', '100 Pcs Undangan Cetak', 'Kertas Premium 260gsm', 'Free Plastik & Label', 'Pengiriman Termasuk']
            },
        ],

        init() {
            // 1. Load templates from catalogData
            if (typeof catalogData !== 'undefined') {
                this.catalogItems = catalogData.filter(item => item.orderType === 'undangan');
            }

            // 2. Check for template in URL or LocalStorage
            const urlParams = new URLSearchParams(window.location.search);
            const templateSlug = urlParams.get('template');
            const savedTemplate = localStorage.getItem('xlvi_selected_template');

            let currentTemplate = null;

            if (templateSlug) {
                currentTemplate = this.catalogItems.find(item => item.slug === templateSlug);
            } else if (savedTemplate) {
                try {
                    currentTemplate = JSON.parse(savedTemplate);
                } catch (e) {
                    localStorage.removeItem('xlvi_selected_template');
                }
            }

            if (currentTemplate) {
                this.selectTemplate(currentTemplate, false, false);
            }

            // 3. Load previous package selection
            const savedOrder = localStorage.getItem('xlvi_order_temp');
            if (savedOrder) {
                try {
                    const parsed = JSON.parse(savedOrder);
                    const pkg = this.allPackages.find(p => p.id === parsed.selectedPackageId);
                    if (pkg) {
                        this.selectPackage(pkg, false);
                    }
                } catch (e) {
                    localStorage.removeItem('xlvi_order_temp');
                }
            }
        },

        // ── Toast System ──────────────────────────────────────────
        addToast(message, icon = '✦') {
            const id = Date.now() + Math.random();
            this.toasts.push({ id, message, icon });
            setTimeout(() => {
                this.removeToast(id);
            }, 3000);
        },

        removeToast(id) {
            this.toasts = this.toasts.filter(t => t.id !== id);
        },

        // ── Template Getters ──────────────────────────────────────
        get filteredTemplates() {
            if (!this.searchQuery) return this.catalogItems;
            const q = this.searchQuery.toLowerCase();
            return this.catalogItems.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q) ||
                (item.tags || []).some(tag => tag.toLowerCase().includes(q))
            );
        },

        // ── Actions ───────────────────────────────────────────────
        selectTemplate(template, shouldScroll = true, showToast = true) {
            this.orderData.selectedTemplate = template;
            localStorage.setItem('xlvi_selected_template', JSON.stringify(template));
            this.step = 2;
            if (showToast) this.addToast(`Template "${template.title}" berhasil dipilih`, '🎨');
            if (shouldScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        selectPackage(pkg, showToast = true) {
            this.orderData.selectedPackageId = pkg.id;
            this.orderData.packageType = pkg.category;
            this.orderData.packageName = pkg.name;
            this.orderData.hybridQuantity = pkg.qty || 0;
            this.orderData.totalPrice = pkg.price;
            this.saveOrderTemp();
            if (showToast) {
                const label = `${pkg.name} ${pkg.category}${pkg.qty ? ' ' + pkg.qty + ' pcs' : ''}`;
                this.addToast(`Paket "${label}" berhasil dipilih`, '📦');
            }
        },

        changeTemplate() {
            this.orderData.selectedTemplate = null;
            localStorage.removeItem('xlvi_selected_template');
            window.location.href = 'catalog.html';
        },

        saveOrderTemp() {
            localStorage.setItem('xlvi_order_temp', JSON.stringify({
                selectedPackageId: this.orderData.selectedPackageId
            }));
        },

        formatIDR(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        },

        goToConfirmation() {
            if (!this.orderData.selectedTemplate) {
                this.addToast('Silakan pilih template terlebih dahulu.', '⚠️');
                this.step = 1;
                return;
            }
            if (!this.orderData.selectedPackageId) {
                this.addToast('Silakan pilih salah satu paket di atas.', '⚠️');
                return;
            }
            this.step = 3;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        sendToWhatsApp() {
            const d = this.orderData;
            let msg = `Halo XLVI.ID, saya ingin memesan layanan Undangan Digital.\n\n`;
            msg += `=== DETAIL PESANAN ===\n`;
            msg += `Template : ${d.selectedTemplate?.title}\n`;
            msg += `Paket    : ${d.packageName} (${d.packageType})\n`;
            if (d.packageType === 'Hybrid') {
                msg += `Fisik    : ${d.hybridQuantity} pcs\n`;
            }
            msg += `Total Est: ${this.formatIDR(d.totalPrice)}\n\n`;
            msg += `Catatan: Saya sudah memilih template dan paket. Mohon info selanjutnya untuk pengisian data mempelai.`;

            const phone = '6282119502976';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        }
    }));
});
