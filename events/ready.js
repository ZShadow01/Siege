module.exports = {
    name: 'ready',
    call: async (client) => {
        console.log(`Name: ${client.user.tag}`);
        console.log(`ID  : ${client.user.id}`);
        console.log("-------------------------");
        console.log("Bot is online");
    }
};
