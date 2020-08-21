function unhandledErros() {
    process.on('uncaughtException', (err) => {
        console.log('Unchaught Exception');

    });
    process.on('unhandledRejection', (err, promise) => {
        console.log(err.message.red);
        process.exit(1);
    });
}

module.exports = unhandledErros;