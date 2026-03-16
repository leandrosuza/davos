/**
 * Davos.io Internationalization (i18n) System
 * Suporte para múltiplos idiomas: EN, PT, TR
 */

const I18n = {
    currentLang: 'en',
    translations: {},
    availableLangs: ['en', 'pt', 'tr'],
    
    /**
     * Inicializa o sistema i18n
     */
    init() {
        const savedLang = localStorage.getItem('davos-language');
        const browserLang = navigator.language.split('-')[0];
        
        if (savedLang && this.availableLangs.includes(savedLang)) {
            this.currentLang = savedLang;
        } else if (this.availableLangs.includes(browserLang)) {
            this.currentLang = browserLang;
        }
        
        this.loadTranslations(this.currentLang);
    },
    
    /**
     * Carrega as traduções para um idioma
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`assets/lang/${lang}.json`);
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('davos-language', lang);
            this.updatePage();
        } catch (error) {
            console.error('Erro ao carregar traduções:', error);
            if (lang !== 'en') {
                this.loadTranslations('en');
            }
        }
    },
    
    /**
     * Traduz uma chave
     */
    t(key, replacements = {}) {
        let text = this.translations[key] || key;
        
        Object.keys(replacements).forEach(k => {
            text = text.replace(`{${k}}`, replacements[k]);
        });
        
        return text;
    },
    
    /**
     * Atualiza todos os elementos com data-i18n na página
     */
    updatePage() {
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            } else {
                element.textContent = translation;
            }
        });
        
        // Atualizar placeholders com data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            element.setAttribute('placeholder', translation);
        });
        
        // Atualizar option elements dentro de selects
        document.querySelectorAll('option[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Atualizar select de idioma no modal de settings
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.value = this.currentLang;
        }
        
        document.documentElement.lang = this.currentLang;
    },
    
    /**
     * Muda o idioma atual
     */
    setLanguage(lang) {
        if (this.availableLangs.includes(lang)) {
            this.loadTranslations(lang);
        }
    },
    
    /**
     * Retorna o idioma atual
     */
    getCurrentLang() {
        return this.currentLang;
    },
    
    /**
     * Retorna lista de idiomas disponíveis
     */
    getAvailableLangs() {
        return this.availableLangs;
    },
    
    /**
     * Retorna nome do idioma para exibição
     */
    getLangDisplayName(lang) {
        const names = {
            'en': 'English',
            'pt': 'Português',
            'tr': 'Türkçe'
        };
        return names[lang] || lang;
    }
};

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    I18n.init();
});
