const axios = require('axios');

// Función que maneja las búsquedas de Google Custom Search
module.exports = async (req, res) => {
  const query = req.query.query; // La consulta de búsqueda que el usuario pasa como parámetro
  const apiKey = process.env.GOOGLE_API_KEY; // La clave de API de Google Custom Search
  const cx = '16d5d1c3727364c55'; // Tu ID de motor de búsqueda personalizado

  if (!query) {
    return res.status(400).send('Debe proporcionar un término de búsqueda.');
  }

  try {
    // Hacer la petición a la API de Google Custom Search
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: apiKey,
        cx: cx,
        q: query,
        num: 5, // Número de resultados que deseas obtener
      },
    });

    const results = response.data.items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));

    // Responder con los resultados
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send('Error al realizar la búsqueda: ' + error.message);
  }
};
