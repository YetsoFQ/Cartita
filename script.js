// Descargar archivo PDF
document.querySelector('.heart').addEventListener('click', function() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'carta.pdf', true); // Asegúrate de que el archivo exista en tu servidor
  xhr.responseType = 'blob';
  xhr.onload = function() {
      if (xhr.status === 200) {
          const blob = xhr.response;
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'cartita.pdf'; // Nombre con el que se descarga el archivo
          link.click();
          window.URL.revokeObjectURL(link.href);
      } else {
          alert('No se pudo descargar el archivo. Por favor, inténtalo de nuevo.');
      }
  };
  xhr.onerror = function() {
      alert('Ocurrió un error al intentar descargar el archivo.');
  };
  xhr.send();
});

// Configuración del temporizador
var targetDay = 7;   // Días
var targetHour = 0;  // Horas
var targetMinute = 0;  // Minutos
var targetSecond = 0;   // Segundos

// Convertir la configuración en milisegundos
var targetMilliseconds = 
  (targetDay * 24 * 60 * 60 * 1000) + 
  (targetHour * 60 * 60 * 1000) + 
  (targetMinute * 60 * 1000) + 
  (targetSecond * 1000);

// Verificar si existe un temporizador guardado
var savedCountdown = localStorage.getItem('countDownDate');
var countDownDate;
//localStorage.removeItem('countDownDate');


if (!savedCountdown) {
  countDownDate = new Date().getTime() + targetMilliseconds; // Calcula el tiempo objetivo
  localStorage.setItem('countDownDate', countDownDate.toString());
} else {
  countDownDate = parseInt(savedCountdown, 10);
}

// Lógica para mostrar la cuenta regresiva
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  if (distance >= 0) {
      // Calcula días, horas, minutos y segundos restantes
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Mostrar en consola para depuración
      console.log(`Días: ${days}, Horas: ${hours}, Minutos: ${minutes}, Segundos: ${seconds}`);

      // Actualiza el contenido del HTML
      document.getElementById("countdown").textContent = 
          `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
      // Si el tiempo se acabó
      clearInterval(x);
      document.getElementById("countdown").textContent = "¡Nueva carta disponible!";
      // Limpia el localStorage si quieres reiniciar
      // localStorage.removeItem('countDownDate');
  }
}, 1000);
