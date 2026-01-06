// import axios from "axios";

// export async function proxyRequest(req, res, targetUrl) {
//   try {
//     const response = await axios({
//       method: req.method,
//       url: targetUrl,
//       data: req.body,
//       headers: req.headers,
//       timeout: 10000, 
//     });
//     res.status(response.status).json(response.data);
//   } catch (err) {
//     console.error("Proxy error details:", err.toJSON ? err.toJSON() : err.message);
//     res.status(502).json({ error: "Service unreachable", details: err.message });
//   }
// }
