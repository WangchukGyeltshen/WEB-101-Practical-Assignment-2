export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    
    // This is just dummy logic
    console.log("New user:", { name, email, password });

    return res.status(200).json({ message: "User created successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}