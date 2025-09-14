export async function saveProfileStep(uid, field, value) {
  await fetch(`https://stock-u3sm.onrender.com/api/profile/step`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, field, value }),
  });
}
