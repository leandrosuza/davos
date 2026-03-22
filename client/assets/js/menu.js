/* Menu Control Functions */

// Authentication State
let isLoggedIn = false;
let currentUser = null;

// Auth Tab Switching
function switchAuthTab(tabName, btnElement) {
    // Hide all auth tab contents
    document.querySelectorAll('.auth-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected auth tab
    const selectedTab = document.getElementById('auth-tab-' + tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update auth tab buttons - remove active from all
    document.querySelectorAll('.auth-tabs .auth-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    if (btnElement) {
        btnElement.classList.add('active');
    }
}

// Handle Login (simulated - works even with empty fields)
function handleLogin() {
    const email = document.getElementById('login-email')?.value || '';
    const password = document.getElementById('login-password')?.value || '';
    
    // Simulação de login - aceita qualquer coisa
    const username = email ? email.split('@')[0] : 'Player';
    
    currentUser = {
        username: username,
        handle: '@' + username.toLowerCase().replace(/[^a-z0-9]/g, ''),
        balance: '1,250',
        likes: '1.2K',
        dislikes: '23',
        hours: '156h',
        kills: '247'
    };
    
    isLoggedIn = true;
    updateProfileCard();
}

// Handle Register (simulated - works even with empty fields)
function handleRegister() {
    const username = document.getElementById('register-username')?.value || 'NovoPlayer';
    const email = document.getElementById('register-email')?.value || '';
    const password = document.getElementById('register-password')?.value || '';
    
    // Simulação de registro - cria novo usuário
    currentUser = {
        username: username || 'NovoPlayer',
        handle: '@' + (username || 'novoplayer').toLowerCase().replace(/[^a-z0-9]/g, ''),
        balance: '500',
        likes: '0',
        dislikes: '0',
        hours: '0h',
        kills: '0'
    };
    
    isLoggedIn = true;
    updateProfileCard();
    
    // Mostrar mensagem de sucesso
    if (typeof openMessageModal === 'function') {
        openMessageModal('Conta Criada!', 'Bem-vindo, ' + currentUser.username + '! Sua conta foi criada com sucesso.', 'info');
    }
}

// Handle Logout
function handleLogout() {
    isLoggedIn = false;
    currentUser = null;
    
    // Limpar campos de login
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const registerUsername = document.getElementById('register-username');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    
    if (loginEmail) loginEmail.value = '';
    if (loginPassword) loginPassword.value = '';
    if (registerUsername) registerUsername.value = '';
    if (registerEmail) registerEmail.value = '';
    if (registerPassword) registerPassword.value = '';
    
    updateProfileCard();
}

// Update Profile Card Display
function updateProfileCard() {
    const guestState = document.getElementById('profile-guest');
    const loggedState = document.getElementById('profile-logged');
    const inventoryCard = document.getElementById('inventory-card');
    const battlepassCard = document.getElementById('battlepass-card');
    
    if (!guestState || !loggedState) return;
    
    if (isLoggedIn && currentUser) {
        // Mostrar estado logado
        guestState.style.display = 'none';
        loggedState.style.display = 'block';
        
        // Mostrar cards de inventory e battle pass
        if (inventoryCard) inventoryCard.classList.remove('hidden-logged-out');
        if (battlepassCard) battlepassCard.classList.remove('hidden-logged-out');
        
        // Atualizar informações do usuário
        document.getElementById('logged-username').textContent = currentUser.username;
        document.getElementById('logged-handle').textContent = currentUser.handle;
        document.getElementById('logged-balance').textContent = currentUser.balance;
        document.getElementById('logged-likes').textContent = currentUser.likes;
        document.getElementById('logged-dislikes').textContent = currentUser.dislikes;
        document.getElementById('logged-hours').textContent = currentUser.hours;
        document.getElementById('logged-kills').textContent = currentUser.kills;
    } else {
        // Mostrar estado guest
        guestState.style.display = 'block';
        loggedState.style.display = 'none';
        
        // Ocultar cards de inventory e battle pass
        if (inventoryCard) inventoryCard.classList.add('hidden-logged-out');
        if (battlepassCard) battlepassCard.classList.add('hidden-logged-out');
    }
}

// Inventory Tab Switching
function showInvTab(tabName, btnElement) {
    // Hide all inventory tab contents
    document.querySelectorAll('.inv-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected inventory tab
    const selectedTab = document.getElementById('inv-tab-' + tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update inventory tab buttons - remove active from all
    document.querySelectorAll('.inventory-tabs .inv-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    if (btnElement) {
        btnElement.classList.add('active');
    }
}

// Inventory Modal Functions
function openInventoryModal() {
    const modal = document.getElementById('inventory-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeInventoryModal() {
    const modal = document.getElementById('inventory-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Settings Modal Functions
function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Shop Modal Functions
function openShopModal() {
    const modal = document.getElementById('shop-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeShopModal() {
    const modal = document.getElementById('shop-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Case Modal Functions
function openCasesModal() {
    const modal = document.getElementById('case-modal');
    if (modal) {
        modal.classList.add('active');
        // Delay maior para garantir que o modal esteja completamente renderizado
        setTimeout(function() {
            console.log('=== DEBUG ROULETTE ===');
            const roulette = document.getElementById('roulette');
            console.log('Roulette element:', roulette);
            if (roulette) {
                console.log('Roulette innerHTML length:', roulette.innerHTML.length);
                console.log('Roulette children count:', roulette.children.length);
                console.log('Roulette display:', roulette.style.display);
                console.log('Roulette transform:', roulette.style.transform);
            }
            regenerateRouletteIfNeeded();
            resetRoulette();
            console.log('=====================');
        }, 100);
    }
}

function openCaseWithName(caseName) {
    const modal = document.getElementById('case-modal');
    const boostersModal = document.getElementById('boosters-modal');
    const titleElement = document.getElementById('case-modal-title');
    
    console.log('Opening case:', caseName);
    console.log('Boosters modal element:', boostersModal);
    
    if (modal) {
        if (titleElement) {
            titleElement.textContent = caseName;
        }
        modal.classList.add('active');
        
        // Abrir painel Boosters junto com o modal da roleta
        if (boostersModal) {
            boostersModal.classList.add('active');
            console.log('Boosters panel activated');
        } else {
            console.error('Boosters modal not found!');
        }
        
        // Delay maior para garantir que o modal esteja completamente renderizado
        setTimeout(function() {
            console.log('=== DEBUG ROULETTE (openCaseWithName) ===');
            const roulette = document.getElementById('roulette');
            console.log('Roulette element:', roulette);
            if (roulette) {
                console.log('Roulette innerHTML length:', roulette.innerHTML.length);
                console.log('Roulette children count:', roulette.children.length);
                console.log('Roulette display:', roulette.style.display);
                console.log('Roulette transform:', roulette.style.transform);
            }
            regenerateRouletteIfNeeded();
            resetRoulette();
            console.log('=====================');
        }, 100);
    }
}

// Função auxiliar para regenerar a roleta - agora sempre recria os cards
function regenerateRouletteIfNeeded() {
    const roulette = document.getElementById('roulette');
    if (roulette) {
        // SEMPRE regenerar a roleta ao abrir o modal para garantir que está correta
        console.log('Regenerando roleta...');
        // Restaurar HTML original com os 18 cards padrão
        roulette.innerHTML = `
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Marble Platinum</span><span class="skin-weapon">P90</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Blood Club</span><span class="skin-weapon">Sawed-Off</span></div>
            <div class="skin-card industrial"><i class="fas fa-crosshairs" style="color: #5e98d9"></i><span class="skin-name">Ice Bronze</span><span class="skin-weapon">Negev</span></div>
            <div class="skin-card consumer"><i class="fas fa-khanda" style="color: #b0c3d9"></i><span class="skin-name">Asiimov Warrior</span><span class="skin-weapon">Karambit</span></div>
            <div class="skin-card industrial"><i class="fas fa-crosshairs" style="color: #5e98d9"></i><span class="skin-name">Shadow Splash</span><span class="skin-weapon">MAG-7</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Fade Check</span><span class="skin-weapon">PP-Bizon</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Snake Wing</span><span class="skin-weapon">M4A1-S</span></div>
            <div class="skin-card industrial"><i class="fas fa-crosshairs" style="color: #5e98d9"></i><span class="skin-name">Moon King</span><span class="skin-weapon">P250</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Electric Joker</span><span class="skin-weapon">AK-47</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Sand Gold</span><span class="skin-weapon">USP-S</span></div>
            <div class="skin-card milspec"><i class="fas fa-crosshairs" style="color: #4b69ff"></i><span class="skin-name">Rust Warrior</span><span class="skin-weapon">Negev</span></div>
            <div class="skin-card restricted"><i class="fas fa-khanda" style="color: #8847ff"></i><span class="skin-name">Dragon Lore</span><span class="skin-weapon">AWP</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Hyper Beast</span><span class="skin-weapon">UMP-45</span></div>
            <div class="skin-card classified"><i class="fas fa-hand-paper" style="color: #d32ce6"></i><span class="skin-name">Crimson Web</span><span class="skin-weapon">Gloves</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Vulcan Gold</span><span class="skin-weapon">P90</span></div>
            <div class="skin-card covert"><i class="fas fa-khanda" style="color: #eb4b4b"></i><span class="skin-name">Fade Knife</span><span class="skin-weapon">Knife</span></div>
            <div class="skin-card consumer"><i class="fas fa-crosshairs" style="color: #b0c3d9"></i><span class="skin-name">Ice Joker</span><span class="skin-weapon">FAMAS</span></div>
            <div class="skin-card industrial"><i class="fas fa-crosshairs" style="color: #5e98d9"></i><span class="skin-name">Moon Queen</span><span class="skin-weapon">UMP-45</span></div>
        `;
        console.log('Roulette regenerada com', roulette.querySelectorAll('.skin-card').length, 'cards');
    }
}

// Função para resetar a roleta ao estado inicial
function resetRoulette() {
    const roulette = document.getElementById('roulette');
    if (roulette) {
        // Forçar visibilidade dos itens
        roulette.style.display = 'flex';
        roulette.style.visibility = 'visible';
        roulette.style.opacity = '1';
        roulette.style.transform = 'translateX(0px)';
        roulette.style.transition = 'none';
        
        // Verificar se há itens na roleta
        const items = roulette.querySelectorAll('.skin-card');
        console.log('Itens na roleta:', items.length);
        
        // Garantir que todos os itens estejam visíveis
        items.forEach((item, index) => {
            item.style.display = 'flex';
            item.style.visibility = 'visible';
            item.style.opacity = '1';
        });
        
        console.log('Roulette resetada, transform:', roulette.style.transform);
    } else {
        console.error('Elemento roulette não encontrado!');
    }
}

function closeCaseModal() {
    const modal = document.getElementById('case-modal');
    const boostersModal = document.getElementById('boosters-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    // Fechar painel Boosters junto com o modal da roleta
    if (boostersModal) {
        boostersModal.classList.remove('active');
    }
}

// Shop Tab Switching
function switchShopTab(tabName) {
    const shopGrid = document.getElementById('shop-skins');
    const tabs = document.querySelectorAll('.shop-tab');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Update shop grid content based on tab
    if (shopGrid) {
        // Simulação - pode ser expandido para diferentes categorias
        console.log('Switched to shop tab:', tabName);
    }
}

// Buy Item Function
function buyItem(itemId, price) {
    // Definir detalhes do item baseado no ID
    const itemDetails = {
        'dragon': { name: 'Dragon Skin', icon: 'fa-crosshairs', color: '#ff4b4b', category: 'skins' },
        'karambit': { name: 'Karambit Gold', icon: 'fa-khanda', color: '#8847ff', category: 'skins' },
        'gloves': { name: 'Elite Gloves', icon: 'fa-hand-paper', color: '#d32ce6', category: 'skins' },
        'fire': { name: 'Fire Effect', icon: 'fa-fire', color: '#ff6600', category: 'effects' },
        'crown': { name: 'Crown Skin', icon: 'fa-crown', color: '#ffd700', category: 'skins' },
        'ghost': { name: 'Ghost Mode', icon: 'fa-ghost', color: '#4b69ff', category: 'effects' }
    };
    
    const item = itemDetails[itemId];
    if (!item) return;
    
    // Recuperar inventário atual do localStorage
    let inventory = JSON.parse(localStorage.getItem('davos_inventory') || '[]');
    
    // Adicionar item ao inventário
    const newItem = {
        id: itemId,
        name: item.name,
        icon: item.icon,
        color: item.color,
        category: item.category,
        purchasedAt: new Date().toISOString()
    };
    
    // Verificar se item já existe
    const existingItem = inventory.find(i => i.id === itemId);
    if (existingItem) {
        openMessageModal('Aviso', 'Você já possui este item!', 'info');
        return;
    }
    
    inventory.push(newItem);
    localStorage.setItem('davos_inventory', JSON.stringify(inventory));
    
    if (typeof openMessageModal === 'function') {
        openMessageModal('Compra Realizada', `Item "${item.name}" comprado por ${price} coins!`, 'info');
    }
    
    // Atualizar grid de inventário se estiver visível
    updateBackpackDisplay();
}

// Backpack Modal Functions
function openBackpackModal() {
    const modal = document.getElementById('backpack-modal');
    if (modal) {
        modal.classList.add('active');
        updateBackpackDisplay();
    }
}

function closeBackpackModal() {
    const modal = document.getElementById('backpack-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function switchBackpackTab(category) {
    // Atualizar tabs visuais
    document.querySelectorAll('.backpack-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Atualizar display
    updateBackpackDisplay(category);
}

function updateBackpackDisplay(category = 'all') {
    const grid = document.getElementById('backpack-items');
    if (!grid) return;
    
    const inventory = JSON.parse(localStorage.getItem('davos_inventory') || '[]');
    
    // Filtrar por categoria se necessário
    const items = category === 'all' ? inventory : inventory.filter(item => item.category === category);
    
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-backpack">
                <i class="fas fa-box-open"></i>
                <p>Sua mochila está vazia</p>
                <span>Compre itens na loja para vê-los aqui</span>
            </div>
        `;
        return;
    }
    
    // Renderizar items
    grid.innerHTML = items.map(item => `
        <div class="backpack-item" data-id="${item.id}">
            <div class="backpack-item-icon" style="color: ${item.color}">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="backpack-item-name">${item.name}</div>
            <div class="backpack-item-category">${getCategoryLabel(item.category)}</div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'skins': 'Skin',
        'effects': 'Efeito',
        'passes': 'Passe'
    };
    return labels[category] || category;
}

// Atualizar grid de inventário ao carregar página
function updateInventoryGrid() {
    const inventory = JSON.parse(localStorage.getItem('davos_inventory') || '[]');
    const grid = document.querySelector('.inventory-grid');
    
    if (!grid) return;
    
    // Limpar slots existentes
    grid.innerHTML = '';
    
    // Criar 6 slots (preencher com items ou vazio)
    for (let i = 0; i < 6; i++) {
        const item = inventory[i];
        if (item) {
            grid.innerHTML += `
                <div class="inventory-item" onclick="openBackpackModal()">
                    <div class="item-icon" style="color: ${item.color}">
                        <i class="fas ${item.icon}"></i>
                    </div>
                </div>
            `;
        } else {
            grid.innerHTML += `
                <div class="inventory-item empty" onclick="openBackpackModal()">
                    <i class="fas fa-plus"></i>
                </div>
            `;
        }
    }
}

// Inicializar inventário ao carregar página
document.addEventListener('DOMContentLoaded', function() {
    updateInventoryGrid();
});


// ============================================
// SKINS GALLERY - Colors & Skins
// ============================================

var _skinSelection = {
    color: localStorage.getItem('player_color') || null,
    skin:  localStorage.getItem('player_skin')  || null
};

var PRESET_COLORS = [
    '#ff4444','#ff8800','#ffcc00','#88cc00',
    '#00cc44','#00ccaa','#00aaff','#4466ff',
    '#8844ff','#cc44ff','#ff44aa','#ff4488',
    '#ffffff','#cccccc','#888888','#333333',
    '#ff6b6b','#ffd93d','#6bcb77','#4d96ff',
    '#f72585','#7209b7','#3a0ca3','#4cc9f0',
];

function openSkinsModal() {
    const modal = document.getElementById('skinsModal');
    if (!modal) return;
    modal.classList.add('active');
    _buildColorPalette();
    _buildSkinsGrid();
    _updateSkinPreview();
}

function closeSkinsModal() {
    const modal = document.getElementById('skinsModal');
    if (modal) modal.classList.remove('active');
}

function switchSkinsTab(tab, btn) {
    document.querySelectorAll('.skins-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skins-tab-content').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const content = document.getElementById('skins-tab-' + tab);
    if (content) content.classList.add('active');
}

function _buildColorPalette() {
    const palette = document.getElementById('colorPalette');
    if (!palette) return;
    palette.innerHTML = '';
    PRESET_COLORS.forEach(function(hex) {
        const sw = document.createElement('div');
        sw.className = 'color-swatch' + (_skinSelection.color === hex && !_skinSelection.skin ? ' selected' : '');
        sw.style.background = hex;
        sw.title = hex;
        sw.onclick = function() { selectPresetColor(hex); };
        palette.appendChild(sw);
    });
    // Sync custom picker
    const picker = document.getElementById('customColorPicker');
    if (picker && _skinSelection.color && !_skinSelection.skin) picker.value = _skinSelection.color;
}

function _buildSkinsGrid() {
    const grid = document.getElementById('skinsImageGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Usar lista do engine se disponível, senão tentar fetch, senão fallback
    var skinList = (window._knownSkins && window._knownSkins.length > 0)
        ? window._knownSkins
        : null;

    function renderGrid(list) {
        grid.innerHTML = '';
        if (!list || list.length === 0) {
            grid.innerHTML = '<div class="skins-empty"><i class="fas fa-image"></i><br>No skins available</div>';
            return;
        }
        list.forEach(function(name) {
            const item = document.createElement('div');
            item.className = 'skin-img-item' + (_skinSelection.skin === name ? ' selected' : '');
            item.title = name;
            item.innerHTML = '<img src="skins/' + name + '.png" alt="' + name + '" onerror="this.parentElement.style.display=\'none\'">';
            item.onclick = function() { selectSkinImage(name); };
            grid.appendChild(item);
        });
    }

    if (skinList) {
        renderGrid(skinList);
    } else {
        // Tentar via PHP
        fetch('checkdir.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' },
            body: 'action=test'
        }).then(function(r) { return r.json(); })
          .then(function(data) {
              var list = JSON.parse(data.names || '[]');
              window._knownSkins = list;
              renderGrid(list);
          }).catch(function() {
              // Fallback: mostrar doge que sabemos que existe
              renderGrid(['doge']);
          });
    }
}

function selectPresetColor(hex) {
    _skinSelection.color = hex;
    _skinSelection.skin  = null;
    document.querySelectorAll('.color-swatch').forEach(function(sw) {
        sw.classList.toggle('selected', sw.style.background === hex || sw.title === hex);
    });
    document.querySelectorAll('.skin-img-item').forEach(function(el) { el.classList.remove('selected'); });
    _updateSkinPreview();
}

function selectCustomColor(hex) {
    _skinSelection.color = hex;
    _skinSelection.skin  = null;
    document.querySelectorAll('.color-swatch').forEach(function(sw) { sw.classList.remove('selected'); });
    document.querySelectorAll('.skin-img-item').forEach(function(el) { el.classList.remove('selected'); });
    _updateSkinPreview();
}

function selectSkinImage(name) {
    _skinSelection.skin  = name;
    _skinSelection.color = null;
    document.querySelectorAll('.skin-img-item').forEach(function(el) {
        el.classList.toggle('selected', el.title === name);
    });
    document.querySelectorAll('.color-swatch').forEach(function(sw) { sw.classList.remove('selected'); });
    _updateSkinPreview();
}

function clearSkinSelection() {
    _skinSelection.color = null;
    _skinSelection.skin  = null;
    document.querySelectorAll('.color-swatch, .skin-img-item').forEach(function(el) { el.classList.remove('selected'); });
    _updateSkinPreview();
}

function _updateSkinPreview() {
    const cell = document.getElementById('skinPreviewCell');
    const label = document.getElementById('skinPreviewLabel');
    const name  = document.getElementById('skinPreviewName');
    if (!cell) return;

    if (_skinSelection.skin) {
        cell.style.background = '#555';
        cell.innerHTML = '<img src="skins/' + _skinSelection.skin + '.png" alt="' + _skinSelection.skin + '">';
        if (name) name.textContent = _skinSelection.skin;
    } else if (_skinSelection.color) {
        cell.style.background = _skinSelection.color;
        cell.innerHTML = '<span id="skinPreviewLabel" style="color:#fff;font-size:22px;">●</span>';
        if (name) name.textContent = _skinSelection.color;
    } else {
        cell.style.background = '#888';
        cell.innerHTML = '<span id="skinPreviewLabel" style="color:#fff;font-size:22px;">?</span>';
        if (name) name.textContent = 'No selection';
    }

    // Atualizar o skin-box no menu principal
    const skinBox = document.querySelector('.skin-box');
    if (skinBox) {
        if (_skinSelection.skin) {
            skinBox.innerHTML = '<img src="skins/' + _skinSelection.skin + '.png" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
        } else if (_skinSelection.color) {
            skinBox.style.background = _skinSelection.color;
            skinBox.innerHTML = '';
        } else {
            skinBox.style.background = '';
            skinBox.innerHTML = '<i class="fas fa-plus"></i>';
        }
    }
}

function applySkinSelection() {
    if (_skinSelection.color) {
        localStorage.setItem('player_color', _skinSelection.color);
        localStorage.removeItem('player_skin');
    } else if (_skinSelection.skin) {
        localStorage.setItem('player_skin', _skinSelection.skin);
        localStorage.removeItem('player_color');
    } else {
        localStorage.removeItem('player_color');
        localStorage.removeItem('player_skin');
    }
    // Expor para o engine
    window.playerSelectedColor = _skinSelection.color || null;
    window.playerSelectedSkin  = _skinSelection.skin  || null;

    // Se estiver em jogo, reenviar nick imediatamente para sincronizar com o servidor
    if (window.wsIsOpen && window.wsIsOpen()) {
        window.sendNickName();
    }

    closeSkinsModal();
}

// Carregar seleção salva ao iniciar
(function() {
    var savedColor = localStorage.getItem('player_color');
    var savedSkin  = localStorage.getItem('player_skin');
    if (savedColor) { _skinSelection.color = savedColor; window.playerSelectedColor = savedColor; }
    if (savedSkin)  { _skinSelection.skin  = savedSkin;  window.playerSelectedSkin  = savedSkin; }
    // Atualizar skin-box após DOM pronto
    document.addEventListener('DOMContentLoaded', function() {
        _updateSkinPreview();
    });
})();



function openMessageModal(title, message, type = 'info') {
    const modal = document.getElementById('messageModal');
    const modalTitle = document.getElementById('messageModalTitle');
    const modalBody = document.getElementById('messageModalBody');
    const modalHeader = document.getElementById('messageModalHeader');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = `<p>${message}</p>`;
        
        // Remove previous type classes
        modalHeader.classList.remove('modal-error', 'modal-info');
        // Add new type class
        if (type === 'error') {
            modalHeader.classList.add('modal-error');
        } else {
            modalHeader.classList.add('modal-info');
        }
        
        modal.classList.add('active');
    }
}

function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Clan Modal Functions
function openClanModal() {
    const modal = document.getElementById('clanModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeClanModal() {
    const modal = document.getElementById('clanModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Updates Modal Functions
function openUpdatesModal() {
    const modal = document.getElementById('updatesModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeUpdatesModal() {
    const modal = document.getElementById('updatesModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Battle Pass Modal Functions
function openBattlePassModal() {
    const modal = document.getElementById('battlepass-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeBattlePassModal() {
    const modal = document.getElementById('battlepass-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Leaderboard Modal Functions
function openLeaderboardModal() {
    const modal = document.getElementById('leaderboard-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeLeaderboardModal() {
    const modal = document.getElementById('leaderboard-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Tab Switching Function
function showTab(tabName, btnElement) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById('tab-' + tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update tab buttons - remove active from all
    document.querySelectorAll('.davos-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    if (btnElement) {
        btnElement.classList.add('active');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active, .modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Initialize profile card on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProfileCard();
    
    // DEBUG: Verificar se modais estão no DOM
    console.log('=== DEBUG MODAIS ===');
    const modals = [
        'shop-modal', 'backpack-modal', 'case-modal', 'settings-modal', 
        'battlepass-modal', 'leaderboard-modal', 'skinsModal',
        'clanModal', 'updatesModal', 'messageModal'
    ];
    
    modals.forEach(function(id) {
        const el = document.getElementById(id);
        console.log(id + ':', el ? 'ENCONTRADO ✓' : 'NÃO ENCONTRADO ✗');
    });
    console.log('====================');
    
    // Se modais não foram carregados (PHP não está funcionando), carregar via JS
    setTimeout(function() {
        if (!document.getElementById('shop-modal')) {
            console.log('Modais não encontrados. Carregando via JavaScript...');
            loadModalsDynamically();
        }
    }, 500);
});

// Função para carregar modais dinamicamente se PHP falhar
function loadModalsDynamically() {
    const modalsToLoad = [
        'settings.html', 'shop.html', 'backpack.html', 'cases.html', 'boosters.html',
        'battlepass.html', 'leaderboard.html', 'skins.html',
        'message.html', 'clan.html', 'updates.html'
    ];
    
    const basePath = 'include/modals/';
    
    modalsToLoad.forEach(function(file) {
        fetch(basePath + file)
            .then(response => response.text())
            .then(html => {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                document.body.appendChild(temp.firstElementChild);
                console.log('Carregado: ' + file);
            })
            .catch(err => console.error('Erro ao carregar ' + file + ':', err));
    });
}
