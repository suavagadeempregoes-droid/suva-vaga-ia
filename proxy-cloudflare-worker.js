export default {
  async fetch(request, env) {

    // Libera o navegador a chamar este proxy (CORS)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Requisição de "verificação" que o navegador manda antes do POST real
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Método não permitido", { status: 405, headers: corsHeaders });
    }

    try {
      const bodyFromFrontend = await request.text();

      const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,       // <- vem do Secret, nunca aparece aqui
          "anthropic-version": "2023-06-01",
        },
        body: bodyFromFrontend,
      });

      const responseText = await anthropicResponse.text();

      return new Response(responseText, {
        status: anthropicResponse.status,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Erro no proxy: " + err.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
  },
};
