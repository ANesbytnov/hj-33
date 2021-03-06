const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/weather');
request.send();

function onLoad() {
  if (request.status !== 200) {
    console.log(`Ответ ${request.status}: ${request.statusText}`);
  } else {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}