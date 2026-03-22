var Packet = require('./packet');
var Vector = require('./modules/Vector');

function PacketHandler(gameServer, socket) {
    this.gameServer = gameServer;
    this.socket = socket;
    // Detect protocol version - we can do something about it later
    this.protocolVersion = 0;

    this.pressQ = false;
    this.pressW = false;
    this.pressSpace = false;
}

module.exports = PacketHandler;

PacketHandler.prototype.handleMessage = function(message) {
    // Discard empty messages
    if (message.length == 0) return;
    var packetId = message.readUInt8(0, true);

    switch (packetId) {
        case 0:
            // Set Nickname
            if (this.protocolVersion == 5) {
                // Check for invalid packets
                if ((message.length + 1) % 2 == 1) break;
                // Ler o nick completo sem truncar — o setNickname vai truncar só o displayName
                var name = message.slice(1, message.length - 1).toString('ucs2');
                this.setNickname(name);
            } else {
                var name = message.slice(1, message.length - 1).toString('utf-8');
                this.setNickname(name);
            }
            break;
        case 1:
            // Spectate mode
            if (this.socket.playerTracker.cells.length <= 0) {
                // Make sure client has no cells
                this.socket.playerTracker.spectate = true;
            }
            break;
        case 16:
            var client = this.socket.playerTracker;
            // Set Target
            switch (message.length) {
                case 13:
                    client.mouse.x = message.readInt32LE(1, true) - client.scrambleX;
                    client.mouse.y = message.readInt32LE(5, true) - client.scrambleY;
                    break;
                case 9:
                    client.mouse.x = message.readInt16LE(1, true) - client.scrambleX;
                    client.mouse.y = message.readInt16LE(3, true) - client.scrambleY;
                    break;
                case 21:
                    client.mouse.x = message.readDoubleLE(1, true) - client.scrambleX;
                    client.mouse.y = message.readDoubleLE(9, true) - client.scrambleY;
                    break;
            }
            break;
        case 17:
            // Space Press - Split cell
            this.pressSpace = true;
            break;
        case 18:
            // Q Key Pressed
            this.pressQ = true;
            break;
        case 19:
            // Q Key Released
            break;
        case 21:
            // W Press - Eject mass
            this.pressW = true;
            break;
        case 254:
            // Connection Start
            if (message.length == 5) {
                this.protocolVersion = message.readUInt32LE(1, true);
                // Send on connection packets
                this.socket.sendPacket(new Packet.ClearNodes(this.protocolVersion));
                var c = this.gameServer.config;
                this.socket.sendPacket(new Packet.SetBorder(
                    c.borderLeft + this.socket.playerTracker.scrambleX,
                    c.borderRight + this.socket.playerTracker.scrambleX,
                    c.borderTop + this.socket.playerTracker.scrambleY,
                    c.borderBottom + this.socket.playerTracker.scrambleY
                ));
            }
            break;
        case 255:
            if (message.length == 5) {
                // Set client's center pos to middle of server
                var borders = this.gameServer.rangeBorders(),
                    playerTracker = this.socket.playerTracker;

                playerTracker.centerPos = new Vector(borders.x, borders.y);
                playerTracker.sendPosPacket(1.5 / (Math.sqrt(200) / Math.log(200)));
            }
            break;
        case 222:
            // Ping - Send pong response
            this.socket.sendPacket(new Packet.PingResponse());
            break;
        default:
            break;
    }
};

PacketHandler.prototype.setNickname = function(newNick) {
    var client = this.socket.playerTracker;

    // Parsear prefixos de skin e cor customizada
    // Formato skin:  "%skinname|nick"
    // Formato cor:   "\x01rrggbb|nick"
    var skinName = null;
    var customColor = null;
    var displayName = newNick;

    if (newNick.length > 0 && newNick.charCodeAt(0) === 0x01) {
        // Cor customizada: \x01rrggbb|nick
        var sep = newNick.indexOf('|');
        if (sep > 0) {
            var hex = newNick.substring(1, sep);
            displayName = newNick.substring(sep + 1);
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                customColor = { r: r, g: g, b: b };
            }
        }
    } else if (newNick.length > 0 && newNick.charAt(0) === '%') {
        // Skin de imagem: %skinname|nick
        var sep = newNick.indexOf('|');
        if (sep > 0) {
            skinName = newNick.substring(1, sep);
            displayName = newNick.substring(sep + 1);
        } else {
            skinName = newNick.substring(1);
            displayName = '';
        }
    }

    client.skinName = skinName;
    client.customColor = customColor;
    client.setName(displayName.substr(0, this.gameServer.config.playerMaxNickLength));

    // Aplicar cor customizada nas células existentes
    if (customColor) {
        for (var i = 0; i < client.cells.length; i++) {
            client.cells[i].setColor(customColor);
        }
    }

    // Forçar reenvio das células para todos os outros clientes (cor/skin mudou)
    if (client.cells.length > 0) {
        var gameServer = this.gameServer;
        var socket = this.socket;
        gameServer.clients.forEach(function(otherSocket) {
            if (!otherSocket || otherSocket === socket) return;
            var otherTracker = otherSocket.playerTracker;
            if (!otherTracker) return;
            for (var i = 0; i < client.cells.length; i++) {
                var cell = client.cells[i];
                if (otherTracker.visibleNodes.indexOf(cell) !== -1 &&
                    otherTracker.forceUpdateQueue.indexOf(cell) === -1) {
                    otherTracker.forceUpdateQueue.push(cell);
                }
            }
        });
    }

    if (client.cells.length < 1) {
        this.socket.sendPacket(new Packet.ClearNodes());
        this.gameServer.gameMode.onPlayerSpawn(this.gameServer, client);
        client.spectate = false;
    }
};
