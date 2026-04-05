document.addEventListener('alpine:init', () => {
    Alpine.data('catalogApp', () => ({
        // Source data from catalog-data.js
        items: typeof catalogData !== 'undefined' ? catalogData : [],

        selectedCategory: 'Semua Layanan',
        searchQuery: '',

        categories: [
            'Semua Layanan',
            'Website Undangan Digital',
            'Website Company Profile',
            'Website UMKM / Landing Page Jualan',
            'Website Rental / Sewa',
            'Website E-Commerce Sederhana',
            'Jasa Pembuatan CV / Resume',
            'Jasa Design / Landing Page Custom'
        ],

        // Modal States
        isDetailModalOpen: false,
        selectedItem: null,

        isOrderModalOpen: false,
        checkoutItem: null,

        // Form Object
        formData: {},

        get filteredItems() {
            return this.items.filter(item => {
                const matchCategory = this.selectedCategory === 'Semua Layanan' || item.category === this.selectedCategory;

                const query = this.searchQuery.toLowerCase();
                const matchSearch = query === '' ||
                    item.title.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query) ||
                    item.shortDescription.toLowerCase().includes(query) ||
                    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));

                return matchCategory && matchSearch;
            });
        },

        openDetail(item) {
            this.selectedItem = item;
            this.isDetailModalOpen = true;
            document.body.style.overflow = 'hidden';
            // ensure the other modal is closed securely
            this.isOrderModalOpen = false;
        },

        closeDetail() {
            this.isDetailModalOpen = false;
            document.body.style.overflow = 'auto';
            setTimeout(() => this.selectedItem = null, 300);
        },

        openOrder(item) {
            if (item.category === 'Website Undangan Digital' || item.orderType === 'undangan') {
                // Persist selection before redirect
                localStorage.setItem('xlvi_selected_template', JSON.stringify(item));
                window.location.href = `invitation-order.html`;
                return;
            }
            this.checkoutItem = item;
            this.isOrderModalOpen = true;
            this.formData = {}; // reset form fields
            document.body.style.overflow = 'hidden';
        },

        closeOrder() {
            this.isOrderModalOpen = false;
            document.body.style.overflow = 'auto';
            setTimeout(() => this.checkoutItem = null, 300);
        },

        getWaLink(item) {
            // General WA link without specific form data
            const phone = typeof this.contactNumber !== 'undefined' ? this.contactNumber : "6282119502976";
            const message = `Halo kak, saya tertarik dengan layanan ${item.category} (contoh ${item.title}) di XLVI.ID. Boleh info detailnya?`;
            return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        },

        submitOrder() {
            if (!this.checkoutItem) return;

            const ci = this.checkoutItem;
            // Get phone from global siteData or fallback
            let phone = "6282119502976";
            // In Alpine JS nested properties can be accessed by $store or direct context if scoped properly,
            // we will search window or this safely
            if (typeof document.querySelector('[x-data="siteData"]') !== 'undefined') {
                phone = "6282119502976"; // We hardcode here to be safe since global contexts can be tricky
            }

            let msg = `Halo XLVI.ID, saya ingin memesan layanan ${ci.category}.\n\n`;
            msg += `*Data Layanan:*\n`;
            msg += `▪ Jasa: ${ci.category}\n`;
            msg += `▪ Referensi Tampilan: ${ci.title}\n`;

            msg += `\n*Detail Kebutuhan Customer:*\n`;

            // Loop form data
            for (const [key, val] of Object.entries(this.formData)) {
                if (val && val.trim() !== "") {
                    // Turn camelCase into Space separated labels roughly
                    let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
                    msg += `▪ ${label}: ${val}\n`;
                }
            }

            msg += `\nMohon info dan proses selanjutnya. Terima kasih.`;

            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            window.open(url, "_blank");
            this.closeOrder();
        }
    }));
});
