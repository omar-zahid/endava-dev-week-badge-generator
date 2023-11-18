import { connect, ErrorCode, JSONCodec } from "nats";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, company } = req.body;
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
      res.status(500).json({ error: msg.headers.get("NATS-Error") });
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.send(msg.data);
  } catch (err: any) {
    if (err.code === ErrorCode.NoResponders) {
      res.status(500).json({ error: "No generator-service was found" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
