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
    
    // Mostrar mensagem de sucesso
    if (typeof openMessageModal === 'function') {
        openMessageModal('Login Realizado!', 'Bem-vindo de volta, ' + username + '!', 'info');
    }
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
    
    if (!guestState || !loggedState) return;
    
    if (isLoggedIn && currentUser) {
        // Mostrar estado logado
        guestState.style.display = 'none';
        loggedState.style.display = 'block';
        
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
function openCaseModal() {
    const modal = document.getElementById('case-modal');
    if (modal) {
        modal.classList.add('active');
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
});
