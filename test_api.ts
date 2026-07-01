async function test() {
  const res = await fetch('http://localhost:3000/api/extract-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: 'test', mimeType: 'image/jpeg' })
  });
  console.log(res.status);
  console.log(await res.text());
}
test();
