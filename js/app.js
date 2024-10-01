document.addEventListener('DOMContentLoaded', () => {
  const passwordDisplay = document.getElementById('generatedPassword');
  const lengthDisplay = document.getElementById('lengthDisplay');
  const passwordLength = document.getElementById('passwordLength');
  const lengthInput = document.getElementById('lengthInput');
  const includeUppercase = document.getElementById('includeUppercase');
  const includeLowercase = document.getElementById('includeLowercase');
  const includeNumbers = document.getElementById('includeNumbers');
  const includeSymbols = document.getElementById('includeSymbols');
  const generateBtn = document.getElementById('generateBtn');
  const generateUUIDBtn = document.getElementById('generateUUIDBtn');
  const copyBtn = document.getElementById('copyBtn');

  // Caracteres que se pueden usar
  const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBER_CHARS = '0123456789';
  const SYMBOL_CHARS = '!@#$%^&*()_+[]{}|;:,.<>?';

  // Función para generar la contraseña
  const generatePassword = (length, useUppercase, useLowercase, useNumbers, useSymbols) => {
      let charSet = '';
      if (useUppercase) charSet += UPPERCASE_CHARS;
      if (useLowercase) charSet += LOWERCASE_CHARS;
      if (useNumbers) charSet += NUMBER_CHARS;
      if (useSymbols) charSet += SYMBOL_CHARS;

      if (charSet === '') {
          return 'Please select at least one option!';
      }

      let password = '';
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charSet.length);
          password += charSet[randomIndex];
      }
      return password;
  };

  // Función para generar un UUID
  const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  };

  // Sincronizar control deslizante con campo numérico
  passwordLength.addEventListener('input', () => {
      lengthInput.value = passwordLength.value;
      updatePassword();
  });

  lengthInput.addEventListener('input', () => {
      passwordLength.value = lengthInput.value;
      updatePassword();
  });

  // Actualizar la contraseña cuando se cambien las opciones
  includeUppercase.addEventListener('change', updatePassword);
  includeLowercase.addEventListener('change', updatePassword);
  includeNumbers.addEventListener('change', updatePassword);
  includeSymbols.addEventListener('change', updatePassword);

  // Función para actualizar la contraseña
  function updatePassword() {
      const length = passwordLength.value;
      const useUppercase = includeUppercase.checked;
      const useLowercase = includeLowercase.checked;
      const useNumbers = includeNumbers.checked;
      const useSymbols = includeSymbols.checked

      const password = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols);
      passwordDisplay.value = password;
  }

  // Evento para generar una contraseña manualmente
  generateBtn.addEventListener('click', updatePassword);

  // Evento para generar UUID
  generateUUIDBtn.addEventListener('click', () => {
      // Deselecciona todas las opciones de checkbox
      includeUppercase.checked = false;
      includeLowercase.checked = false;
      includeNumbers.checked = false;
      includeSymbols.checked = false;

      // Genera y muestra el UUID
      const uuid = generateUUID();
      passwordDisplay.value = uuid;
  });

  // Copiar la contraseña al portapapeles
  copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordDisplay.value).then(() => {
          alert('Password copied to clipboard!');
      }).catch(err => {
          alert('Failed to copy password');
      });
  });

  // Generar una contraseña por defecto al cargar la página
  updatePassword();
});
