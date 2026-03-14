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
    const titleElement = document.getElementById('case-modal-title');
    if (modal) {
        if (titleElement) {
            titleElement.textContent = caseName;
        }
        modal.classList.add('active');
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
    if (modal) {
        modal.classList.remove('active');
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
    if (typeof openMessageModal === 'function') {
        openMessageModal('Compra Simulada', 'Item ' + itemId + ' comprado por ' + price + ' coins!', 'info');
    }
}

function startGame() {
    const nick = document.getElementById('nick').value;
    if (typeof setNick === 'function') {
        setNick(nick);
    }
}

function openSkinsModal() {
    const modal = document.getElementById('skinsModal');
    if (modal) {
        modal.classList.add('active');
        if (typeof openSkinsList === 'function') {
            openSkinsList();
        }
    }
}

function closeSkinsModal() {
    const modal = document.getElementById('skinsModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

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
        'shop-modal', 'case-modal', 'settings-modal', 
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
        'settings.html', 'shop.html', 'cases.html', 
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
