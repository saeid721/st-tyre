'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Password visibility toggle */
  var toggleBtn = document.getElementById('togglePassword');
  var passwordInput = document.getElementById('password');
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', function () {
      var isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      toggleBtn.querySelector('i').className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
      toggleBtn.setAttribute('aria-pressed', String(isHidden));
      toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  }

  /* 2. OTP auto-advance / backspace / numeric-only */
  document.querySelectorAll('[data-otp-group]').forEach(function (group) {
    var inputs = Array.prototype.slice.call(group.querySelectorAll('.otp-input'));
    inputs.forEach(function (input, idx) {
      input.addEventListener('input', function () {
        input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
        input.classList.toggle('otp-filled', !!input.value);
        if (input.value && inputs[idx + 1]) inputs[idx + 1].focus();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !input.value && inputs[idx - 1]) {
          inputs[idx - 1].focus();
        }
      });
      input.addEventListener('paste', function (e) {
        e.preventDefault();
        const pasteData = (e.clipboardData.getData('text') || '').replace(/[^0-9]/g, '').split('');
        if (!pasteData.length) return;

        inputs.forEach((inp, i) => {
          if (pasteData[i]) {
            inp.value = pasteData[i];
            inp.classList.add('otp-filled');
          } else {
            inp.value = '';
            inp.classList.remove('otp-filled');
          }
        });

        // Focus the last filled input or the next empty one
        const lastIndex = Math.min(pasteData.length, inputs.length) - 1;
        if (lastIndex >= 0) {
          inputs[lastIndex].focus();
        }
      });
    });
  });

  /* 3. Character counter with visual warning */
  document.querySelectorAll('[data-char-counter]').forEach(function (field) {
    const counterEl = document.getElementById(field.getAttribute('data-char-counter'));
    if (!counterEl) return;

    const maxLength = parseInt(field.getAttribute('maxlength') || 500, 10);

    const update = function () {
      const currentLength = field.value.length;
      counterEl.textContent = currentLength;

      if (currentLength >= maxLength * 0.9) {
        counterEl.classList.add('text-danger', 'fw-bold');
        counterEl.classList.remove('text-muted');
      } else {
        counterEl.classList.remove('text-danger', 'fw-bold');
        counterEl.classList.add('text-muted');
      }
    };

    field.addEventListener('input', update);
    update();
  });

  /* 4. Color picker <-> hex text sync */
  var colorPicker = document.getElementById('colorPicker');
  var colorHex = document.getElementById('colorHex');
  if (colorPicker && colorHex) {
    colorPicker.addEventListener('input', function () {
      colorHex.value = colorPicker.value.toUpperCase();
    });
    colorHex.addEventListener('change', function () {
      var val = colorHex.value.trim();
      if (/^#([0-9A-Fa-f]{6})$/.test(val)) {
        colorPicker.value = val;
      } else {
        colorHex.value = colorPicker.value.toUpperCase();
      }
    });
  }

  /* 5. Price range live value */
  var priceRange = document.getElementById('priceRange');
  var rangeValue = document.getElementById('rangeValue');
  if (priceRange && rangeValue) {
    var formatBDT = function (v) { return '৳' + Number(v).toLocaleString('en-US'); };
    priceRange.addEventListener('input', function () {
      rangeValue.textContent = formatBDT(priceRange.value);
    });
    rangeValue.textContent = formatBDT(priceRange.value);
  }

  /* 6. Drag & drop upload zone with dynamic file rendering */
  const dropZone = document.getElementById('dropZone');
  const dropZoneInput = document.getElementById('dropZoneInput');
  const browseBtn = document.getElementById('dropZoneBrowseBtn');
  const uploadedFilesList = document.getElementById('uploadedFilesList');

  if (dropZone && dropZoneInput) {
    const openPicker = function (e) {
      if (e) e.stopPropagation();
      dropZoneInput.click();
    };

    if (browseBtn) browseBtn.addEventListener('click', openPicker);

    dropZone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPicker();
      }
    });

    ['dragenter', 'dragover'].forEach(function (evt) {
      dropZone.addEventListener(evt, function (e) {
        e.preventDefault();
        dropZone.classList.add('border-primary', 'drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(function (evt) {
      dropZone.addEventListener(evt, function (e) {
        e.preventDefault();
        dropZone.classList.remove('border-primary', 'drag-over');
      });
    });

    dropZone.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    });

    dropZoneInput.addEventListener('change', function () {
      if (this.files.length) {
        handleFiles(this.files);
      }
    });

    function handleFiles(files) {
      if (!uploadedFilesList) return;

      Array.from(files).forEach(file => {
        const isImage = file.type.startsWith('image/');
        const iconClass = isImage ? 'bi-file-earmark-image' : 'bi-file-earmark-text';
        const bgClass = isImage ? 'bg-warning-subtle text-warning' : 'bg-primary-subtle text-primary';
        const size = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

        const item = document.createElement('div');
        item.className = 'd-flex align-items-center p-2 border rounded-2 bg-white uploaded-file-item mb-2';
        item.style.animation = 'fadeInUp 0.3s ease both';
        item.innerHTML = `
                <div class="${bgClass} rounded p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; flex-shrink: 0;">
                    <i class="bi ${iconClass} fs-5"></i>
                </div>
                <div class="flex-grow-1 min-width-0">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="fw-medium text-truncate" title="${file.name}">${file.name}</span>
                        <span class="text-muted" style="font-size: 0.75rem;">${size}</span>
                    </div>
                    <div class="progress" style="height: 4px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <button type="button" class="btn btn-link text-danger p-2 ms-2 remove-file-btn" aria-label="Remove file" style="flex-shrink: 0;">
                    <i class="bi bi-x-lg"></i>
                </button>
            `;

        item.querySelector('.remove-file-btn').addEventListener('click', () => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(20px)';
          setTimeout(() => item.remove(), 200);
        });

        uploadedFilesList.appendChild(item);
      });
    }
  }

  /* 7. Bootstrap-native validation on submit (no page reload) */
  var mainForm = document.getElementById('mainForm');
  if (mainForm) {
    mainForm.addEventListener('submit', function (e) {
      if (!mainForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      mainForm.classList.add('was-validated');
    }, false);
  }

  /* 8. Loading-state demo button (Saving...) stays static on purpose;
     reusable helper other pages can call: */
  window.setButtonLoading = function (btn, isLoading, loadingText) {
    if (!btn) return;
    if (isLoading) {
      btn.dataset.originalHtml = btn.innerHTML;
      btn.disabled = true;
      btn.classList.add('is-loading');
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span><span role="status">' + (loadingText || 'Saving...') + '</span>';
    } else {
      btn.disabled = false;
      btn.classList.remove('is-loading');
      if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml;
    }
  };
});