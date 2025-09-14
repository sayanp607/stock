export async function saveProfileStep(uid, field, value) {
  await fetch('http://localhost:5000/api/profile/step', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, field, value }),
  });
}
