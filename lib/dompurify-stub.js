// Stub para isomorphic-dompurify en el servidor
// Previene que jsdom se inicialice y busque default-stylesheet.css
module.exports = {
  default: {
    sanitize: (html) => html, // Retornar HTML sin sanitizar en el servidor
  },
}

