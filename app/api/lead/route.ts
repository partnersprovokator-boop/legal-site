export async function POST(request: Request) {
  try {
    const body = await request.json();

    const params = new URLSearchParams({
      internalKey: "510288961",
      token: "11387",
      keyid: Date.now().toString(),
      name: body.name || "",
      phone: body.phone || "",
      question: body.question || "Заявка с сайта",
      location: "Москва",
    });

    const response = await fetch("https://crm.re-lead.pro/api/cdn_api_partner", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await response.text();
    console.log("CRM RESPONSE:", text);

    return Response.json({
      success: true,
      crmResponse: text,
    });

  } catch (error) {
    console.error("CRM ERROR:", error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}