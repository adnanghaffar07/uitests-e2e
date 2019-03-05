module.exports = {
    Mailosaur: {
        clientId: "Co4ezyqTBytUZGm",
        serverId: "4dqu4izz"
    },
    latestEmail(client){
       return client.servers.generateEmailAddress(this.Mailosaur.serverId);
    }
};
