export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const payload = {
    email: email.trim().toLowerCase(),
    updateEnabled: true,
  };

  if (process.env.BREVO_LIST_ID) {
    payload.listIds = [parseInt(process.env.BREVO_LIST_ID, 10)];
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    // 201 = created, 204 = updated (updateEnabled)
    if (response.status === 201 || response.status === 204) {
      return res.status(200).json({ success: true });
    }

    const data = await response.json().catch(() => ({}));

    // Duplicate contact still counts as success
    if (response.status === 400 && data.code === 'duplicate_parameter') {
      return res.status(200).json({ success: true, existing: true });
    }

    console.error('Brevo error', response.status, data);
    return res.status(500).json({ error: data.message || 'Brevo API error' });
  } catch (err) {
    console.error('Waitlist handler error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
