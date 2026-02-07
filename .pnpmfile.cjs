function readPackage(pkg, context) {
  // Rimuovi gli script di installazione per pacchetti che hanno fallback JavaScript
  if (pkg.name === 'tiny-secp256k1') {
    delete pkg.scripts?.install
    delete pkg.scripts?.preinstall
    delete pkg.scripts?.postinstall
    context.log('tiny-secp256k1: rimosso script di build, userà fallback JavaScript puro')
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
