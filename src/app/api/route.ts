import { connect, ErrorCode, JSONCodec } from "nats";

export async function POST(req: Request) {
  const { name, company } = await req.json();
  const nc = await connect({ servers: "20.212.150.31:4222" });
  const jc = JSONCodec();

  try {
    const msg = await nc.request(
      "generate.badge",
      jc.encode({ name, company }),
      {
        timeout: 30 * 1000,
      }
    );

    if (msg.headers?.get("NATS-Error")) {
      return new Response(msg.headers.get("NATS-Error"), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(msg.data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${name}.pdf`,
      },
    });
  } catch (err: any) {
    if (err.code === ErrorCode.NoResponders) {
      return new Response("No generator-service was found", {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(err.message, {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
}
